import React from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import * as serviceWorker from './serviceWorker';

import SongsApp from './SongsApp';
import ArtistsApp from "./ArtistsApp";
import {Navbar, Nav} from "react-bootstrap"

import {
    BrowserRouter as Router,
    Route,
    Switch
} from "react-router-dom";

/** This is the main page, with 2 buttons that link to the Songs and Artists pages, placed in the navbar. **/

const routing = (
    <div>
        <Router>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="/">CORGIS MUSIC SET</Navbar.Brand>

                <Nav>
                    <Nav.Link href="/songs"> Songs </Nav.Link>
                    <Nav.Link href="/artists"> Artists </Nav.Link>
                </Nav>
            </Navbar>
            <Switch>
                <Route path="/songs" component={SongsApp}/>
                <Route path="/artists" component={ArtistsApp}/>
            </Switch>
        </Router>
    </div>
);

ReactDOM.render(routing, document.getElementById('root'));

serviceWorker.register();
