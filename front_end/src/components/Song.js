import React from 'react'
import {Table} from "react-bootstrap"

/** This renders the Song details popup. It shows the a list of all the details about that song. **/

export const Song = ({song}) => {

    return (
        <div>
            <h4>Details:</h4>

            <Table striped bordered hover>
                <tbody>
                <tr>
                    <th>song_artist_mbtags:</th>
                    <td>{song.song.song_artist_mbtags} </td>
                </tr>
                <tr>
                    <th>song_artist_mbtags_count:</th>
                    <td>{song.song.song_artist_mbtags_count} </td>
                </tr>
                <tr>
                    <th>song_bars_confidence:</th>
                    <td>{song.song.song_bars_confidence} </td>
                </tr>
                <tr>
                    <th>song_bars_start:</th>
                    <td>{song.song.song_bars_start} </td>
                </tr>
                <tr>
                    <th>song_beats_confidence:</th>
                    <td>{song.song.song_beats_confidence} </td>
                </tr>
                <tr>
                    <th>song_beats_start:</th>
                    <td>{song.song.song_beats_start} </td>
                </tr>
                <tr>
                    <th>song_duration:</th>
                    <td>{song.song.song_duration} </td>
                </tr>
                <tr>
                    <th>song_end_of_fade_in:</th>
                    <td>{song.song.song_end_of_fade_in} </td>
                </tr>
                <tr>
                    <th>song_hotttnesss:</th>
                    <td>{song.song.song_hotttnesss} </td>
                </tr>
                <tr>
                    <th>song_id:</th>
                    <td>{song.song.song_id} </td>
                </tr>
                <tr>
                    <th>song_key:</th>
                    <td>{song.song.song_key} </td>
                </tr>
                <tr>
                    <th>song_key_confidence:</th>
                    <td>{song.song.song_key_confidence} </td>
                </tr>
                <tr>
                    <th>song_loudness:</th>
                    <td>{song.song.song_loudness} </td>
                </tr>
                <tr>
                    <th>song_mode:</th>
                    <td>{song.song.song_mode} </td>
                </tr>
                <tr>
                    <th>song_mode_confidence:</th>
                    <td>{song.song.song_mode_confidence} </td>
                </tr>
                <tr>
                    <th>song_start_of_fade_out:</th>
                    <td>{song.song.song_start_of_fade_out} </td>
                </tr>
                <tr>
                    <th>song_tatums_confidence:</th>
                    <td>{song.song.song_tatums_confidence} </td>
                </tr>
                <tr>
                    <th>song_tatums_start:</th>
                    <td>{song.song.song_tatums_start} </td>
                </tr>
                <tr>
                    <th>song_tempo:</th>
                    <td>{song.song.song_tempo} </td>
                </tr>
                <tr>
                    <th>song_time_signature:</th>
                    <td>{song.song.song_time_signature} </td>
                </tr>
                <tr>
                    <th>song_time_signature_confidence:</th>
                    <td>{song.song.song_time_signature_confidence} </td>
                </tr>
                <tr>
                    <th>song_title:</th>
                    <td>{song.song.song_title} </td>
                </tr>
                <tr>
                    <th>song_year:</th>
                    <td>{song.song.song_year} </td>
                </tr>

                </tbody>
            </Table>
        </div>
    );
};

