import React from 'react'
import {Table} from "react-bootstrap";

/** This renders the Artist popup. It shows the artist statistics, a list of their songs and a filter by year option. **/

export const Artist = ({artist}) => {
    return (
        <div>
            <h4>Hotttnesss Scores </h4>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th>Mean:</th>
                    <td>{artist.stat_mean} </td>
                </tr>
                <tr>
                    <th>Median:</th>
                    <td>{artist.stat_median}</td>
                </tr>
                <tr>
                    <th>St dev:</th>
                    <td>{artist.stat_st_dev}</td>
                </tr>
                </tbody>

            </Table>
            <hr/>
            <h4>Songs by artist</h4>
            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Year</th>
                    <th>Hotttnesss</th>
                    <th>Key_confidence</th>
                </tr>
                {artist.artist_songs.map((song) => <tr key={song.Song.song_id}>
                    <td>{song.Song.song_id}</td>
                    <td>{song.Song.song_title}</td>
                    <td>{song.Song.song_year}</td>
                    <td>{song.Song.song_hotttnesss}</td>
                    <td>{song.Song.song_key_confidence}</td>
                </tr>)}
                </tbody>
            </Table>
        </div>
    );
};
