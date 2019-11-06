import './App.css';
import {Song} from "./components/Song"
import Popup from "reactjs-popup";
import React from "react";
import {Button} from "react-bootstrap";

/** This class implements the song popup. It does GET requests to the server, with a song ID, which is given by the
 * user pressing the "Details" button. It then calls the Song.js component to render the song details. **/

class SongApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song: {}
        };
        this.fetchSongDetails = this.fetchSongDetails.bind(this)
    }

    fetchSongDetails = (e) => {
        fetch('/songs?id=' + this.props.id)
            .then(response => response.json())
            .then(data => this.setState({
                song: data.Song
            }));
    };

    render() {
        return <div className="SongApp">
            <Popup onOpen={this.fetchSongDetails} trigger={<Button variant="info" type="submit" size="sm">Details</Button>} position="right top">
                <div><Song song={this.state}/></div>
            </Popup>
        </div>
    }
}

export default SongApp;
