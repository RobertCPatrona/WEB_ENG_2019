import './App.css';
import {Songs} from "./components/Songs";
import React, {Component} from "react";
import {Button} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {Header} from 'semantic-ui-react';

/** This class implements the Songs page. It does GET requests to the server, including query parameters for artist name,
 * year and terms for optional filtering of the songs. It then uses the Songs.js component to render the Songs table. **/

class SongsApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            artist_name: "",
            year: "",
            terms: "",
            currPage: 0,
            totalSongs: 0,
            entryPerPage: 30
        }
    }

    componentDidMount() {
        fetch('/songs')
            .then(response => response.json())
            .then(data => this.setState({songs: data.Songs, totalSongs: data.totalSongs}));
    }

    artistNameInputChange = e => {
        this.setState({currPage: 0});
        this.setState({artist_name: e.target.value});
    };

    yearInputChange = e => {
        this.setState({currPage: 0});
        this.setState({year: e.target.value});
    };

    termsInputChange = e => {
        this.setState({currPage: 0});
        this.setState({terms: e.target.value});
    };

    fetcher = (queryParams) => {
        fetch('/songs' + queryParams)
            .then(response => response.json())
            .then(data => this.setState({songs: data.Songs, totalSongs: data.totalSongs}));
    };

    handleSubmit = e => {
        e.preventDefault();
        this.setState({currPage: 0});
        this.handleFetchRequest(this.state.currPage, this.state.entryPerPage);
    };

    // This function calls the fetcher with the given parameters. The "fetcher" function does the GET request for songs
    // to the servers with the parameters given, thus filtering the song list.
    handleFetchRequest = (currentPage, entryPerPage) => {
        let query_parms = "";
        if (this.state.artist_name !== "" && this.state.year !== "" && this.state.terms !== "") {
            query_parms = '?artist=' + this.state.artist_name + "&year=" + this.state.year + "&terms=" + this.state.terms;
        } else if (this.state.artist_name === "" && this.state.year !== "" && this.state.terms !== "") {
            query_parms = "?year=" + this.state.year + "&terms=" + this.state.terms;
        } else if (this.state.artist_name !== "" && this.state.year === "" && this.state.terms !== "") {
            query_parms = '?artist=' + this.state.artist_name + "&terms=" + this.state.terms;
        } else if (this.state.artist_name !== "" && this.state.year !== "" && this.state.terms === "") {
            query_parms = '?artist=' + this.state.artist_name + "&year=" + this.state.year;
        } else if (this.state.artist_name === "" && this.state.year === "" && this.state.terms !== "") {
            query_parms = "?terms=" + this.state.terms;
        } else if (this.state.artist_name === "" && this.state.year !== "" && this.state.terms === "") {
            query_parms = "?year=" + this.state.year;
        } else if (this.state.artist_name !== "" && this.state.year === "" && this.state.terms === "") {
            query_parms = '?artist=' + this.state.artist_name;
        }
        if (query_parms === "") {
            this.fetcher("?pageSize=" + entryPerPage + "&pageStartIndex=" + currentPage);
        } else {
            this.fetcher(query_parms + "&pageSize=" + entryPerPage + "&pageStartIndex=" + currentPage);
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

    render() {
        return <div className="SongsApp">
            <Header as="h2" style={{marginLeft: 20, marginTop: 10}}> Songs </Header>
            <div style={{textAlign: 'right'}}>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        <input id="inputClass" type="text" name="artist_name" value={this.state.artist_name}
                               placeholder="Artist Name"
                               onChange={this.artistNameInputChange}/>
                        <input type="text" name="year" value={this.state.year} placeholder="Year"
                               onChange={this.yearInputChange}/>
                        <input id="inputClass" type="text" name="terms" value={this.state.terms} placeholder="Terms"
                               onChange={this.termsInputChange}/>
                    </label>
                    <Button variant="primary" type="submit" size="sm" id="filterButton">Filter</Button>
                </form>
            </div>
            <Songs songs={this.state.songs}/>

            Showing page {this.state.currPage + 1} of {Math.ceil(this.state.totalSongs / this.state.entryPerPage)}

            <Pagination currPage={this.state.currPage} onClick={this.handlePrevPage}
                        totalArtists={this.state.totalArtists} entryPerPage={this.state.entryPerPage}
                        onClick1={this.handleNextPage}/>
        </div>
    }
}

/** This class implements pagination and only shows 30 rows per page. The user can navigate using the Prvious and Next
 * buttons. **/

class Pagination extends Component {
    render() {
        return <div className="pagination">
            {this.props.currPage <= 0 ? null :
                <Button variant="primary" type="submit" size="sm" id="filterButton" onClick={this.props.onClick}>Previous
                    page</Button>}

            {Math.ceil(this.props.totalArtists / this.props.entryPerPage) === this.props.currPage + 1 ? null :
                <Button variant="primary" type="submit" size="sm" id="filterButton" onClick={this.props.onClick1}>Next
                    page</Button>}
        </div>;
    }
}

Pagination.propTypes = {
    currPage: PropTypes.any,
    onClick: PropTypes.func,
    totalArtists: PropTypes.number,
    entryPerPage: PropTypes.number,
    onClick1: PropTypes.func
};

export default SongsApp;
