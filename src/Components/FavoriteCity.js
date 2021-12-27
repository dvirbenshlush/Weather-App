import React, { useEffect, useState } from "react";
import { saveFavoriteInLocalStorage } from "../services/saveFavoriteInLocalStorage.js";
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
// import FavoriteIcon from '@mui/icons-material';

const FavoriteCity = (props) => {
    console.log(props.cities)
    const testArray=(props.cities)
    const removeCity=()=>{
        saveFavoriteInLocalStorage.removeCity(testArray.key)
    }
    return (
      <div>
        <Container fixed sx={{ display: "flex", justifyContent: "center" }}>
          <Card sx={{ maxWidth: 350 }}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {testArray.city.toUpperCase()}
              </Typography>
              <CardMedia
                component="img"
                height="194"
                src={`assets/images/icons/${testArray.WeatherIcon}-s.png`}
                alt="Paella dish"
              />
              <Typography variant="body2" color="text.secondary">
                {testArray.Temperature.Metric.Value + "C"}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {testArray.WeatherText}
              </Typography>
            </CardContent>
            <CardActions>
              <Button onClick={removeCity}>remove from favorite</Button>
            </CardActions>
          </Card>
        </Container>
      </div>
    );
}

export default FavoriteCity;
