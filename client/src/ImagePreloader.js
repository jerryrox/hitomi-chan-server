/**
 * Helper class that preloads the next manga images for a better experience.
 */
class ImagePreloader {

    // this.preloadInfos

    constructor() {
        /**
         * @typedef {PreloadInfo}
         */
        this.preloadInfos = null;
    }

    preload(nextImageUrls) {
        var newInfos = [];
        for(var i=0; i<nextImageUrls.length; i++)
        {
            var curUrl = nextImageUrls[i];
            if(curUrl === null) {
                continue;
            }

            var existingInfo = this.findInfoFromUrl(curUrl);
            if(existingInfo === null) {
                existingInfo = new PreloadInfo(curUrl);
                existingInfo.loadImage();
            }
            newInfos.push(existingInfo);
        }

        this.preloadInfos = newInfos;
    }

    findInfoFromUrl(url) {
        if(this.preloadInfos === null)
            return null;
        for(var i=0; i<this.preloadInfos.length; i++) {
            if(this.preloadInfos[i].getUrl() === url)
                return this.preloadInfos[i];
        }
        return null;
    }

    removeAll() {
        this.preloadInfos = null;
    }
}

class PreloadInfo {

    // this.url
    // this.image

    constructor(url) {
        this.url = url;
        this.image = null;
    }

    loadImage() {
        this.image = new Image();
        this.image.onload = function() {
            // Browser will cache it anyways
            this.image = null;
        }
        this.image.src = this.url;
    }

    getUrl() {
        return this.url;
    }

    getImage() {
        return this.image;
    }
}

const imagePreloader = new ImagePreloader();
export default imagePreloader;