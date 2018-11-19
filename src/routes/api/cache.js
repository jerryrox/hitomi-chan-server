const axios = require("axios");
const logDev = require("../../logDev");
const express = require('express');
const url = require ("../../hitomi-chan-utility/url");
const router = express.Router();

let Gallery = require('../../models/gallery');

router.get('/', (req, res) => {
    res.send("ecchi");
});

router.get('/ecchi', (req, res) => {
    res.send("Caching started... See console for details.");
    startCaching();
});

function startCaching() {
    console.log("Started caching.");
    findJsonCount((err, count) => {
        if(err) {
            console.log(`Error while fetching json count: ${err}`);
            return;
        }

        console.log(`Json count found: ${count}`);
        initCaching(count);
        downloadJson();
    });
}

function initCaching(totalJsonCount) {
    console.log("Variables initialized.");
    global.cacheIndex = 0;
    global.cacheTotal = totalJsonCount;
    global.cacheTime = new Date().getTime();
    global.galleryChunk = [];
}

/**
 * Finds the number of json files to cache.
 * @param {(err: Error, count: number) => void} callback 
 */
function findJsonCount(callback) {
    console.log("Finding json count...");
    axios.get(url.getSearchlibJsUrl())
        .then(res => {
            var pattern = /number_of_gallery_jsons\s?=\s?([0-9]+)/mg;
            var count = pattern.exec(res.data)[1];
            callback(null, Number.parseInt(count));
        })
        .catch(err => {
            callback(err, 0);
        });
}

function finalizeCaching() {
    let timeDiff = (new Date().getTime() - global.cacheTime) / 1000;
    console.log(`All caching process completed in ${timeDiff} seconds. Will re-init variables for cleanup.`);
    initCaching();
}

/**
 * Advances to next json file download.
 */
function advanceToNextJson() {
    global.cacheIndex ++;

    console.log(`Advanced cache index to: ${global.cacheIndex}.`);
    if(global.cacheIndex >= global.cacheTotal) {
        finalizeCaching();
        return;
    }

    console.log(`${global.cacheTotal - global.cacheIndex} Json file(s) remaining.`);
    downloadJson();
}

/**
 * Downloads json file from hitomi server.
 */
function downloadJson() {
    console.log(`Downloading json index ${global.cacheIndex}...`);
    axios.get(url.getGalleryJson(global.cacheIndex))
        .then(res => {
            global.galleryChunk = res.data;
            console.log(`Found gallery chunk with count: ${global.galleryChunk.length}`);
            processJson(global.galleryChunk);
        })
        .catch(err => {
            console.log(`Error while downloading json: ${JSON.stringify(err)}. Finalizing...`);
            finalizeCaching();
        });
}

/**
 * Processes raw array of gallery info.
 */
function processJson() {
    // logDev(`Processing json index ${global.cacheIndex}.`);

    let chunk = global.galleryChunk;

    // No more remaining.
    if(chunk.length === 0) {
        console.log("Processed all gallery chunks. Advancing to next json file...");
        advanceToNextJson();
        return;
    }
    
    // logDev(`${chunk.length} entries remaining for process. Handling one now...`);

    const curItem = global.galleryChunk.pop();
    Gallery.find({ id: curItem.id }, (err, gallery) => {
        if(err) {
            console.log(`Critical error while finding gallery with id: ${curItem.id}. Error object: ${JSON.stringify(err)}. Skipping this item...`);
            processJson();
            return;
        }

        // logDev(`Gallery find result: (Length: ${gallery.length})`);
        if(gallery.length === 0) {
            saveNewGallery(curItem);
        }
        else {
            updateExistingGallery(curItem);
        }
    });
}

/**
 * Saves a new gallery to db.
 * @param {Object} obj 
 */
function saveNewGallery(obj) {
    let gallery = new Gallery();
    gallery.id = obj.id;
    gallery.n = obj.n;
    gallery.type = obj.type;
    gallery.l = obj.l;
    gallery.c = obj.c;
    gallery.p = obj.p;
    gallery.t = obj.t;
    gallery.g = obj.g;
    gallery.a = obj.a;

    gallery.save(function(err) {
        if(err) {
            console.log(`Failed to save new gallery with id: ${obj.id} and error: ${JSON.stringify(err)}. Skipping this item...`);
            processJson();
            return;
        }

        // logDev(`Saved gallery with id: ${obj.id}.`);
        processJson();
    });
}

/**
 * Updates an existing gallery in db.
 * @param {Object} obj 
 */
function updateExistingGallery(obj) {
    let doc = {
        n: obj.n,
        type: obj.type,
        l: obj.l,
        c: obj.c,
        p: obj.p,
        t: obj.t,
        g: obj.g,
        a: obj.a
    };
    let query = { id: obj.id };

    Gallery.update(query, doc, function(err, gallery) {
        if(err) {
            console.log(`Failed to update existing gallery with id: ${obj.id} and error: ${JSON.stringify(err)}. Skipping this item...`);
            processJson();
            return;
        }

        // logDev(`Updated gallery with id: ${obj.id}.`);
        processJson();
    });
}

module.exports = router;