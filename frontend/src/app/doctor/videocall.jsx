'use client';
import { useEffect, useRef } from 'react';
import io from 'socket.io-client';

let socket;

const VideoCall = ({ roomId }) => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peer = useRef(null);

  useEffect(() => {
    // Prevent running during SSR
    if (typeof window === 'undefined') return;

    socket = io('http://localhost:5055'); // your signaling server

    peer.current = new RTCPeerConnection();

    const pc = peer.current;

    // Setup local media stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      localVideo.current.srcObject = stream;
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    });

    // Emit room joining event
    socket.emit('join-room', roomId);

    // When ICE candidate is found
    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, roomId });
      }
    };

    // When remote track is received
    pc.ontrack = (event) => {
      remoteVideo.current.srcObject = event.streams[0];
    };

    // When another user joins
    socket.on('user-joined', async () => {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit('offer', { offer, roomId });
    });

    // When offer is received
    socket.on('receive-offer', async ({ offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', { answer, roomId });
    });

    // When answer is received
    socket.on('receive-answer', async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    // When ICE candidate is received
    socket.on('receive-candidate', ({ candidate }) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    // Cleanup on component unmount
    return () => {
      socket.disconnect();
      pc.close();
    };
  }, [roomId]);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-4 p-4">
      <video ref={localVideo} autoPlay playsInline muted className="w-full md:w-1/2 rounded-lg shadow-lg" />
      <video ref={remoteVideo} autoPlay playsInline className="w-full md:w-1/2 rounded-lg shadow-lg" />
    </div>
  );
};

export default VideoCall;
