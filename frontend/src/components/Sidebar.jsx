import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdDeleteForever } from "react-icons/md";
import { FaDownload } from "react-icons/fa";
import { IoIosCreate } from "react-icons/io";


export const Sidebar = ({ roomId, setCode, handleCodeChange, code, language, activeFile, setActiveFile }) => {
  const [files, setFiles] = useState([]);
  const [roomName, setRoomName] = useState("")
  const [collaborators, setCollaborators] = useState([]);
  const [newFilename, setNewFilename] = useState("");
  const user = localStorage.getItem("token");
  const decodedUser = JSON.parse(atob(user.split(".")[1]));

  // ! Fetched Collaborator
  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rooms/get/${roomId}`);
        if (!response.ok) throw new Error("Failed to fetch room details");

        const data = await response.json();
        setRoomName(data.room_name);
        setCollaborators(data.collaborators);
      } catch (error) {
        console.error("Error fetching room data:", error);
      }
    };

    fetchRoomDetails();
  }, [roomId]);

  // ! Fetched Files 
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/rooms/file/get/${roomId}`);
        if (!response.ok) throw new Error("Failed to fetch Files");

        const data = await response.json();
        console.log(data.files);
        setFiles(data.files);  // Set the array of files in state
      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, [roomId]);

  // Handles file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (e) => {
      // console.log("File content:", e.target.result);

      const fileContent = e.target.result;
      try {
        const response = await fetch("http://localhost:3000/api/rooms/file/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            filename: file.name,
            content: fileContent,
            owner: decodedUser.id, // Replace with actual user ID
            roomId, // Ensure the file is associated with the room
          }),
        });

        const data = await response.json(); // Convert response to JSON

        if (!response.ok) {
          throw new Error(data.message || "File upload failed");
        }

        toast.success("File uploaded successfully!");
        setFiles((prevFiles) => [...prevFiles, data.savedFile]);
        // handleCodeChange(fileContent);
        setActiveFile(data.savedFile._id);
        setCode(fileContent);
      } catch (error) {
        console.error("Error uploading file:", error);
        toast.error(error.message || "An error occurred");
      }
    };
    reader.readAsText(file);
  };

  //Handles file selection
  const handleFileClick = async (file) => {

    try {
      const response = await fetch(`http://localhost:3000/api/rooms/file/specificFile/${file._id}`);

      const data = await response.json(); // Convert response to JSON
      if (!response.ok) throw new Error("Failed to fetch single File");
      setActiveFile(data.file._id);
      setCode(data.file.content);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    // console.log("Updated Active File:", activeFile);
  }, [activeFile]);
  // Function to handle file download
  const handleDownload = () => {
    console.log("Code to download:", code); // Check the code content
    if (!code) {
      alert("No code to download!");
      return;
    }

    const blob = new Blob([code], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);

    // Set the download filename based on the language
    const extension = language === 'javascript' ? 'js' :
      language === 'python' ? 'py' :
        language === 'c' ? 'c' :
          language === 'cpp' ? 'cpp' : 'txt'; // Default to .txt if no match

    link.download = `code.${extension}`; // Use a default filename based on the language
    link.click();
    URL.revokeObjectURL(link.href); // Clean up
  };

  // create New File
  const handleCreateFile = async () => {
    if (!newFilename.trim()) {
      toast.error("Filename cannot be empty!");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/rooms/file/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          filename: newFilename,
          content: "",
          owner: decodedUser.id,
          roomId,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to create file");
      }
      console.log("Created File", data);
      toast.success("File created successfully!");
      setFiles((prevFiles) => [...prevFiles, data.savedFile]);
      setNewFilename("");
      setCode("");
      setActiveFile(data.createdFile._id);

    } catch (error) {
      console.error("Error creating file:", error);
    }
  };


  const handleDeleteFile = async (fileId) => {
    if (!fileId) {
      console.error("No file ID provided.");
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/rooms/file/delete/${fileId}`, {
        method: "DELETE",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete file");
      }

      toast.success("File deleted successfully");

      // Update UI
      setFiles(prevFiles => prevFiles.filter(file => file._id !== fileId));
      setCode("");
      setActiveFile(null);

    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error(error.message || "Error deleting file");
    }
  };


  return (
    <div className="w-64 h-full bg-zinc-900 text-[#EAEAEA] flex flex-col p-4 border-r border-zinc-700 shadow-md">
      <h2 className="text-2xl font-extrabold text-white mb-4 tracking-wide">Collaboration</h2>
      <h3 className="text-lg font-medium text-zinc-300 mb-4">
        <span className="text-zinc-500">Room:</span> {roomName}
      </h3>

      <div className="flex justify-around gap-2">
        <label className="flex items-center justify-center bg-blue-700 text-white py-2 px-3 rounded-md mb-4 hover:bg-black transition-all duration-200 cursor-pointer shadow hover:scale-105">
          <FaUpload />
          <input type="file" accept=".c,.cpp,.js,.py" className="hidden" onChange={handleFileUpload} />
        </label>

        {/* Download Button */}
        <button
          className="bg-blue-700 text-white px-3 py-2 rounded-md mb-4 shadow-md hover:bg-black hover:scale-105 transition-all duration-200 ease-in-out"
          onClick={handleDownload}
        >
          <FaDownload />
        </button>

        {/* Create File Dialog */}
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-700 text-white px-3 py-2 rounded-md mb-4 shadow-md hover:bg-black hover:scale-105 transition-all duration-200 ease-in-out">
              <IoIosCreate />
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-[#1E1E2F] text-white border border-[#7E3AF2] shadow-lg rounded-lg">
            <DialogHeader>
              <DialogTitle className="text-[#EAEAEA]">Create New File</DialogTitle>
            </DialogHeader>

            <Input
              className="text-black mt-2 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7E3AF2]"
              placeholder="Enter file name (e.g., main.js)"
              value={newFilename}
              onChange={(e) => setNewFilename(e.target.value)}
            />

            <DialogFooter className="mt-4">
              <Button
                onClick={handleCreateFile}
                className="bg-blue-400 text-white px-4 py-2 rounded-md shadow-md hover:bg-[#9B51E0] hover:scale-105 transition-all duration-200 ease-in-out"
              >
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto mt-2 space-y-1">
        {files.map((file) => (
          <div key={file._id} className="flex items-center justify-between">
            <div
              className={`text-sm py-2 px-3 rounded-md w-full cursor-pointer transition-colors duration-150
                ${activeFile === file._id
                  ? "bg-[#4A00E0] text-white font-semibold"
                  : "hover:bg-zinc-800 text-zinc-300"}`}
              onClick={() => handleFileClick(file)}
            >
              📄 {file.filename}
            </div>

            <MdDeleteForever
              size={22}
              className="text-red-500 hover:text-red-700 cursor-pointer ml-2 transition-transform duration-150 hover:scale-110"
              onClick={() => handleDeleteFile(file._id)}
            />
          </div>
        ))}
      </div>

      {/* Room Info */}
      <div
        className="mt-4 p-3 bg-zinc-800 rounded-lg text-sm cursor-pointer hover:ring-1 hover:ring-white transition-all"
        onClick={() => navigator.clipboard.writeText(roomId)}
        onClickCapture={()=> toast.success('Copy to clipboard')}
      >
        <p>🔑 <strong>Room ID:</strong> {roomId}</p>
      </div>

      {/* Collaborators */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold text-white mb-2">Collaborators</h3>
        {collaborators.length > 0 ? (
          collaborators.map((user, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
              <p className="text-sm text-zinc-300">{user.name}</p>
            </div>
          ))
        ) : (
          <p className="text-sm text-zinc-500">No collaborators yet</p>
        )}
      </div>
    </div>
  );
};
