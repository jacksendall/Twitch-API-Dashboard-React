import axios from 'axios'

    let apiGetToken = axios.create({
        params: {
            client_id : 'bfd7py8d3uar4bp41q32bogxkso6qe',
            client_secret : 'kb0hy9xp0pa6ibfv4pjzu04beue9tr',
            grant_type : 'client_credentials'
        }
    })
    
export default apiGetToken
