const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Customize this if needed
const commitMessage = `Auto-commit at ${new Date().toLocaleString()}`;

function updateReadme() {
  const filePath = path.join(process.cwd(), "read.md");
  const newContent = `\n## Auto-commit setup added on ${new Date().toDateString()} 🚀\n`;

  try {
    fs.appendFileSync(filePath, newContent);
    console.log("📝 README.md updated.");
  } catch (err) {
    console.error("❌ Failed to update README.md:", err);
  }
}

function runCommand(command, cwd = process.cwd()) {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error running "${command}":`, stderr);
        return reject(stderr);
      }
      console.log(`✅ "${command}" executed.`);
      resolve(stdout.trim());
    });
  });
}

async function autoCommit() {
  try {
    console.log("🚀 Starting auto-commit process...");

    await runCommand("git add .");
    await runCommand(`git commit -m "${commitMessage}"`);
    await runCommand("git push origin main");

    console.log("🎉 All changes pushed to GitHub!");
  } catch (err) {
    console.error("💥 Commit failed:", err);
  }
}

// First update README, then commit
updateReadme();
autoCommit();
