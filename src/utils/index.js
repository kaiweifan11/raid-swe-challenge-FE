
import BananaImg from '../images/banana.png';
import ApplesImg from '../images/apples.png';
import OrangesImg from '../images/oranges.png';

export const ADMIN = 'admin';

export const formatPrice = (price) =>{
    return (Math.round(price * 100) / 100).toFixed(2) ;
}

export const priceStyle = {
    fontFamily: "Lato, sans-serif",
    fontSize: "16px",
    fontWeight: 700,
}

export const logout = (axios, BASE_URL, navigate) =>{
    axios
        .get(BASE_URL + "/api/logout")
        .then((response) => {
            if(response.data.success){
                navigate('/')
            }
        })
        .catch(() => {
            alert("Error while logging out!");
        });
}

export const getFruitImage = (name) =>{
    switch(name){
        case 'Banana':
            return BananaImg;
        case 'Apple':
            return ApplesImg;
        case 'Orange':
            return OrangesImg;
        default: 
            return null;
    }
}