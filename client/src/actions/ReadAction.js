const SET_GALLERY = "read/SET_GALLERY";
const SET_PAGES = "read/SET_PAGES";
const SET_PAGE_NUM = "read/SET_PAGE_NUM";
const SET_FIT_MODE = "read/SET_FIT_MODE";

function setGallery(gallery) {
    return {
        type: SET_GALLERY,
        gallery
    };
};

function setPages(pages) {
    return {
        type: SET_PAGES,
        pages
    };
}

function setPageNum(pageNum) {
    return {
        type: SET_PAGE_NUM,
        pageNum
    };
}

function setFitMode(fitToHeight) {
    return {
        type: SET_FIT_MODE,
        fitToHeight
    };
}

const ReadAction = {
    SET_GALLERY,
    SET_PAGES,
    SET_PAGE_NUM,
    SET_FIT_MODE,

    setGallery,
    setPages,
    setPageNum,
    setFitMode
};

export default ReadAction;