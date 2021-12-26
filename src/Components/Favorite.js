import React,{useState, useEffect} from "react";
import FavoriteCity from "./FavoriteCity";
import { saveFavoriteInLocalStorage } from "../services/saveFavoriteInLocalStorage.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import img1 from '../img/Icons/1-s.png'
// import img2 from '../../public/Icons/1-s.png'

const Favorite = ()=>{
    useEffect(()=>{},[localStorage.getItem('favorite_cities')])
    const [isRemove,setIsRemove] = useState(false)
    const arrayOfFavoriteCities = JSON.parse(localStorage.getItem('favorite_cities'))
    console.log(arrayOfFavoriteCities)
    console.log(require('../img/Icons/1-s.png'))
    const ListOfCities = arrayOfFavoriteCities.map((city,key)=> 
    //<FavoriteCity cities={city} key={key}/>)
    {
        const removeCity=()=>{
            saveFavoriteInLocalStorage.removeCity(city.key)
            setIsRemove(!isRemove)
        }
        return (
          <div key={key}>
            <Container fixed sx={{ display: "flex", justifyContent: "center" }}>
              <Card sx={{ maxWidth: 350 }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {city.city.toUpperCase()}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="124"
                    src={img1}
                    alt={city.WeatherText}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {city.Temperature.Metric.Value + "C"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {city.WeatherText}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button onClick={removeCity}>remove from favorite</Button>
                </CardActions>
              </Card>
            </Container>
          </div>
        );
    })


    return(
        <div>
                    <Container fixed sx={{ display: "flex", flexDirection: "row" }}>
            {
                ListOfCities
            }
        </Container>
        </div>
    )
}

export default Favorite;