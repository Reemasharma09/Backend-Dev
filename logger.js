const os = require("os");
const fs = require("fs");
setInterval(() => {
  const info = `
Time: ${new Date().toLocaleString()}
CPU: ${os.cpus()[0].model}
Total Memory: ${os.totalmem()}
Free Memory: ${os.freemem()}
Platform: ${os.platform()}
`;
  fs.appendFile("systemInfo.log", info, (err) => {
    if (err) console.error("Error writing log");
    else console.log("System info logged");
  });
}, 5000);