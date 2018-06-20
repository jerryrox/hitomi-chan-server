const express = require("express");
const router = express.Router();

const response = require("../../response");
const dbClient = require("../../dbClient");
const { url } = require("../../hitomi-chan-utility");
const { isParamIdValid } = require("../../utils");

router.get("/anime/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    dbClient.findGalleryById(id, (data) => {
        if(data === undefined) {
            res.send(response.getFailResponse());
            return;
        }
        else if(data === null) {
            res.send(response.getSuccessResponse(null));
            return;
        }

        let galleryName = data[0].n;
        res.send(response.getSuccessResponse(
            url.getAnimeFileUrl(galleryName)
        ));
    });
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    dbClient.findGalleryById(id, (data) => {
        if(data === undefined) {
            res.send(response.getFailResponse());
            return;
        }
        else if(data === null) {
            res.send(response.getSuccessResponse(null));
            return;
        }

        res.send(response.getSuccessResponse(
            url.getGalleryUrl(id)
        ));
    });
});

module.exports = router;