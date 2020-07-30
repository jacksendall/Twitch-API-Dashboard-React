import React, {useState, useEffect} from 'react'
import api from '../api'


function GameStreams({match, location}) {
    const [streamData, setStreamData] = useState([])
    const [viewers, setViewers] = useState(0)

    // https://dev.twitch.tv/docs/api/reference#get-streams

    useEffect(() => {
        const fetchData = async () => {

            // get data
            const result = await api.get(`https://api.twitch.tv/helix/streams?game_id=` + location.state.gameID)
            let dataArray = result.data.data;
            // console.log(dataArray)

            // define image size
            let finalArray = dataArray.map(stream => {
                let newURL = stream.thumbnail_url
                    .replace("{width}", "400")
                    .replace("{height}", "225")
                stream.thumbnail_url = newURL;
                return stream;
            })
            // console.log(finalArray);
            // // get total viewers - sum the viewer count of each stream
            let totalViewers = finalArray.reduce((acc, val) => {
                return acc + val.viewer_count;
            }, 0);

            setViewers(totalViewers)
            setStreamData(finalArray)
        }
    fetchData()
    }, []);

    return (
    <div>
        <h1>{match.params.id} streams</h1>
        <h2><strong>{viewers}</strong> are currently watching.</h2>
        <div className='row'>
            {streamData.map(stream => (
            <div className='col-lg-3 col-md-6 col-sm-6'>
            <div className='card'>
            <img className='card-img-top' src={stream.thumbnail_url} />
                <div className='card-body'>
                    <h5 className='card-title'>{stream.user_name}</h5>
                    <div className='card-text'><strong>{stream.viewer_count}</strong> People watching</div>
                    <button className='btn-ttv'>

                        <a
                            href={"https://twitch.tv/" + stream.user_name}
                            target="_blank"
                        >
                            Watch {stream.user_name}
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

export default GameStreams