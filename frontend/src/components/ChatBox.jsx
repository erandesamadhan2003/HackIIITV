export const ChatBox = () => {
    return (
        <div className="w-80 border-l border-[#4A00E0] bg-[#1E1E2F] p-4 flex flex-col">
            <h2 className="text-lg text-white font-semibold">💬 ChatBox</h2>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto bg-[#0D021F] rounded-lg mt-2 p-2">
                <p className="text-gray-400 text-sm">No messages yet...</p>
            </div>

            {/* Chat Input */}
            <div className="mt-2 flex">
                <input
                    type="text"
                    className="flex-1 p-2 bg-[#222] text-white rounded-lg"
                    placeholder="Type a message..."
                />
                <button className="ml-2 bg-[#4A00E0] text-white p-2 rounded-lg">
                    Send
                </button>
            </div>
        </div>
    );
}