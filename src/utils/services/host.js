import axios from 'axios';

async function add_a_place(place){
   
    const token = JSON.parse(localStorage.getItem('auth')).token;
    const reqConfig = {
        token : token,
        city_name : place.city_name, 
        name : place.name, 
        max_guests : Number(place.max_guests), 
        rooms : Number(place.rooms), 
        bathrooms : Number(place.bathrooms), 
        price_by_night : Number(place.price_by_night), 
        description : place.description, 
        available : place.available
    }

    try{
        const response = await axios.post('http://localhost:2000/airbnb-clone/places/add',reqConfig);
        return response;
    }
    catch(err){
        console.log(err)
    }
}

async function edit(arr, place_id){

    const token = JSON.parse(localStorage.getItem('auth')).token;
    const config = {
        token : token,
        data : arr
    }
    return axios.patch(`http://localhost:2000/airbnb/places/edit/${place_id}`, config);
}

export {add_a_place, edit};