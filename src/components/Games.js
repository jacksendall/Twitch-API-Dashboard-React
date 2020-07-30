import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom';
import api from '../api'
import apiGetToken from '../apiGetToken'
import axios from 'axios';
import Auth from '../components/Auth'

import "bootstrap/dist/css/bootstrap.min.css";
import "shards-ui/dist/css/shards.min.css";


function Games() {
    const [games, setGames] = useState([])
    
    useEffect(() => {
        const fetchData = async () => {
            const result = await api.get('https://api.twitch.tv/helix/games/top')
            console.log(result.data.data)
            let dataArray = result.data.data
            let finalArray = dataArray.map(game => {
                let newURL = game.box_art_url
                    .replace("{width}", "300")
                    .replace("{height}", "400")
                game.box_art_url = newURL;
                return game;
            })
            setGames(finalArray);
        };
        fetchData()
    }, []);
    // ^  This empty array prevents re-rendering and spamming calls.

    return (
    <div>
        <h1>Most Popular Games Right Now</h1>
        <div className='row'>
            {games.map(game => (
            <div className='col-lg-3 col-md-6 col-sm-6'>
            <div className='card'>
            <img className='card-img-top' src={game.box_art_url} />
                <div className='card-body'>
                    <h5 className='card-title'>{game.name}</h5>
                    <button className='btn-ttv'>

                        <Link
                            className='Link'
                            to= {{
                                pathname: "game/" + game.name,
                                state: {
                                    gameID: game.id
                                }
                            }}
                        >
                            {game.name} streams{" "}
                        </Link>
                    </button>
                </div>
            </div>
            </div>
            ))}
        </div>
        

    </div>
    );
};

export default Games