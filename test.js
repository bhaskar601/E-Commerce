const { exec } = require("child_process");
const path = require("path");
const fs = require("fs");

// Automatically generate a commit message with date and time
const commitMessage = `Auto-commit at ${new Date().toLocaleString()}`;

// Update the README.md file with a new section
function updateReadme() {
  const filePath = path.join(process.cwd(), "README.md");
  const newContent = `\n## Auto-commit setup added on ${new Date().toDateString()} 🚀\n`;

  try {
    fs.appendFileSync(filePath, newContent);
    console.log("📝 README.md updated.");
  } catch (err) {
    console.error("❌ Failed to update README.md:", err);
  }
}

// Run shell commands like git add, commit, push
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

// Main function to perform git operations
async function autoCommit() {
  try {
    console.log("🚀 Starting auto-commit process...");

    await runCommand("git add .");
    await runCommand(`git commit -m "${commitMessage}"`);

    // Automatically detect the current branch name
    const branch = await runCommand("git rev-parse --abbrev-ref HEAD");
    await runCommand(`git push origin ${branch}`);

    console.log("🎉 All changes pushed to GitHub!");
  } catch (err) {
    console.error("💥 Commit failed:", err);
  }
}

// Start process: update readme and commit
updateReadme();
autoCommit();
