import React from 'react';
import styled from 'styled-components';

import urls from '../../urls';

const Container = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
`;

const Background = styled.div`
    position: relative;
    width: 100%;
    height: 100%;
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
                    objectFit: "contain"
                }}
            />
        </Background>
    </Container>
);

export default ImageDisplayer;