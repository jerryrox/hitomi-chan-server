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
let cacheRoute = require("./src/routes/api/cache");
let galleryRoute = require("./src/routes/api/gallery");
let originalRoute = require("./src/routes/api/original");
let thumbsRoute = require("./src/routes/api/thumbs");
let pageRoute = require("./src/routes/api/page");
let videoRoute = require("./src/routes/api/video");

app.use("/api/cache", cacheRoute);
app.use("/api/gallery", galleryRoute);
app.use("/api/original", originalRoute);
app.use("/api/thumbs", thumbsRoute);
app.use("/api/page", pageRoute);
app.use("/api/video", videoRoute);



// Start listen
app.listen(portNumber, () => {
    console.log(`Server started on port ${portNumber}`);
});