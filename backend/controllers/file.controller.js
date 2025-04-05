import File from "../modules/File.js";
import Room from "../modules/Room.js";

export const FileUpload = async (req, res) => {
    try {
        const { filename, content, owner, roomId } = req.body;
        console.log(filename, content, owner, roomId);

        if (!filename || !content || !owner || !roomId) {
            return res.status(429).json({
                success: false,
                message: "Something Missing in file Upload"
            });
        }
        const room = await Room.findOne({ room_id: roomId });

        if (!room) {
            return res.status(400).json({
                success: false,
                message: "Room Not Found to upload file"
            })
        }

        const newFile = new File({
            filename,
            content,
            owner
        });

        const savedFile = await newFile.save();

        room.files.push(savedFile._id);

        await room.save();

        console.log("Upload Successfully")
        res.status(200).json({
            success: true,
            message: "File added successfully",
            savedFile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
}

export const getFiles = async (req, res) => {
    const { roomId } = req.params;
    try {
        // Find the room by its custom `room_id`
        const room = await Room.findOne({ room_id: roomId });
        if (!room) {
            return res.status(400).json({
                success: false,
                message: "Room Not Found to get files",
            });
        }

        // Fetch files linked to the room
        const files = await File.find({ _id: { $in: room.files } });

        if (files.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No files found for this room",
            });
        }
        // Send the file list as JSON response
        res.status(200).json({
            success: true,
            files,
        });

    } catch (error) {
        console.error("Error fetching files:", error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


export const getspecificFile = async (req, res) => {
    const { fileId } = req.params;
    try {
        if(!fileId) {
            return res.status(400).json({
                success: false,
                message: "File Id required"
            })
        }
        const file = await File.findOne({ _id: fileId });
        if(!file){
            return res.status(400).json({
                success: false,
                message: "file not found"
            })
        }
        
        res.status(200).json({
            success:true,
            message: "file Fetched",
            file
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}


export const CreateFile = async (req, res) => {
    try {
        const { filename, content, owner, roomId } = req.body;

        const room = await Room.findOne({ room_id: roomId });

        if (!room) {
            return res.status(400).json({
                success: false,
                message: "Room Not Found to upload file"
            })
        }

        const newFile = new File({
            filename,
            content,
            owner
        });

        const savedFile = await newFile.save();

        room.files.push(savedFile._id);

        await room.save();

        console.log("Upload Successfully")
        res.status(200).json({
            success: true,
            message: "File added successfully",
            savedFile
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};