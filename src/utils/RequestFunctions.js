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

export {signUp, logIn}