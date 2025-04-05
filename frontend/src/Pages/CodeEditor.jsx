import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import io from "socket.io-client";
import { Code } from "@/components/Code.jsx";
import { OutputConsole } from "@/components/Output.jsx";
import { Sidebar } from "@/components/Sidebar";

const socket = io.connect("http://localhost:3000");

export const CodeEditor = () => {
  const { roomId } = useParams();
  const [code, setCode] = useState("// Write your code here...");
  const [language, setLanguage] = useState("javascript");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [activeFile, setActiveFile] = useState("");
  const [user, setUser] = useState(null);

  const activeFileRef = useRef(activeFile); 

  useEffect(() => {
    activeFileRef.current = activeFile; 
  }, [activeFile]);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const decoded = JSON.parse(atob(token.split(".")[1]));
        console.log("Decoded token:", decoded); 

        const userId = decoded.id; 
        if (!userId) {
          console.error("User ID not found in token");
          return;
        }

        const response = await fetch(`http://localhost:3000/auth/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const userData = await response.json();
        console.log("Fetched User Data:", userData); 
        setUser(userData); 
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);


  useEffect(() => {
    socket.emit("joinRoom", roomId);

    socket.on("previousMessages", (oldMessages) => {
      setMessages(oldMessages);
    });

    socket.on("receivedmessage", (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    });

    socket.on("changeCode", (newC, incomingFile) => {
      if(activeFileRef.current === incomingFile){
        setCode(newC);
      }
    });

    return () => {
      socket.off("previousMessages");
      socket.off("receivedmessage");
      socket.off("changeCode");
    };
  }, [roomId]);

  const handleCodeChange = (newCode) => {
    setCode(newCode);
    socket.emit("codeUpdate", { roomId, newCode, activeFile: activeFileRef.current }); // Ensure latest activeFile is sent

    // Send a request to update the database
    if (activeFileRef.current) {
      fetch(`http://localhost:3000/api/rooms/file/update/${activeFileRef.current}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: newCode }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (!data.success) {
            console.error("Error updating file in database:", data.message);
          }
        })
        .catch((error) => console.error("Error updating file:", error));
    }
  };

  const handleSendButton = () => {
    if (message.trim() && user) {
      socket.emit("send_message", { roomId, username: user.username, message });
      setMessage("");
    }
  };

  return (
    <div className="flex h-screen bg-zinc-900">
      {/* Sidebar */}
      <Sidebar
        roomId={roomId}
        setCode={setCode}
        handleCodeChange={handleCodeChange}
        code={code}
        language={language}
        activeFile={activeFile}
        setActiveFile={setActiveFile}
      />

      {/* Code Editor + Chat Box Section */}
      <div className="flex flex-1">
        <div className="flex flex-col flex-1 gap-0">
          <div className="flex-1">
            <Code code={code} setCode={handleCodeChange} language={language} setLanguage={setLanguage} />
          </div>

          <div className="h-[47%]">
            <OutputConsole code={code} language={language} />
          </div>
        </div>

        {/* Chat Box */}
        <div className="w-80 border-l border-gray-500 bg-zinc-900 p-4 flex flex-col">
          <h2 className="text-lg text-white font-semibold">💬 ChatBox</h2>
          <div className="flex-1 overflow-y-auto bg-zinc-800 rounded-sm mt-2 p-2">
            {messages.map((msg, index) => (
              <div key={index} className="text-white text-sm p-1">
                <span className="text-gray-500 font-semibold">{msg.username}:</span>{" "}
                <span className="text-white">{msg.message}</span>
              </div>
            ))}
          </div>

          {/* Chat Input */}
          <div className="mt-2 flex">
            <input
              type="text"
              className="flex-1 p-2 bg-zinc-900 text-white rounded-sm"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button
              className="ml-2 bg-blue-400 text-white p-2 rounded-sm"
              onClick={handleSendButton}
              disabled={!user}
            >
              Send
            </button>
          </div>
        </div>
      </div>

    </div>
  );
};
