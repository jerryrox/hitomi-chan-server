import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    min-height: 40px;
    height: 40px;
    width: 100%;
    z-index: 10000000;

    @media (max-width: 559px) {
        height: 80px;
    }
`;

const BarContainer = styled.div`
    height: auto;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #222;
    border-bottom: #333 solid 1px;
`;

const Content = styled.div`
    width: 100%;
    max-width: 720px;
    margin: auto;
`;

const List = styled.ul`
    display: flex;
    flex-wrap: wrap;
`;

const Item = styled.li`
    flex: 1;
    min-width: 80px;
    height: 40px;
`;

const Button = styled.button`
    background: rgba(1, 1, 1, 0);
    border: none;
    width: 100%;
    height: 100%;
    padding: auto;
    text-align: center;

    &:hover {
        background: rgba(0, 0, 0, 0.25)
    }
    &:active {
        background: rgba(0, 0, 0, 0.5)
    }
    &:focus {
        outline: none;
    }
`;

const Selection = styled.select`
    background: #fff;
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;

    &:focus {
        outline: none;
    }
`;

const Icon = styled.i`
    display: inline;
    color: #fefefe;
    font-size: 12px;
    margin: auto 5px auto 5px;
`;

const Label = styled.span`
    display: inline;
    color: #fff;
    margin: auto 5px auto 5px;
    font-size: 12px;
`;

function drawPageOptions(pageCount) {
    let options = [];
    for(let i=0; i<pageCount; i++) {
        let num = i + 1;
        options.push( 
            <option key={num} value={num}>
                Page {num}
            </option>
        );
    }
    return options;
}

function test(e) {
    console.log(e.target.value)
}

const MenuDisplayer = ({
    onClose, onPrev, onNext, onFit, onFill, onFull, onSetPageNum,
    pageNumber, pageCount, fitToHeight
}) => (

    <Container>
        <BarContainer>
            <Content>
                <List>
                    <Item>
                        <Button onClick={onClose}>
                            <Icon className="fa fa-arrow-circle-left"/>
                            <Label>Close</Label>
                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={onPrev}>
                            <Icon className="fa fa-angle-left"/>
                            <Label>Prev</Label>
                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={onNext}>
                            <Icon className="fa fa-angle-right"/>
                            <Label>Next</Label>
                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={onFit}>
                            <Icon className="fa fa-arrows-v"/>
                            <Label>Fit</Label>
                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={onFill}>
                            <Icon className="fa fa-arrows-h"/>
                            <Label>Fill</Label>
                        </Button>
                    </Item>
                    <Item>
                        <Button onClick={onFull}>
                            <Icon className="fa fa-expand"/>
                            <Label>Full</Label>
                        </Button>
                    </Item>
                    <Item>
                        <Selection value={pageNumber} onChange={ onSetPageNum }>
                            {drawPageOptions(pageCount)}
                        </Selection>
                    </Item>
                </List>
            </Content>
        </BarContainer>
    </Container>
);

export default MenuDisplayer;