'use client';
import { useEffect, useRef, useState } from 'react';
import io from 'socket.io-client';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, 
  Settings, Maximize2, Users, MessageSquare,
  ShieldCheck, MoreVertical
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

let socket;

const VideoCall = ({ roomId }) => {
  const localVideo = useRef(null);
  const remoteVideo = useRef(null);
  const peer = useRef(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isJoined, setIsJoined] = useState(false);
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    socket = io('http://localhost:5055'); 
    peer.current = new RTCPeerConnection({
      iceServers: [{ urls: 'stun:stun.l.google.com:19302' }]
    });

    const pc = peer.current;

    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setLocalStream(stream);
      if (localVideo.current) localVideo.current.srcObject = stream;
      stream.getTracks().forEach(track => pc.addTrack(track, stream));
    }).catch(err => console.error("Error accessing media devices:", err));

    socket.emit('join-room', roomId);

    pc.onicecandidate = (event) => {
      if (event.candidate) {
        socket.emit('ice-candidate', { candidate: event.candidate, roomId });
      }
    };

    pc.ontrack = (event) => {
      setRemoteStream(event.streams[0]);
      if (remoteVideo.current) remoteVideo.current.srcObject = event.streams[0];
    };

    socket.on('user-joined', async () => {
      setIsJoined(true);
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      socket.emit('offer', { offer, roomId });
    });

    socket.on('receive-offer', async ({ offer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(offer));
      const answer = await pc.createAnswer();
      await pc.setLocalDescription(answer);
      socket.emit('answer', { answer, roomId });
    });

    socket.on('receive-answer', async ({ answer }) => {
      await pc.setRemoteDescription(new RTCSessionDescription(answer));
    });

    socket.on('receive-candidate', ({ candidate }) => {
      pc.addIceCandidate(new RTCIceCandidate(candidate));
    });

    return () => {
      socket.disconnect();
      pc.close();
      if (localStream) {
        localStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [roomId]);

  const toggleMute = () => {
    if (localStream) {
      localStream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMuted(!isMuted);
    }
  };

  const toggleVideo = () => {
    if (localStream) {
      localStream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsVideoOff(!isVideoOff);
    }
  };

  const endCall = () => {
    if (localStream) {
      localStream.getTracks().forEach(track => track.stop());
    }
    socket.disconnect();
    peer.current.close();
    setCallEnded(true);
    window.location.href = '/doctor/doctor-dashboard'; // Or wherever appropriate
  };

  if (callEnded) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-900 text-white p-6">
        <div className="bg-slate-800 p-10 rounded-3xl shadow-2xl text-center max-w-md border border-slate-700">
          <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <PhoneOff className="text-red-500 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold mb-4">Call Ended</h2>
          <p className="text-slate-400 mb-8">The video consultation has been successfully completed.</p>
          <button 
            onClick={() => window.location.href = '/'}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 rounded-xl font-semibold transition-all shadow-lg shadow-blue-600/20"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen bg-[#0f172a] overflow-hidden flex flex-col font-sans">
      {/* Top Header */}
      <div className="absolute top-0 left-0 right-0 z-20 p-6 flex justify-between items-center bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-600/30">
            <ShieldCheck className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="text-white font-bold text-lg tracking-tight">MediLink Secure Room</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <p className="text-slate-300 text-xs font-medium uppercase tracking-wider">Room: {roomId} • End-to-End Encrypted</p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
            <Users className="w-4 h-4 text-slate-300" />
            <span className="text-white text-sm font-medium">{remoteStream ? '2' : '1'} Participants</span>
          </div>
          <button className="p-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 hover:bg-white/20 transition-all text-white">
            <Settings className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Video Area */}
      <div className="flex-1 relative flex items-center justify-center p-4 md:p-8">
        <AnimatePresence mode="wait">
          {!remoteStream ? (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="relative w-full max-w-4xl aspect-video rounded-3xl overflow-hidden bg-slate-800/50 border border-slate-700 flex flex-col items-center justify-center text-center shadow-2xl"
            >
              <div className="relative mb-6">
                <div className="w-24 h-24 rounded-full border-4 border-blue-500/30 border-t-blue-500 animate-spin"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Users className="w-10 h-10 text-blue-400" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Waiting for Participant</h3>
              <p className="text-slate-400 max-w-xs">Waiting for the other person to join the room {roomId}...</p>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative w-full h-full flex items-center justify-center"
            >
              <video 
                ref={remoteVideo} 
                autoPlay 
                playsInline 
                className="w-full h-full object-cover rounded-3xl shadow-2xl border border-slate-700"
              />
              <div className="absolute bottom-6 left-6 bg-black/40 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10">
                <p className="text-white text-sm font-semibold">Patient / Doctor</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Local Video - PiP style */}
        <motion.div 
          drag
          dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
          className="absolute top-24 right-8 w-48 md:w-64 aspect-video bg-slate-800 rounded-2xl overflow-hidden shadow-2xl border-2 border-white/10 z-30 cursor-move group"
        >
          <video 
            ref={localVideo} 
            autoPlay 
            playsInline 
            muted 
            className={`w-full h-full object-cover transition-opacity duration-300 ${isVideoOff ? 'opacity-0' : 'opacity-100'}`} 
          />
          {isVideoOff && (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
              <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                <VideoOff className="w-8 h-8 text-slate-500" />
              </div>
            </div>
          )}
          <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm px-2 py-1 rounded-lg text-[10px] font-bold text-white uppercase tracking-wider border border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
            You {isMuted && '(Muted)'}
          </div>
          <div className="absolute top-3 right-3">
             <div className="flex gap-1">
                {isMuted && <MicOff className="w-4 h-4 text-red-500 fill-red-500/10" />}
             </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Control Bar */}
      <div className="p-8 flex justify-center items-center z-20">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="bg-slate-900/80 backdrop-blur-2xl px-8 py-5 rounded-[2.5rem] border border-white/10 flex items-center gap-6 shadow-2xl"
        >
          <button 
            onClick={toggleMute}
            className={`p-4 rounded-2xl transition-all duration-300 flex items-center justify-center ${
              isMuted ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>
          
          <button 
            onClick={toggleVideo}
            className={`p-4 rounded-2xl transition-all duration-300 flex items-center justify-center ${
              isVideoOff ? 'bg-red-500 text-white shadow-lg shadow-red-500/20' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>

          <div className="w-px h-10 bg-slate-700 mx-2" />

          <button className="p-4 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all">
            <MessageSquare className="w-6 h-6" />
          </button>

          <button className="p-4 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all">
            <Maximize2 className="w-6 h-6" />
          </button>
          
          <button 
            onClick={endCall}
            className="p-4 rounded-2xl bg-red-600 text-white hover:bg-red-700 transition-all shadow-lg shadow-red-600/30 flex items-center justify-center group"
          >
            <PhoneOff className="w-6 h-6 group-hover:rotate-[135deg] transition-transform duration-500" />
          </button>

          <div className="w-px h-10 bg-slate-700 mx-2" />

          <button className="p-4 rounded-2xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-all">
            <MoreVertical className="w-6 h-6" />
          </button>
        </motion.div>
      </div>

      <style jsx global>{`
        body {
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default VideoCall;
