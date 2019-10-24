import React, {Component} from 'react';
import './App.css';
import {Artist} from "./components/Artist";
import Popup from "reactjs-popup";
import {Button} from "react-bootstrap";
import * as PropTypes from "prop-types";

/** This class renders the Artist Details popup. It does a GET request to the server with the given artist name. It then
 * displays the statistics, and a list of songs of that artists with some main details. This class activates when
 * pressing the "Stats" button on the Artists page. **/

class ArtistApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            artist_songs: [],
            stat_mean: 0,
            stat_median: 0,
            stat_st_dev: 0,
            unique_song_years: [],
            terms: "",
            name: "",
        };
        this.doFetch = this.doFetch.bind(this);
    }

    doFetch = e => {
        e.preventDefault();
        this.fetcher(null);
    };

    fetcher = (queryParam) => {
        let url = '/artists/' + this.props.name;
        if (queryParam !== null) {
            url += queryParam;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => this.setState({
                artist_songs: data.artist_songs,
                stat_mean: data.stats_json.Mean,
                stat_median: data.stats_json.Median,
                stat_st_dev: data.stats_json.St_Dev,
                unique_song_years: data.unique_song_years
            }));
    };

    handleChange = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            this.fetcher(null);
        } else {
            this.fetcher('?year=' + e.target.value);
        }
    };

    render() {
        return (
            <Popup onOpen={this.doFetch} trigger={<Button variant="outline-info" size="sm">Stats</Button>}>
                <div className="ArtistApp"><Artist artist={this.state}/>

                    {/*This calls the YearFilterApp defined below to filter the Artist songs.*/}
                    <YearFilterApp onChange={this.handleChange} uniqueSongYears={this.state.unique_song_years}
                                   callbackfn={(song_year) =>
                                       <option key={song_year} value={song_year}> {song_year}</option>}/>
                </div>
            </Popup>
        );

    }
}

/** This class implements filtering of the artist songs by year. This is done in the Artist Details popup. **/

class YearFilterApp extends Component {
    render() {
        return <select onChange={this.props.onChange} defaultValue={'DEFAULT'}>
            <option value="DEFAULT" disabled>Filter by Year</option>
            <option value="">All years</option>
            {this.props.uniqueSongYears == null ? null : this.props.uniqueSongYears.map(this.props.callbackfn)}
        </select>;
    }
}

YearFilterApp.propTypes = {
    onChange: PropTypes.func,
    uniqueSongYears: PropTypes.any,
    callbackfn: PropTypes.func
};

export default ArtistApp;