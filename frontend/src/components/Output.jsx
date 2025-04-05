
export const OutputConsole = () => {

  return (
    <div className="bg-[#0D021F] border border-[#4A00E0] rounded-lg p-4 text-[#EAEAEA] mt-4 w-[calc(58vw)] ml-4">
      <h2 className="text-lg font-semibold mb-2">Output:</h2>
      <button
        className="bg-[#4A00E0] text-white px-4 py-2 rounded-lg"
      >
        Run Code
      </button>
      <div className="h-32 overflow-y-auto bg-[#1E1E2F] p-2 rounded-lg border border-[#7E3AF2] mt-2">
        <p className="text-gray-400">No output yet...</p>
      </div>
    </div>
  );
};
