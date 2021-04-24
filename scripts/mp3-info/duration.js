const mp3Duration = require("mp3-duration");
const filename = process.argv[2];

mp3Duration(filename, function (err, duration) {
  if (err) return console.log(err.message);
  console.log("Duration: " + Math.floor(duration));
});
