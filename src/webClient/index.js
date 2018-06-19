const axios = require("axios");

const { url, util, PageInfo } = require("../hitomi-chan-utility");

/**
 * Requests for a gallery's page info array.
 * @param {(pages: Array<PageInfo>) => void} callback
 */
function requestPageInfo(galleryId, callback) {
    let target = url.getPageInfoUrl(galleryId);
    axios.get(target)
        .then(res => {
            callback(util.parsePageInfo(res.data));
        })
        .catch(err => {
            callback(null);
        });
}

module.exports = {
    requestPageInfo
};