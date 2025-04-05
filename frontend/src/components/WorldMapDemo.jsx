import { motion } from "motion/react";
import { WorldMap } from "./ui/world-map.jsx";
import { Button } from "./ui/button.jsx";
import { useNavigate } from "react-router-dom";

export function WorldMapDemo() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="py-12 bg-zinc-900 w-full relative">
      {/* Logout Button - Top Right Corner */}
      <div className="absolute top-4 right-4 z-10">
        <Button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg shadow"
        >
          Log Out
        </Button>
      </div>

      <div className="max-w-7xl mx-auto text-center">
        <p className="font-bold text-xl md:text-4xl text-white">
          Skip{" "}
          <span className="text-neutral-400">
            {" the Setup".split("").map((letter, idx) => (
              <motion.span
                key={idx}
                className="inline-block"
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: idx * 0.04 }}
              >
                {letter}
              </motion.span>
            ))}
          </span>
        </p>

        <div className="flex gap-4 justify-center mr-10">
          <p className="text-sm md:text-lg text-neutral-500 max-w-2xl py-4">
            Skip the setup, start coding together instantly.
            Create rooms and collaborate in one click. Whether you're building with teammates, teaching a friend, or pair programming, it’s all seamless and in-sync.
          </p>
        </div>
      </div>

      <div>

        <WorldMap
          dots={[
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: 34.0522, lng: -118.2437 },
            },
            {
              start: { lat: 64.2008, lng: -149.4937 },
              end: { lat: -15.7975, lng: -47.8919 },
            },
            {
              start: { lat: -15.7975, lng: -47.8919 },
              end: { lat: 38.7223, lng: -9.1393 },
            },
            {
              start: { lat: 51.5074, lng: -0.1278 },
              end: { lat: 28.6139, lng: 77.209 },
            },
            {
              start: { lat: 28.6139, lng: 77.209 },
              end: { lat: 43.1332, lng: 131.9113 },
            },
            {
              start: { lat: 28.6139, lng: 77.209 },
              end: { lat: -1.2921, lng: 36.8219 },
            },
          ]}
        />
      </div>
    </div>
  );
}