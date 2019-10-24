import React from 'react';
import './App.css';
import Popup from "reactjs-popup";
import {Button} from "react-bootstrap";

/** This class does a POST request to the server with the song values entered by the user, as form controls. The song is
 * associated with the artist, from where the "Add Song" button is pressed. The values make up a new song in the CSV
 * music file. **/

class AddSongApp extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            formControls: {
                title: {value: ''},
                terms: {value: ''},
                duration: {value: 0},
                hotness: {value: 0},
                songID: {value: ''},
                key: {value: 0},
                loudness: {value: 0},
                tempo: {value: 0},
                year: {value: 0}
            }
        };
        this.handleChange = this.handleChange.bind(this);
    }

    addSongClicked = (e) => {
        e.preventDefault();
        fetch('/artists/' + this.props.artist.artist_name + '/addSong', {
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify({
                familiarity: this.props.artist.artist_familiarity,
                artist_hotness: this.props.artist.artist_hotttnesss,
                artist_id: this.props.artist.artist_id,
                latitude: this.props.artist.artist_latitude,
                location: this.props.artist.artist_location,
                longitude: this.props.artist.artist_longitude,
                name: this.props.artist.artist_name,
                similar: this.props.artist.artist_similar,
                terms_freq: this.props.artist.artist_terms_freq,
                title: this.state.formControls.title.value,
                terms: this.state.formControls.terms.value,
                duration: this.state.formControls.duration.value,
                hotness: this.state.formControls.hotness.value,
                songID: this.state.formControls.songID.value,
                key: this.state.formControls.key.value,
                loudness: this.state.formControls.loudness.value,
                tempo: this.state.formControls.tempo.value,
                year: this.state.formControls.year.value
            })
        });
        setTimeout(function () { //Start the timer
            window.location.reload() //After 1 second, refresh page
        }, 1000)
    };

    // Function that sets the inputted values for their corresponding fields in the song.
    handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;

        this.setState({
            formControls: {
                ...this.state.formControls,
                [name]: {
                    ...this.state.formControls[name],
                    value
                }
            }
        });
    };

    // This renders the form for the user to input values for the new song.
    render() {
        return <div className="AddSongApp">
            <Popup trigger={<Button> Add Song</Button>} position="bottom right">
                <form onSubmit={this.addSongClicked}>
                    <label>
                        Title:<input type="text" name="title" value={this.state.formControls.title.value}
                                     onChange={this.handleChange}/>
                        Terms:<input type="text" name="terms" value={this.state.formControls.terms.value}
                                     onChange={this.handleChange}/>
                        Duration:<input type="number" name="duration"
                                        value={this.state.formControls.duration.value}
                                        onChange={this.handleChange} step="0.0001"/>
                        Hotness:<input type="number" name="hotness"
                                       value={this.state.formControls.hotness.value}
                                       onChange={this.handleChange} step="0.00001"/>
                        ID:<input type="text" name="songID" value={this.state.formControls.songID.value}
                                  onChange={this.handleChange}/>
                        Key:<input type="number" name="key" value={this.state.formControls.key.value}
                                   onChange={this.handleChange}/>
                        Loudness:<input type="number" name="loudness"
                                        value={this.state.formControls.loudness.value}
                                        onChange={this.handleChange} step="0.001"/>
                        Tempo:<input type="number" name="tempo" value={this.state.formControls.tempo.value}
                                     onChange={this.handleChange} step="0.001"/>
                        Year:<input type="number" name="year" value={this.state.formControls.year.value}
                                    onChange={this.handleChange}/>
                    </label>
                    <Button variant="primary" type="submit" size="sm">Done</Button>
                </form>
            </Popup>
        </div>
    }
}

export default AddSongApp;