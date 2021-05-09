import axios from 'axios';

async function signUp(arr){
    const user = {
        first_name : arr[0].value,
        last_name : arr[1].value,
        email  : arr[2].value,
        role : arr[3].value,
        password : arr[4].value
    }
    const response = await axios.post('http://localhost:2000/airbnb-clone/register', user);
    return response;
}

async function logIn(arr){
    const user = {
        email  : arr[2].value,
        password : arr[4].value
    }
    const response = await axios.post('http://localhost:2000/airbnb-clone/login',user);
    return response;
}

async function getLastPlaces(){
    try{
        const response = await axios.get('http://localhost:2000/airbnb-clone/places/last');
        return response.data.data;
    }
    catch(err){
        console.log(err);
    }
}

async function getInfo(id){
    try{
        const response = await axios.get(`http://localhost:2000/airbnb-clone/place-info/${id}`);
        return response.data.data;
    }
    catch(err){
        console.log(err)
    }
}

async function searchByCity(city_name){
    const response = await axios.post('http://localhost:2000/airbnb-clone/search-by-city',{city_name});
    return response;
}

export {signUp, logIn, getLastPlaces, getInfo, searchByCity};

