import React from 'react';
import styled, {keyframes} from 'styled-components';

const CenterStyle = `
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;

const Beating = keyframes`
    0% {
        width: 100px;
        height: 100px;
    }
    5% {
        width: 110px;
        height: 110px;
    }
    100% {
        width: 100px;
        height: 100px;
    }
`;

const ContainerBg = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.75);
`;

const LoaderIcon = styled.div`
    ${CenterStyle}
    background-image: url(${require("../../img/loader.png")});
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    width: 100px;
    height: 100px;
    animation: ${Beating} 1s infinite;
`;

const LoaderText = styled.h3`
    ${CenterStyle}
    color: #fefefe;
    margin-top: 70px;
`;

export default class Loader extends React.Component {

    render() {
        return(
            <ContainerBg>
                <LoaderIcon />
                <LoaderText>Loading ...</LoaderText>
            </ContainerBg>
        );
    }
}
