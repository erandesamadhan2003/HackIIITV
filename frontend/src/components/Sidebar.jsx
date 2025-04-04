import { FaUpload } from "react-icons/fa";

export const Sidebar = () => {
    const roomId = "123456789ABC";
    const files = [
        { _id: "file1", filename: "main.cpp", content: "// C++ Sample Code" },
        { _id: "file2", filename: "script.py", content: "# Python Sample Code" },
        { _id: "file3", filename: "app.js", content: "// JavaScript Sample Code" },
    ];

    const collaborators = [
        { name: "Aarav" },
        { name: "Divya" },
        { name: "Sohan" },
    ];

    const handleDownload = () => {
        const code = "// Sample Code to Download";
        const language = "cpp";

        const blob = new Blob([code], { type: "text/plain" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);

        const extension = language === "javascript" ? "js" :
            language === "python" ? "py" :
                language === "c" ? "c" :
                    language === "cpp" ? "cpp" : "txt";

        link.download = `code.${extension}`;
        link.click();
        URL.revokeObjectURL(link.href);
    };

    return (
        <div className="w-64 h-full bg-[#0D021F] text-[#EAEAEA] flex flex-col p-4 border-r border-[#4A00E0]">
            <h2 className="text-2xl font-bold text-[#7E3AF2] mb-4">Coding</h2>

            <label className="flex items-center justify-center bg-[#7E3AF2] text-white py-2 px-4 rounded-lg mb-4 hover:bg-[#9B51E0] transition cursor-pointer">
                <FaUpload className="mr-2" /> Upload
                <input type="file" accept=".c,.cpp,.js,.py" className="hidden" disabled />
            </label>

            {/* Download Button */}
            <button
                className="bg-[#4A00E0] text-white px-4 py-2 rounded-lg mb-4"
                onClick={handleDownload}
            >
                📥 Download
            </button>

            {/* File List */}
            <div className="flex-1 overflow-y-auto">
                {files.map((file, index) => (
                    <div
                        key={index}
                        className="flex items-center text-sm py-1 px-2 hover:bg-[#1E1E2F] rounded cursor-pointer"
                    >
                        📄 {file.filename}
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
                {collaborators.map((user, index) => (
                    <div key={index} className="flex items-center space-x-2 mb-2">
                        <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                        <p>{user.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}