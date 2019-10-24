import React from 'react';
import './App.css';
import {Button} from "react-bootstrap";

/** This class renames the title of a song. It provides PATCH requests to the server, while providing a song ID. As
 * payload, it gives the song title which was inputted by the user, in JSON format. It is rendered as an input field
 * and a "Rename" button next to the song title. **/

class RenameApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            song_title: ""
        };
        this.renameSubmitted = this.renameSubmitted.bind(this);
    }

    handleSubmit = e => {
        e.preventDefault();

        fetch('/songs/' + this.props.song_id + '/rename', {
            // Headers and data to be sent to the server as part of the PATCH request.
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'PATCH',
            body: JSON.stringify({title: this.state.song_title})
        });
        setTimeout(function () { //Start the timer
            window.location.reload() //After 1 second, refresh page
        }, 1000)
    };

    renameSubmitted = (e) => {
        this.setState({song_title: e.target.value});
    };

    render() {
        return <div className="RenameApp">
            <form onSubmit={this.handleSubmit}>
                <label>
                    <input style={{width: 220}} type="text" name="rename" value={this.state.song_title}
                           onChange={this.renameSubmitted} placeholder="Title"/>
                </label>
                <Button variant="primary" type="submit" size="sm" value="Rename">Rename</Button>
            </form>
        </div>
    }
}

export default RenameApp;