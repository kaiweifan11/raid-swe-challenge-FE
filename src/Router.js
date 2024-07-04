import Login from './container/Login';
import Home from './container/Home';
import AdminPage from './container/AdminPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const BASE_URL = "https://peaceful-sands-09691-a77d7aa8f6a0.herokuapp.com";

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