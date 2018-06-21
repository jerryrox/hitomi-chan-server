const express = require("express");
const router = express.Router();

const { isParamIdValid } = require("../../utils");
const { url } = require("../../hitomi-chan-utility");
const response = require("../../response");
const webClient = require("../../webClient");

router.get("/list/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    webClient.requestPageInfo(id, (pages) => {
        if(pages === null) {
            response.sendNotFoundResponse(res);
            return;
        }

        res.send(response.getSuccessResponse(pages));
    });
});

router.get("/:id/:pageName", (req, res) => {
    const id = parseInt(req.params.id);
    const pageName = req.params.pageName;

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    response.pipeImage(
        url.getPageFileUrl(id, pageName),
        res
    );
});

module.exports = router;