import React from 'react'
import {Table} from 'react-bootstrap'
import ArtistApp from "../ArtistApp";
import GraphApp from "../GraphApp";
import AddSongApp from "../AddSongApp";

/** This renders the Artists table. It shows the artist values in rows, while the fields are the column names. It also
 * displays the Stats, Graph and Add Song buttons. **/

export const Artists = ({artists}) => {
    return (
        <Table striped bordered hover>
            <thead>
            <tr>
                <th>ID</th>
                <th>Familiarity</th>
                <th>Hotttnessss</th>
                <th>Latitude</th>
                <th>Location</th>
                <th>Longitude</th>
                <th>Name</th>
                <th>Similar</th>
                <th>Terms</th>
                <th>Terms Freq</th>
                <th>Add a song</th>
            </tr>
            </thead>
            <tbody>
            {artists.map((artist, indx) => {
                return (
                    <tr key={indx}>
                        <td>{artist.Artist.artist_id}</td>
                        <td>{artist.Artist.artist_familiarity}</td>
                        <td>{artist.Artist.artist_hotttnesss}</td>
                        <td>{artist.Artist.artist_latitude}</td>
                        <td>{artist.Artist.artist_location}</td>
                        <td>{artist.Artist.artist_longitude}</td>
                        <td style={{width:200}}> {artist.Artist.artist_name}
                            <ArtistApp name={artist.Artist.artist_name}/>
                            <GraphApp name={artist.Artist.artist_name}/>
                        </td>
                        <td>{artist.Artist.artist_similar}</td>
                        <td>{artist.Artist.artist_terms}</td>
                        <td>{artist.Artist.artist_terms_freq}</td>
                        <td><AddSongApp artist={artist.Artist}/></td>
                    </tr>
                )
            })}
            </tbody>
        </Table>
    );
};