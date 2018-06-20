const express = require("express");
const request = require("request");
const router = express.Router();

const response = require("../../response");
const { requestPageInfo } = require("../../webClient");
const { url } = require("../../hitomi-chan-utility");
const { isParamIdValid } = require("../../utils");

router.get("/big/:id/:fileName", (req, res) => {
    const id = parseInt(req.params.id);
    const fileName = req.params.fileName;

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    response.pipeImage(
        url.getBigThumbUrl(id, fileName),
        res
    );
});

router.get("/big/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    requestPageInfo(id, (pages) => {
        if(pages === null || pages.length === 0) {
            response.sendNotFoundResponse(res);
            return;
        }

        response.pipeImage(
            url.getBigThumbUrl(id, pages[0].name),
            res
        );
    });
});

router.get("/small/:id/:fileName", (req, res) => {
    const id = parseInt(req.params.id);
    const fileName = req.params.fileName;

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    response.pipeImage(
        url.getSmallThumbUrl(id, fileName),
        res
    );
});

module.exports = router;