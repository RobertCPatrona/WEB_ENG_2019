import React, {Component} from 'react';
import './App.css';
import {Artists} from "./components/Artists";
import {Form, Button} from "react-bootstrap"
import * as PropTypes from "prop-types";
import {Header} from 'semantic-ui-react';

/** This class renders the Artists page. It does GET requests to the server to retrieve the list of artists with their
 * details. It also sends query parameters to the server in order to filter the list based on artists name or terms.  **/

class ArtistsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artists: [],
            terms: "",
            name: "",
            currPage: 0,
            totalArtists: 0,
            entryPerPage: 30
        };

        this.handlePrevPage = this.handlePrevPage.bind(this);
        this.handleNextPage = this.handleNextPage.bind(this);
    }

    componentDidMount() {
        fetch('/artists')
            .then(response => response.json())
            .then(data => this.setState({artists: data.Artists, totalArtists: data.totalArtists}));
    }

    genreInputChange = e => {
        this.setState({terms: e.target.value});
    };

    nameInputChange = e => {
        this.setState({name: e.target.value});
    };

    fetcher = (queryParams) => {
        fetch('/artists' + queryParams)
            .then(response => response.json())
            .then(data => this.setState({artists: data.Artists, totalArtists: data.totalArtists}));
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({currPage: 0});
        this.handleFetchRequest(this.state.currPage, this.state.entryPerPage);
    };

    // This handles the fetch requests and calls the "fetcher" function which does a GET request to the server with the
    // given parameters.
    handleFetchRequest = (currentPage, entryPerPage) => {
        if (this.state.terms !== "" && this.state.name !== "") {
            this.fetcher("?pageSize=" + entryPerPage + "&pageStartIndex=" + currentPage + '&terms=' + this.state.terms + "&name=" + this.state.name);
        } else if (this.state.terms !== "" && this.state.name === "") {
            this.fetcher("?pageSize=" + entryPerPage + "&pageStartIndex=" + currentPage + '&terms=' + this.state.terms);
        } else if (this.state.terms === "" && this.state.name !== "") {
            this.fetcher("?pageSize=" + entryPerPage + "&pageStartIndex=" + currentPage + "&name=" + this.state.name);
        } else {
            this.fetcher("?pageSize=" + entryPerPage + "&pageStartIndex=" + currentPage);
        }
        this.setState({currPage: currentPage})
    };

    handlePrevPage = (e) => {
        e.preventDefault();
        this.handleFetchRequest((this.state.currPage - 1), this.state.entryPerPage);
    };

    handleNextPage = (e) => {
        e.preventDefault();
        this.handleFetchRequest((this.state.currPage + 1), this.state.entryPerPage);
    };

    // This calls the Artists.js file which renders the artists table.
    render() {
        return <div className="ArtistsApp">
            <Header as="h2" style={{marginLeft: 20, marginTop: 10}}> Artists </Header>
            <div style={{textAlign: 'right'}}>
                <Form onSubmit={this.handleSubmit}>
                    <label>
                        <input id="inputClass" type="text" name="terms" value={this.state.terms} placeholder="Genre"
                               onChange={this.genreInputChange}/>
                        <input type="text" name="name" value={this.state.name} placeholder="Artist"
                               onChange={this.nameInputChange}/>
                    </label>
                    <Button variant="primary" type="submit" size="sm" id="filterButton">Filter</Button>
                </Form>
            </div>
            <Artists artists={this.state.artists}/>

            Showing page {this.state.currPage + 1} of {Math.ceil(this.state.totalArtists / this.state.entryPerPage)}

            <div className="pagination">
                <Pagination currPage={this.state.currPage} onClick={this.handlePrevPage}
                            totalArtists={this.state.totalArtists} entryPerPage={this.state.entryPerPage}
                            onClick1={this.handleNextPage}/>
            </div>
        </div>
    }
}

/** This class implements pagination and only shows 30 rows per page. The user can navigate using the Prvious and Next
 * buttons.  **/

class Pagination extends Component {
    render() {
        return <>
            {this.props.currPage <= 0 ? null :
                <Button variant="primary" type="submit" size="sm" id="filterButton"
                        onClick={this.props.onClick}>Previous
                    page</Button>}

            {/* Implements pagination by pressing Previous and Next buttons. */}
            {Math.ceil(this.props.totalArtists / this.props.entryPerPage) === this.props.currPage + 1 ? null :
                <Button variant="primary" type="submit" size="sm" id="filterButton"
                        onClick={this.props.onClick1}>Next
                    page</Button>}
        </>;
    }
}

Pagination.propTypes = {
    currPage: PropTypes.any,
    onClick: PropTypes.func,
    totalArtists: PropTypes.any,
    entryPerPage: PropTypes.any,
    onClick1: PropTypes.func
};

export default ArtistsApp;