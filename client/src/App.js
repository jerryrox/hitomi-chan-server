import React, { Component } from 'react';
import { Route, Switch } from 'react-router'
import styled, { injectGlobal } from 'styled-components';
import { reset } from 'styled-reset';

import Read from './components/Read';
import Watch from './components/Watch';

const baseStyle = () => injectGlobal`
	${reset}
	body {
		margin: 0;
		padding: 0;
		font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
		overflow-x: hidden;
	}
`;

const Container = styled.div`
	width: 100vw;
	height: 100vh;
`;

class App extends Component {

	render() {
		baseStyle();
		return (
			<Container>
				<Switch>
					<Route path="/gallery/read/:id" component={Read} />
					<Route path="/gallery/watch/:id" component={Watch} />
				</Switch>
			</Container>
		);
	}
}

export default App;
