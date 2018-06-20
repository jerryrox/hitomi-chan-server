const express = require("express");
const router = express.Router();
const request = require("request");

const { isParamIdValid } = require("../../utils");
const { url } = require("../../hitomi-chan-utility");
const response = require("../../response");
const dbClient = require("../../dbClient");

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    dbClient.findGalleryById(id, (data) => {
        if(data === undefined) {
            res.send(response.getQueryErrorResponse());
            return;
        }
        else if(data === null) {
            response.sendNotFoundResponse(res);
            return; 
        }

        let galleryName = data[0].n;
        request(url.getAnimeFileUrl(galleryName)).pipe(res);
    });
});

module.exports = router;