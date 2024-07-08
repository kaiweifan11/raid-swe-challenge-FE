import Login from './container/Login';
import Home from './container/Home';
import AdminPage from './container/AdminPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// app hosted on heroku not working. Please use localhost setup. Already added proxy to localhost:5000
//const BASE_URL = "https://peaceful-sands-09691-a77d7aa8f6a0.herokuapp.com";
// app hosted on render 
const BASE_URL = "https://raid-swe-challenge-be.onrender.com";

const Router = () =>{
    return( 
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login BASE_URL={BASE_URL} />} />
                <Route path="/admin" element={<AdminPage BASE_URL={BASE_URL} />} /> 
                <Route path="/home" element={<Home BASE_URL={BASE_URL} />} />
                <Route path="/*" element={<Login BASE_URL={BASE_URL} />} />
            </Routes>
        </BrowserRouter>
       
    )
}

export default Router;
