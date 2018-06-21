import axios from 'axios';
import urls from './urls';

/**
 * Returns a gallery object or null, if fail.
 */
function getGallery(galleryId, callback) {
    axios.get(urls.getGalleryByIdUrl(galleryId))
        .then(res => {
            const { isSuccess, data } = res.data;
            if(!isSuccess || data === null) {
                callback(null);
                return;
            }
            callback(data[0]);
        })
        .catch(err => {
            console.log(`api.getGallery - Error: ${JSON.stringify(err)}`)
            callback(null);
        });
}

/**
 * Returns an array of page objects or null, if fail.
 */
function getPages(galleryId, callback) {
    axios.get(urls.getPageListUrl(galleryId))
        .then(res => {
            const { isSuccess, data } = res.data;
            if(!isSuccess || data === null) {
                callback(null);
                return;
            }
            callback(data);
        })
        .catch(err => {
            console.log(`api.getPages - Error: ${JSON.stringify(err)}`)
            callback(null);
        });
}

/**
 * Returns an image of a page or null, if fail.
 */
function getPageFile(galleryId, fileName, callback) {
    axios.get(urls.getPageFileUrl(galleryId, fileName))
        .then(res => {
            callback(res.data);
        })
        .catch(err => {
            console.log(`api.getPageFile - Error: ${JSON.stringify(err)}`);
            callback(null);
        });
}

const api = {
    getGallery,
    getPages,
    getPageFile
};
export default api;