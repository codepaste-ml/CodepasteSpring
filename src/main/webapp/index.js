import './main.css';
import 'bootstrap/dist/css/bootstrap.min.css'

import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Switch} from 'react-router';
import {Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import {BrowserRouter} from 'react-router-dom';

const CodepasteNavbar = () => (
    <Navbar bg="light" expand="lg">
        <Navbar.Brand href="/">
            <img src="/favicon.png" height={40} className="d-inline-block" alt="Codepaste"/>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="codepaste-navbar"/>
        <Navbar.Collapse id="codepaste-navbar">
            <Nav className="mr-auto">
                <LinkContainer to="/">
                    <Nav.Link>Home</Nav.Link>
                </LinkContainer>
                <Nav.Link href="https://t.me/codepaste_bot">Telegram Bot</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
);

const Paste = () => {

};

const App = () => (
    <BrowserRouter>
        <CodepasteNavbar/>
        <Switch>
            <Route exact path="/"/>
            <Route path="/:alias" render={() => Paste}/>
        </Switch>
    </BrowserRouter>
);

ReactDOM.render(<App/>, document.getElementById("root"));