import React from 'react';
import './App.css';
import {Button} from "react-bootstrap";

/** This class deletes a song row. It provides DELETE requests to the server, while providing a song ID. It is rendered
 * as a "Delete" button on the last column of the Songs table. **/

class DeleteApp extends React.Component {
    deleteClicked = (e) => {
        e.preventDefault();
        fetch('/songs/' + this.props.id + '/delete', {
            method: 'delete'
        });
        setTimeout(function () { //Start the timer
            window.location.reload() //After 1 second, refresh page
        }, 1000)
    };

    render() {
        return <div className="DeleteApp">
            <Button variant="danger" type="submit" size="sm" onClick={this.deleteClicked}>Delete</Button>
        </div>
    }
}

export default DeleteApp;