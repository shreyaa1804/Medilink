'use client';
import { useParams } from 'next/navigation';
import VideoCall from '@/app/doctor/videocall';
import { motion } from 'framer-motion';

const VideoPage = () => {
  const { roomId } = useParams();

  return (
    <motion.main 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="fixed inset-0 bg-[#0f172a] z-50"
    >
      <VideoCall roomId={roomId} />
    </motion.main>
  );
};

export default VideoPage;
