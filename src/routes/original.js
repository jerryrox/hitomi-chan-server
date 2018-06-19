const express = require("express");
const router = express.Router();

const response = require("../response");
const { url } = require("../hitomi-chan-utility");

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id);

    // Invalid param
    if(id <= 0 || isNaN(id)) {
        res.send(response.getFailResponse("id must be an integer value!"));
        return;
    }

    res.send(response.getSuccessResponse({
        link: url.getGalleryUrl(req.params.id)
    }));
});

module.exports = router;