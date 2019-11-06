import React, {Component} from 'react';
import './App.css';
import {ArtistLink} from "./components/ArtistLink";
import Popup from "reactjs-popup";
import {Button} from "react-bootstrap";
import * as PropTypes from "prop-types";
import {
    Link
} from "react-router-dom";

/** This class renders the Artist Name link popup. It does a GET request to the server with given artist name of the
 * selected song. It then displays some of the important information about the artist, and a list of songs of that
 * artists with some main song details. This class activates when pressing button with the Artist name on the Artists
 * page. In the popup, there is an optional filter by year, and a button which links to teh main Artists page. It thus
 * links a song with its artist, and then to the Artists page.**/

class ArtistLinkApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            songs: [],
            unique_song_years: []
        };
    }

    componentDidMount() {
        this.fetcher(null);
    }

    fetcher = (queryParam) => {
        let url = '/artists/' + this.props.name;
        if (queryParam !== null) {
            url += queryParam;
        }
        fetch(url)
            .then(response => response.json())
            .then(data => {
                this.setState({
                    songs: data.artist_songs,
                    unique_song_years: data.unique_song_years
                });
            });
    };

    handleChange = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            this.fetcher(null);
        } else {
            this.fetcher('?year=' + e.target.value);
        }
    };

    // The class implements a link which does a GET request to the server while passing the artist name. Then it uses the
    // ArtistLink component which renders the popup with the details of the song's artist and a link to the main Artists page.
    render() {
        if (typeof this.state.songs[0] !== "undefined") {
            return (
                <Popup
                    trigger={<Button variant="outline-info" size="sm">{this.state.songs[0].Song.artist_name}</Button>}>
                    <div className="ArtistLinkApp">
                        <ArtistLink songs={this.state.songs}/>

                        {/*This calls the YearFilterApp defined below to filter the Artist's songs.*/}
                        <YearFilterApp onChange={this.handleChange} uniqueSongYears={this.state.unique_song_years}
                                       callbackfn={(song_year) =>
                                           <option key={song_year} value={song_year}> {song_year}</option>}/>
                        <br/>
                        <Link to="/artists">All Artists</Link>
                    </div>
                </Popup>
            );
        } else {
            return " "
        }
    }
}

/** This class implements filtering of the artist songs by year. This is done in the Artist Name link popup. **/

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

export default ArtistLinkApp;