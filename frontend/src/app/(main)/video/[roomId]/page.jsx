'use client';
import { useParams } from 'next/navigation';
import VideoCall from '@/app/doctor/videocall';

const VideoPage = () => {
  const { roomId } = useParams();

  return (
    <div className="min-h-screen bg-blue-50 flex items-center justify-center">
      <VideoCall roomId={roomId} />
    </div>
  );
};

export default VideoPage;
