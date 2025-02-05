"use client";

import { useState } from "react";

const CameraSection = () => {
  const [selectedCamera, setSelectedCamera] = useState<number | null>(null);

  const cameras = [
    {
      id: 1,
      name: "Resting Zone",
      videoUrl: "/videos/cat-cam1.mp4",
    },
    {
      id: 2,
      name: "Play Area",
      videoUrl: "/videos/cat-cam2.mp4",
    },
    {
      id: 3,
      name: "Scratching Area",
      videoUrl: "/videos/cat-cam3.mp4",
    },
    {
      id: 4,
      name: "Dining Space",
      videoUrl: "/videos/cat-cam4.mp4",
    },
  ];

  return (
    <div className="bg-black-dark p-6 rounded-xl shadow-lg border border-gold-soft/10 hover:border-gold-soft/30 transition-colors">
      <h2 className="text-2xl text-gold-soft mb-4 flex items-center gap-2">
        Live Cameras
      </h2>

      <div className="grid grid-cols-2 gap-4">
        {cameras.map((camera) => (
          <div
            key={camera.id}
            className="relative aspect-video rounded-lg overflow-hidden hover:ring-2 hover:ring-gold-soft transition-all cursor-pointer"
            onClick={() =>
              setSelectedCamera(selectedCamera === camera.id ? null : camera.id)
            }
          >
            <video
              src={camera.videoUrl}
              autoPlay
              loop
              muted
              playsInline
              className={`w-full h-full object-cover ${
                selectedCamera === camera.id ? "scale-105" : ""
              }`}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-2">
              <p className="text-white-ivory text-sm">{camera.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CameraSection;
