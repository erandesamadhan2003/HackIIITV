import React from "react";
import { motion } from "framer-motion";
import { ColourfulText } from "./ui/colourful-text";
import { Button } from "./ui/button";

export function ColourfulTextDemo() {
  return (
    
    <div className="h-screen w-full flex justify-center relative overflow-hidden bg-black ">
      <motion.img
        src="https://assets.aceternity.com/linear-demo.webp"
        alt="Background"
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />
{/* 
      <div className="flex"> */}

      <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-center text-white relative z-2 font-sans mt-20">
        Welcome <ColourfulText text="srishti!" /> 
      </h1>
      <div className="gap-6">
      <Button className="z-50 relative ">Join Room </Button>
      <Button className="z-50 relative">Create Room </Button>
      </div>
      </div>
    // </div>
  );
}
