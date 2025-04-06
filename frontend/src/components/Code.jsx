import { useEffect } from "react";
import Editor from "@monaco-editor/react";

const GEMINI_API_KEY = "AIzaSyByQFAqIeyR3sNyy2Kl4Pwjqd3D-cFYhjE"; // Make sure not to expose this in production!

export const Code = ({ code, setCode, language, setLanguage, filename }) => {
  const handleGeminiSuggestion = async () => {
    const prompt = `Only return JavaScript code. Do not include explanations. Complete this code:\n\n${code}\n`;

    console.log("Prompt sent to Gemini:", prompt);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            contents: [
              {
                parts: [{ text: prompt }],
              },
            ],
          }),
        }
      );
      

      const data = await res.json();
      const suggestion = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

      const cleaned = suggestion.replace(/```[\s\S]*?```/g, match => {
        return match.replace(/```[a-z]*\n?/gi, "").replace(/```$/, "");
      }).trim();

      if (cleaned) {
        setCode(cleaned); // 🔥 Replaces the entire editor content
      }
    } catch (err) {
      console.error("Gemini suggestion error:", err);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-zinc-900 text-[#EAEAEA] p-4">
      {/* Language Selector */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex items-center gap-4">
          <label className="text-lg font-semibold">Language:</label>
          <select
            className="bg-zinc-700 text-[#EAEAEA] border border-zinc-700 rounded-lg px-3 py-1"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="javascript">JavaScript</option>
            <option value="python">Python</option>
            <option value="c">C</option>
            <option value="cpp">C++</option>
          </select>
        </div>

        <button
          onClick={handleGeminiSuggestion}
          className="bg-[#7E3AF2] px-4 py-1 rounded-lg hover:bg-purple-600 transition"
        >
          ✨ Suggest with Gemini
        </button>
      </div>

      {/* Filename Display */}
      {filename && (
        <p className="text-sm text-gray-400 mb-2">📂 Editing: {filename}</p>
      )}

      {/* Code Editor */}
      <div className="flex-1 border border-zinc-700 rounded-lg overflow-hidden h-full">
        <Editor
          height="400px"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={setCode}
          options={{
            fontSize: 14,
            minimap: { enabled: false },
            suggestOnTriggerCharacters: false,
            quickSuggestions: false,
            wordBasedSuggestions: false,
          }}
        />
      </div>
    </div>
  );
};
