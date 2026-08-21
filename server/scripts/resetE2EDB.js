import fs from "node:fs";

const files = [
  "../issueflow-test.db",
  "../issueflow-test.db-shm",
  "../issueflow-test.db-wal",
];

for (const file of files) {
  if (fs.existsSync(file)) {
    fs.unlinkSync(file);
    console.log(`Deleted ${file}`);
  }
}
