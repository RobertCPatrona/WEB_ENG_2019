import React from 'react'
import SongApp from "../SongApp";
import DeleteApp from "../DeleteApp";
import RenameApp from "../RenameApp";
import ArtistLinkApp from "../ArtistLinkApp";
import {Table} from "react-bootstrap"

/** This renders the Songs table. It shows the main song values in rows, while their corresponding fields are the column
 *  names. It also displays the Details, Rename and Delete buttons. **/

export const Songs = ({songs}) => {

    return (
        <Table striped bordered hover>
            <tbody>
            <tr>
                <th>ID</th>
                <th>Artist</th>
                <th>Genre</th>
                <th>Duration</th>
                <th>Hotttnesss</th>
                <th>Key</th>
                <th>Loudness</th>
                <th>Tempo</th>
                <th>Title</th>
                <th>Rename</th>
                <th>Year</th>
                <th>Delete</th>
            </tr>

            {songs.map(song => {
                return (
                    <tr key={song.Song.song_id}>
                        <td>
                            {song.Song.song_id}
                            <SongApp id={song.Song.song_id}/>
                        </td>
                        <td>
                            <ArtistLinkApp name={song.Song.artist_name}/>
                        </td>
                        <td>{song.Song.artist_terms}</td>
                        <td>{song.Song.song_duration}</td>
                        <td>{song.Song.song_hotttnesss}</td>
                        <td>{song.Song.song_key}</td>
                        <td>{song.Song.song_loudness}</td>
                        <td>{song.Song.song_tempo}</td>
                        <td>{song.Song.song_title}</td>
                        <td><RenameApp song_id={song.Song.song_id}/></td>
                        <td>{song.Song.song_year}</td>
                        <td><DeleteApp id={song.Song.song_id}/></td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
};
