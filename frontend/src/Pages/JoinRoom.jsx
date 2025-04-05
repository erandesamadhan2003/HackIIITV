import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ColourfulText } from "../components/ui/colourful-text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";

export const JoinRoom = () => {

  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = JSON.parse(atob(token.split(".")[1]));

  useEffect(() => {
    if (token) setUser(decoded);
  }, [])
  console.log(user);

  //! create Room 
  const handleCreateRoom = async () => {
    if (!roomName.trim()) {
      alert("Room name cannot be empty!");
      return;
    }

    const roomId = uuidv4();
    const newRoom = { roomId, roomName, ownerId: user.id, collaborators: [] };

    try {
      const response = await fetch("http://localhost:3000/api/rooms", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newRoom),
      });

      if (response.ok) {
        toast.success("Room created Successfully!");
        navigate('/editor');
      } else {
        toast.error("Failed to create room");
      }
    } catch (error) {
      toast.error('Error creating room')
      console.error("Error creating room:", error);
    }
  };

  console.log(decoded);
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
          <Dialog>
            <DialogTrigger asChild>
              <Button className="z-50 relative">Create Room</Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Create a new room</DialogTitle>
              </DialogHeader>

              <Input
                placeholder="Enter room name"
                value={roomName}
                onChange={(e) => setRoomName(e.target.value)}
              />

              <DialogFooter className="gap-2">
                <Button variant="outline">Cancel</Button>
                <Button onClick={handleCreateRoom}>Create Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
