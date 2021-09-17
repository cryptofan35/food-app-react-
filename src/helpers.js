const API = 'http://localhost:4000';


// a helper function to fetch data from your API


export async function fetchFromAPI(endpointURL, opts){
    const {method, body} = {method: 'POST', body: null, ...opts};

    const res = await fetch(`${API}/${endpointURL}`,{
        method,
        body: JSON.stringify(body),
        headers:{
            'Content-Type': 'application/json',
        }
    });
    return res.json()
}