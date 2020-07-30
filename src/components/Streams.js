import React, {useState, useEffect} from 'react'
import api from '../api'


function Streams() {
    const [streamData, setStreamData] = useState([])

    // https://dev.twitch.tv/docs/api/reference#get-streams

    

    useEffect(() => {
        const fetchData = async () => {

            // get data
            const result = await api.get(`https://api.twitch.tv/helix/streams`)
            let dataArray = result.data.data;
            // console.log(dataArray)
            
            // (the api doesnt return the game name only game ID) https://dev.twitch.tv/docs/api/reference/#get-games
            // call the api agian to get game name from game ID
            let gameIDs = dataArray.map(stream => {
                return stream.game_id
            });
            let baseURL = 'https://api.twitch.tv/helix/games?';
            let queryParams = '';
            gameIDs.map(id => {
                return (queryParams = queryParams + `id=${id}&`);
            });

            let finalURL = baseURL + queryParams;
            // console.log(finalURL);

            //call the api again
            let gameNames = await api.get(finalURL);
            let gameNameArray = gameNames.data.data;
            // console.log(gameNameArray)


            // add value key: gameName and loop through the game name array to check for matching ID and set the value of gameName
            let finalArray = dataArray.map(stream => {
                stream.gameName = ''
                gameNameArray.map(names => {
                    if(stream.game_id === names.id) {
                        return stream.gameName = names.name
                    }
                })

                // define image size
            
                let newURL = stream.thumbnail_url
                    .replace("{width}", "400")
                    .replace("{height}", "225")
                stream.thumbnail_url = newURL;
                return stream;
            })

            
            setStreamData(finalArray)
        }
    fetchData()
    }, []);

    return (
    <div>
        <h1>Top Live Streams</h1>
        <h2>Streams with the most active viewers.</h2>
        <div className='row'>
            {streamData.map(stream => (
            <div className='col-lg-3 col-md-6 col-sm-6'>
            <div className='card'>
            <img className='card-img-top' src={stream.thumbnail_url} />
                <div className='card-body'>
                    <h3 className='card-title'>{stream.user_name}</h3>
                    <div className='card-text'>Playing {stream.gameName}<br></br>
                    <strong>{stream.viewer_count}</strong> People watching
                    </div>
                    <button className='btn-ttv'>

                        <a
                            href={"https://twitch.tv/" + stream.user_name}
                            target="_blank"
                        >
                            watch {stream.user_name}'s stream
                        </a>
                    </button>
                </div>
            </div>
            </div>
            ))}
        </div>
    </div>
    );
}

export default Streams