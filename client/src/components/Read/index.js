import React from 'react';
import styled from 'styled-components';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { ReadAction } from '../../actions';

import api from '../../api';
import { requestFullScreen, tryParseInt } from '../../utils';

import ImageDisplayer from './ImageDisplayer';
import MenuDisplayer from './MenuDisplayer';
import Loader from '../Loader';

const ReadContainer = styled.div`
    width: 100%;
    height: 100%;
`;

const DisplayerContainer = styled.div`
    width: 100%;
    height: calc(100% - 40px);
`;

class Read extends React.Component {

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        this.initialize();
        this.setupKeyBinder();
    };

    componentWillReceiveProps = (newProps) => {
        if(newProps.pageNum !== this.props.pageNum) {
            this.updateQuery(newProps.pageNum);

            this.invalidateImage();
            this.resetScroll();
        }
    };

    setupKeyBinder = () => {
        document.addEventListener("keydown", (e) => {
            if(e.keyCode === 37) {
                this.navigateBackward();
            }
            else if(e.keyCode === 39) {
                this.navigateForward();
            }
        });
    }

    onPageClick = (e) => {
        let totalWidth = document.body.clientWidth;
        let clickPos = e.pageX;
        if(clickPos < totalWidth / 2)
            this.navigateBackward();
        else
            this.navigateForward();
    };

    initialize = () => {
        if(this.getIsInitialized())
            return;

        const galleryId = this.props.match.params.id;

        // Get gallery info
        api.getGallery(galleryId, (gallery) => {
            if(gallery === null) {
                return;
            }
            this.props.setGallery(gallery);
            // Get pages array
            api.getPages(galleryId, (pages) => {
                if(pages === null) {
                    return;
                }
                this.props.setPages(pages);
                this.initializeQuery();
            });
        });
    };

    initializeQuery = () => {
        let queriedPage = new URLSearchParams(document.location.search);
        if(queriedPage.has("page")) {
            this.setPageNumber(
                tryParseInt(queriedPage.get("page"), 1)
            );
        }
    };

    updateQuery = (pageNum) => {
        let query = `?page=${pageNum}`;

        let loc = window.location;
        var newUrl = `${loc.protocol}//${loc.host}${loc.pathname}${query}`;
        window.history.pushState({path:newUrl}, '', newUrl);
    };

    getIsInitialized = () => {
        return this.props.gallery !== null && this.props.pages !== null;
    };

    getPagesCount = () => {
        return this.props.pages.length;
    }

    setFitToHeight = () => {
        this.props.setFitMode(true);
    };

    setFitToWidth = () => {
        this.props.setFitMode(false);
    };

    setFullScreen = () => {
        let displayer = document.querySelector("#imageDisplayer");
        if(!displayer)
            return;
        if(requestFullScreen(displayer))
            this.setFitToHeight();
    };

    setPageNumber = (pageNum) => {
        if(!this.getIsInitialized())
            return;
        this.props.setPageNum(pageNum);
    }

    navigateForward = () => {
        this.setPageNumber(this.props.pageNum + 1);
    };

    navigateBackward = () => {
        this.setPageNumber(this.props.pageNum - 1);
    };

    resetScroll = () => {
        document.documentElement.scrollTop = 0;
    };

    invalidateImage = () => {
        let img = document.querySelector("#imagePage");
        if(!img)
            return;
        img.src = "";
    }

    render() {
        return(
            <ReadContainer>
                { !this.getIsInitialized() && <Loader /> }
                { this.getIsInitialized() && this.renderInitialized() }
            </ReadContainer>
        );
    }

    renderInitialized() {
        const { pages, pageNum, gallery,fitToHeight } = this.props;
        return (
            <DisplayerContainer>
                <MenuDisplayer
                    onClose = { () => window.close() }
                    onPrev = { this.navigateBackward }
                    onNext = { this.navigateForward }
                    onFit = { this.setFitToHeight }
                    onFill = { this.setFitToWidth }
                    onFull = { this.setFullScreen }
                    pageNumber = { pageNum }
                    pageCount = { pages.length }
                    fitToHeight = { fitToHeight }
                />
                <ImageDisplayer
                    onPageClick = { this.onPageClick }
                    galleryId = { gallery.id }
                    pageName = { pages[pageNum-1].name }
                    fitToHeight = { fitToHeight }
                />
            </DisplayerContainer>
        );
    }
}

const mapStateToProps = (state) => {
    const { gallery, pages, pageNum, fitToHeight } = state.read;
    return {
        gallery, pages, pageNum, fitToHeight
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        setGallery: bindActionCreators(ReadAction.setGallery, dispatch),
        setPages: bindActionCreators(ReadAction.setPages, dispatch),
        setPageNum: bindActionCreators(ReadAction.setPageNum, dispatch),
        setFitMode: bindActionCreators(ReadAction.setFitMode, dispatch)
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Read);