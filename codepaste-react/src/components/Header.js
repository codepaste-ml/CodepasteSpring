import {Nav, Navbar} from "react-bootstrap";
import {LinkContainer} from "react-router-bootstrap";
import React from "react";

export const Header = () => (
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