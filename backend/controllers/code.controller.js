import { spawn } from "child_process";
import fs from "fs";
import path from "path";
import vm from "vm";

export const executeCode = (req, res) => {
    const { code, language } = req.body;
    let command, args, filename, outputFile;
    let output = "";

    const tempDir = path.join(process.cwd(), "tmp");

    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    if (language === "javascript") {
        try {
            const sandbox = { console: { log: (...args) => output += args.join(" ") + "\n" } };
            vm.createContext(sandbox);
            vm.runInContext(code, sandbox, { timeout: 5000 }); // 5-second timeout
            return res.json({ output: output.trim() || "No output" });
        } catch (error) {
            return res.json({ output: `Runtime Error: ${error.message}` });
        }
    }

    switch (language) {
        case "python":
            filename = path.join(tempDir, "script.py");
            command = "python";
            args = [filename];
            break;
        case "java":
            filename = path.join(tempDir, "Main.java");
            command = "javac";
            args = [filename];
            break;
        case "c":
            filename = path.join(tempDir, "program.c");
            outputFile = path.join(tempDir, "program_c.out");
            command = "gcc";
            args = [filename, "-o", outputFile];
            break;
        case "cpp":
            filename = path.join(tempDir, "program.cpp");
            outputFile = path.join(tempDir, "program_cpp.out");
            command = "g++";
            args = [filename, "-o", outputFile];
            break;
        default:
            return res.json({ output: "Unsupported language!" });
    }

    fs.writeFileSync(filename, code);
    const compilationProcess = spawn(command, args);

    let errorOccurred = false;

    compilationProcess.stderr.on("data", (data) => {
        output += `Compilation Error: ${data.toString()}`;
        errorOccurred = true;
    });

    compilationProcess.on("close", (code) => {
        if (errorOccurred) return res.json({ output });

        let executionProcess;
        if (language === "c" || language === "cpp") {
            if (!fs.existsSync(outputFile)) return res.json({ output: "Compilation failed: No executable found." });
            executionProcess = spawn(outputFile);
        } else if (language === "java") {
            executionProcess = spawn("java", ["-cp", tempDir, "Main"]);
        } else {
            executionProcess = spawn(command, [filename]);
        }

        executionProcess.stdout.on("data", (data) => output += data.toString());
        executionProcess.stderr.on("data", (data) => output += `Runtime Error: ${data.toString()}`);

        executionProcess.on("close", () => {
            res.json({ output: output.trim() || "No output" });
            if (fs.existsSync(filename)) fs.unlinkSync(filename);
            if (outputFile && fs.existsSync(outputFile)) fs.unlinkSync(outputFile);
        });
    });
};