const fs = require("fs");

// Read the file
fs.readFile("test.txt", "utf8", (err, data) => {
  if (err) {
    console.log("Error reading file");
    return;
  }

  console.log("File Content:");
  console.log(data);

  // Append content
  const newContent = "\nThis line is appended using Node.js";

  fs.appendFile("test.txt", newContent, (err) => {
    if (err) {
      console.log("Error appending file");
    } else {
      console.log("Content appended successfully");
    }
  });
});
