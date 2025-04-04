import { ChatBox } from "@/components/ChatBox";
import { Code } from "@/components/Code";
import { OutputConsole } from "@/components/Output";
import { Sidebar } from "@/components/Sidebar";

export const CodeEditor = () => {
  return (
    <div className="flex h-screen bg-[#0D021F]">
      <div className="w-64">
        <Sidebar />
      </div>

      <div className="flex flex-1 flex-col">
        <div className="flex-1">
          <Code />
        </div>

        <div className="h-[35%] border-t border-[#4A00E0]">
          <OutputConsole />
        </div>
      </div>

      <div className="w-80 border-l border-[#4A00E0]">
        <ChatBox />
      </div>
    </div>
  );
};
