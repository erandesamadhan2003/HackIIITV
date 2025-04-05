import { motion } from "framer-motion";
import { Button } from "../components/ui/button";
import { ColourfulText } from "../components/ui/colourful-text";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { v4 as uuidv4 } from "uuid";
import { toast } from "react-toastify";

export const JoinRoom = () => {
  const [user, setUser] = useState(null);
  const [roomName, setRoomName] = useState("");
  const [enteredRoomId, setenteredRoomId] = useState("");
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const decoded = JSON.parse(atob(token.split(".")[1]));

  useEffect(() => {
    if (token) setUser(decoded);
  }, []);

  // Create Room Handler
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
        navigate(`/editor/${roomId}`);
      } else {
        toast.error("Failed to create room");
      }
    } catch (error) {
      toast.error("Error creating room");
      console.error("Error creating room:", error);
    }
  };

  const handleRoomJoin = async () => {
    if (!enteredRoomId) {
      toast.error("Enter Room ID");

    }
    const userId = user.id;
    try {
      const response = await fetch(`http://localhost:3000/api/rooms/join/${enteredRoomId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }), // Send username in body
      });

      const data = await response.json();
      if (response.ok) {
        toast.success("Joined room successfully!");
        navigate(`/editor/${enteredRoomId}`); // Redirect to the editor
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error joining room:", error);
      toast.error("Failed to join room");
    }
  };

  return (
    <div className="h-screen w-full flex justify-center items-center relative overflow-hidden bg-black px-4">
      <motion.img
        src="https://assets.aceternity.com/linear-demo.webp"
        alt="Background"
        className="h-full w-full object-cover absolute inset-0 [mask-image:radial-gradient(circle,transparent,black_80%)] pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ duration: 1 }}
      />

      <div className="relative w-full max-w-4xl flex flex-col items-center gap-8 text-center">
        <h1 className="text-2xl md:text-5xl lg:text-6xl font-bold text-white font-sans">
          Welcome <ColourfulText text={user?.username || ""} />
        </h1>
        <p className="text-white text-lg md:text-xl max-w-xl">
          Create a room to start collaborating, or join an existing one using a Room ID.
        </p>

        <div className="flex flex-wrap justify-center gap-6 mt-4">
          {/* Create Room Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="z-50 relative px-6 py-2 text-lg bg-purple-600 hover:bg-purple-700 transition-all">
                Create Room
              </Button>
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
              <DialogFooter>
                <Button onClick={handleCreateRoom}>Create Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Join Room Dialog */}
          <Dialog>
            <DialogTrigger asChild>
              <Button className="z-50 relative px-6 py-2 text-lg bg-blue-600 hover:bg-blue-700 transition-all">
                Join Room
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Join a room</DialogTitle>
              </DialogHeader>
              <Input
                placeholder="Enter Room ID"
                value={enteredRoomId}
                onChange={(e) => setenteredRoomId(e.target.value)}
              />
              <DialogFooter>
                <Button onClick={handleRoomJoin}>Join Room</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
};
