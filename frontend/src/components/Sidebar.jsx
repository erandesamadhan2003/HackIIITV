import { useState, useEffect } from "react";
import { FaUpload } from "react-icons/fa";
import { toast } from "react-toastify";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MdDeleteForever } from "react-icons/md";


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
    <div className="w-64 h-full bg-[#0D021F] text-[#EAEAEA] flex flex-col p-4 border-r border-[#4A00E0]">
      <h2 className="text-2xl font-bold text-[#7E3AF2] mb-4">Collaboration</h2>
      <h3 className="text-xl font-bold text-gray-300 mb-4"><span className="text-gray-600">Room:</span> {roomName}</h3>

      <div className="flex justify-between">
        <label className="flex items-center justify-center bg-[#7E3AF2] text-white py-2 px-4 rounded-lg mb-4 hover:bg-[#9B51E0] transition cursor-pointer">
          <FaUpload className="mr-2" />
          <input type="file" accept=".c,.cpp,.js,.py" className="hidden" onChange={handleFileUpload} />
        </label>

        {/* Download Button */}
        <button
          className="bg-[#4A00E0] text-white px-4 py-2 rounded-lg mb-4"
          onClick={handleDownload}
        >
          📥
        </button>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#4A00E0] text-white px-4 py-2 rounded-lg mb-4">
              ➕
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-md bg-[#1E1E2F] text-white border border-[#4A00E0]">
            <DialogHeader>
              <DialogTitle className="text-[#EAEAEA]">Create New File</DialogTitle>
            </DialogHeader>

            <Input
              className="text-black"
              placeholder="Enter file name (e.g., main.js)"
              value={newFilename}
              onChange={(e) => setNewFilename(e.target.value)}
            />

            <DialogFooter className="mt-4">
              <Button onClick={() => handleCreateFile(e)} className="bg-[#7E3AF2] hover:bg-[#9B51E0]">
                Create
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      {/* File List */}
      <div className="flex-1 overflow-y-auto">
        {files.map((file, index) => (
          <div className="flex items-center justify-between">
            <div
              key={file._id}
              className="text-sm py-1 px-2 hover:bg-[#1E1E2F] rounded cursor-pointer"
              onClick={() => handleFileClick(file)}
            >
              <p>📄 {file.filename}</p>

            </div>
            <MdDeleteForever
              className="text-red-600 cursor-pointer"
              onClick={() => handleDeleteFile(file._id)}
            />
          </div>
        ))}
      </div>

      {/* Room Info */}
      <div
        className="mt-4 p-3 bg-[#1E1E2F] rounded-lg text-sm cursor-copy"
        onClick={() => navigator.clipboard.writeText(roomId)}
      >
        <p>🔑 <strong>Room ID:</strong> {roomId}</p>
      </div>

      {/* Collaborators */}
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Collaborators</h3>
        {collaborators.length > 0 ? (
          collaborators.map((user, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <div className="w-4 h-4 rounded-full bg-blue-500"></div>
              <p>{user.name}</p>
            </div>
          ))
        ) : (
          <p>No collaborators yet</p>
        )}
      </div>
    </div>
  );
};
