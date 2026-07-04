import { useEffect, useRef, useState } from "react";

export default function SplashScreen({ onDone }) {
  const videoRef = useRef(null);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const finish = () => {
      setFading(true);
      setTimeout(onDone, 500);
    };

    video.addEventListener("ended", finish);

    // Fallback: if video fails to play or takes too long, dismiss after 4s
    const fallback = setTimeout(finish, 4000);

    return () => {
      video.removeEventListener("ended", finish);
      clearTimeout(fallback);
    };
  }, [onDone]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#0b1628] flex items-center justify-center transition-opacity duration-500 ${fading ? "opacity-0" : "opacity-100"}`}
    >
      <video
        ref={videoRef}
        src="https://media.base44.com/videos/public/69c8b5b7d04008fffce57b83/184f2f2dd_CivicSidekickloadingscreen.mp4"
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}