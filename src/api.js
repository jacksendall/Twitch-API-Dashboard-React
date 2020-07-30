import axios from 'axios'
    // get cookie
    let key = localStorage.getItem("oauth-ttv");
    // add parameters
    let api = axios.create({
        headers: {
            'Client-ID' : 'bfd7py8d3uar4bp41q32bogxkso6qe',
            'Authorization' : 'Bearer ' + key
        }
    })
    


export default api
