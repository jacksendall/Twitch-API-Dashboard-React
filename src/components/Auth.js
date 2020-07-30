import React, {useState, useEffect} from 'react'
import axios from 'axios';


function Auth() {


    const [access_token, setAuth] = useState([])
    const [timeout, setTimeout] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            await axios.post('https://id.twitch.tv/oauth2/token?client_id=bfd7py8d3uar4bp41q32bogxkso6qe&client_secret=kb0hy9xp0pa6ibfv4pjzu04beue9tr&grant_type=client_credentials')
            .then((res) => {
                let authData = res.data

                setAuth(authData.access_token)
                setTimeout(authData.expires_in)

                const cookie = {
                    value: authData.access_token,
                    // expiry: authData.expires_in
                }
                localStorage.setItem("oauth-ttv", authData.access_token)
            })
        }
        fetchData()     
    }, []);
    
        
    return (
        <code>OAuth Token: {access_token}</code>
        
    );
};





export default Auth