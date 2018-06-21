import { ReadAction } from '../actions';

const initialState = {
    gallery: null,
    pages: null,
    pageNum: 1,
    fitToHeight: true
};

function clamp(value, a, b) {
    if(value < a)
        return a;
    else if(value > b)
        return b;
    return value;
}

export default function read(state = initialState, action) {
    switch(action.type) {
    case ReadAction.SET_GALLERY:
        return setGallery(state, action);
    case ReadAction.SET_PAGES:
        return setPages(state, action);
    case ReadAction.SET_PAGE_NUM:
        return setPageNum(state, action);
    case ReadAction.SET_FIT_MODE:
        return setFitMode(state, action);
    default:
        return state;
    }
}

function setGallery(state, action) {
    return {
        ...state,
        gallery: action.gallery
    };
}

function setPages(state, action) {
    return {
        ...state,
        pages: action.pages
    };
}

function setPageNum(state, action) {
    let pageNum = clamp(action.pageNum, 1, state.pages.length || 1);
    return {
        ...state,
        pageNum
    };
}

function setFitMode(state, action) {
    return {
        ...state,
        fitToHeight: action.fitToHeight
    };
}