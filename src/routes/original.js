const express = require("express");
const router = express.Router();

const response = require("../response");
const { url } = require("../hitomi-chan-utility");
const { isParamIdValid } = require("../utils");

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    if(!isParamIdValid(id)) {
        res.send(response.getInvalidGalleryIdResponse());
        return;
    }

    res.send(response.getSuccessResponse(url.getGalleryUrl(req.params.id)));
});

module.exports = router;