import React from 'react'
import {Table} from "react-bootstrap";

/** This renders the Artist Link popup. It shows some artist details, a list of their songs, a filter by year option,
 * and a link to the list of all artists. **/

export const ArtistLink = ({songs}) => {
    if (typeof songs[0] !== "undefined") {
        return (
            <div>
                <h4>{songs[0].Song.artist_name}</h4>
                <Table striped bordered hover>
                    <tbody>
                    <tr>
                        <th>Familiarity:</th>
                        <td>{songs[0].Song.artist_familiarity}</td>
                    </tr>
                    <tr>
                        <th>Artist Hotness:</th>
                        <td>{songs[0].Song.artist_hotttnesss}</td>
                    </tr>
                    <tr>
                        <th>Artist ID:</th>
                        <td>{songs[0].Song.artist_id}</td>
                    </tr>
                    <tr>
                        <th>Artist Terms:</th>
                        <td>{songs[0].Song.artist_terms}</td>
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
                    {songs.map((song) => <tr key={song.Song.song_id}>
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
    }
};
