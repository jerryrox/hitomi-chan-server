const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const portNumber = 4000;

// Make mongoose connection
mongoose.connect(`mongodb://localhost:27017/reactive-hitomi-server`);
let db = mongoose.connection;

// Set events for mongoose.
db.once("open", function() {
    console.log("Connected to MongoDB");
});
db.on("error", function(err) {
    console.log(`MongoDB error: ${JSON.stringify(err)}`);
});

// Setup express
const app = express();
app.use(bodyParser.json());

// Express routing
let cacheRoute = require("./src/routes/cache");
let galleryRoute = require("./src/routes/gallery");
let originalRoute = require("./src/routes/original");
let readRoute = require("./src/routes/read");
let thumbsRoute = require("./src/routes/thumbs");
let pageRoute = require("./src/routes/page");
let videoRoute = require("./src/routes/video");

app.use("/cache", cacheRoute);
app.use("/gallery", galleryRoute);
app.use("/original", originalRoute);
app.use("/read", readRoute);
app.use("/thumbs", thumbsRoute);
app.use("/page", pageRoute);
app.use("/video", videoRoute);

// Start listen
app.listen(portNumber, () => {
    console.log(`Server started on port ${portNumber}`);
});