import { useState } from "react";

export const OutputConsole = ({ code, language }) => {
  const [output, setOutput] = useState("");

  const runCode = async () => {
    try {
      const response = await fetch("http://localhost:3000/code/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code, language }),
      });

      const data = await response.json();
      setOutput(data.output);
    } catch (error) {
      setOutput("Error connecting to server!");
    }
  };

  return (
    <div className="bg-zinc-900 border border-zinc-900 rounded-lg p-4 text-[#EAEAEA] mx-1">
      <div className="flex gap-6 justify-between">
        <h2 className="text-lg font-semibold mb-2">Output:</h2>
        <button
          className="bg-[#4A00E0] text-white px-4 py-2 mb-3 rounded-lg"
          onClick={runCode}
        >
          Run Code
        </button>
      </div>
      <div className="h-36 overflow-y-auto bg-zinc-800 p-2 rounded-lg border-700 mt-2">
        {output ? <pre>{output}</pre> : <p className="text-gray-400">No output yet...</p>}
      </div>
    </div>
  );
};
