import './App.css';
import Popup from "reactjs-popup";
import React from "react";
import {Button} from "react-bootstrap";
import Plot from 'react-plotly.js';

/** This class is a value added feature which provides a plot of years vs hotness for a given artist. It uses a
 * third party library "Plotly". It does a GET request to the server, while providing an artist name. The server
 * responds with a list of songs of that artist. It takes the years and hotness values of the received songs from the
 * server response and plots them on a graph. The grah pops up when pressing the "Graph" button. **/

class GraphApp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            my_songs: [],
        };
        this.funcX = this.funcX.bind(this);
        this.funcY = this.funcY.bind(this);
        this.doFetch = this.doFetch.bind(this);
    }

    doFetch = e => {
        e.preventDefault();
        fetch('/artists/' + this.props.name)
            .then(response => response.json())
            .then(data => this.setState({
                my_songs: data.artist_songs
            }))
    };

    years_array = [];
    hotness_array = [];

    // Computes data on the X axis.
    funcX() {
        this.years_array = [];
        this.state.my_songs.map((song) => {
            return this.years_array.push(song.Song.song_year);
        });
        return this.years_array
    };

    // Computes data on the Y axis.
    funcY() {
        this.hotness_array = [];
        this.state.my_songs.map((song) => {
            return this.hotness_array.push(song.Song.song_hotttnesss)
        });
        return this.hotness_array
    };

    render() {
        return (
            <Popup onOpen={this.doFetch} trigger={<Button variant="outline-info" size="sm">Graph</Button>}>
                <Plot
                    data={[
                        {
                            x: this.funcX(),
                            y: this.funcY(),
                            type: 'scatter',
                            mode: 'lines+markers',
                            marker: {color: 'red'},
                        },
                    ]}
                    layout={{
                        width: 500, height: 350, title: this.props.name + ': Years vs Hotness',
                        xaxis: {
                            title: 'Years'
                        },
                        yaxis: {
                            title: 'Hotttnesss Value'
                        }
                    }}
                />
            </Popup>
        );
    }
}

export default GraphApp;
