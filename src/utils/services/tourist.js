import axios from 'axios';

async function book_a_place(place){

    return axios.post('http://localhost:2000/airbnb-clone/places/availablity',place);
}

async function places_booked_list(token){
    return axios.post("http://localhost:2000/airbnb-clone/places/booked",{token : token})
}
export {book_a_place, places_booked_list}