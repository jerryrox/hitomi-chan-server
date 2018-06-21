function getGalleryByIdUrl(galleryId) {
    return `/api/gallery?id=${galleryId}`;
}

function getPageListUrl(galleryId) {
    return `/api/page/list/${galleryId}`;
}

function getPageFileUrl(galleryId, fileName) {
    return `/api/page/${galleryId}/${fileName}`;
}

const urls = {
    getGalleryByIdUrl,
    getPageListUrl,
    getPageFileUrl
};
export default urls;