import React from 'react';
import styled from 'styled-components';

import urls from '../../urls';

const Container = styled.div`
    position: relative;
    width: 100%;
    flex: 1;
`;

const Background = styled.div`
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: flex-start;
`;

const ImageDisplayer = ({onPageClick, galleryId, pageName, fitToHeight}) => (
    <Container id="imageDisplayer">
        <Background onClick={ onPageClick }>
            <img 
                id = "imagePage"
                src = {urls.getPageFileUrl(galleryId, pageName)}
                alt = "Page"
                style = {{
                    width: (fitToHeight ? "auto" : "100%"),
                    height: (fitToHeight ? "100%" : "auto"),
                    maxWidth: "100%",
                    objectFit: "contain",
                    userDrag: "none",
                    userSelect: "none",
                    MozUserSelect: "none",
                    WebkitUserDrag: "none",
                    WebkitUserSelect: "none",
                    MsUserSelect: "none",
                }}
            />
        </Background>
    </Container>
);

export default ImageDisplayer;