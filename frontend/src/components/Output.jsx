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
    <div className="bg-[#0D021F] border border-[#4A00E0] rounded-lg p-4 text-[#EAEAEA] mt-4 w-[calc(58vw)] ml-4">
      <h2 className="text-lg font-semibold mb-2">Output:</h2>
      <button
        className="bg-[#4A00E0] text-white px-4 py-2 rounded-lg"
        onClick={runCode}
      >
        Run Code
      </button>
      <div className="h-32 overflow-y-auto bg-[#1E1E2F] p-2 rounded-lg border border-[#7E3AF2] mt-2">
        {output ? <pre>{output}</pre> : <p className="text-gray-400">No output yet...</p>}
      </div>
    </div>
  );
};
