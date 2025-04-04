import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ColourfulText } from "../components/ui/colourful-text";

export const JoinRoom = () => {
  return (
    <div className="h-screen w-full flex justify-center relative overflow-hidden bg-black">
      <motion.img
        src="https://assets.aceternity.com/linear-demo.webp"
        alt="Background"
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />  

      <div className="relative w-full max-w-5xl h-20 mt-5 flex justify-between items-center px-4">
        <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-white font-sans">
          Welcome <ColourfulText text="srishti!" />
        </h1>
        <div className="flex gap-4">
          <Button className="z-50 relative">Join Room</Button>
          <Button className="z-50 relative">Create Room</Button>
        </div>
      </div>
    </div>
  );
}
