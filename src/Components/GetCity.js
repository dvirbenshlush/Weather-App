import React, { useCallback, useEffect, useState } from "react";
import  {weatherService}  from '../services/weatherervice.js'
import DailyForecasts from "./DailyForecasts.js";
import { addItem } from '../redux/actions';
import { connect } from 'react-redux';
import { saveFavoriteInLocalStorage } from "../services/saveFavoriteInLocalStorage.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import img1 from '../img/Icons/1-s.png'
import CardMedia from '@mui/material/CardMedia';


const mapDispatchToProps = (dispatch, ownProps) => ({
    addToList: (item) => dispatch(addItem(item)),
  });


const GetCity=(props)=>{
    const inputRef = React.createRef()
    const [get5DaysWeather,setGet5DaysWeather] = useState([])
    const [saveSuccess,setSaveSuccess] = useState('')
    const [isSave,setIsSave] = useState(false)
    
    useEffect(()=>{
        CityProps('tel aviv')
        Forecasts('tel aviv')
    },[])

    const updateQuery = () => {
    const inputText = inputRef.current.value
    CityProps(inputText)
    Forecasts(inputText)
    }
 
 

    const CityProps= async(new_city)=>{
         try{
            const CityByKey = await  weatherService.searchCityAutoComplete(new_city).then(jsonRes=>{
                return jsonRes[0].Key
            }).then(key=>{
                const res = weatherService.searchCityByKey(key)
                return res
            })
            const {Temperature,WeatherText,WeatherIcon,MobileLink} = CityByKey[0]
            const cartItems = 
            {
                key:MobileLink.split('?')[0].split('/')[6], //excute the key of the city
                city: MobileLink.split('?')[0].split('/')[5], //excute the name of the city,
                Temperature: Temperature,
                WeatherText:WeatherText,
                WeatherIcon:WeatherIcon
            }
            setSaveSuccess(JSON.stringify(cartItems))
            return CityByKey
            }
         catch(err)
         {
            console.log(err)
         }
         
    }

    const Forecasts = async(new_city)=>{
        try{
           const ForecastsRes = await  weatherService.searchCityAutoComplete(new_city).then(jsonRes=>{
               return jsonRes[0].Key
           }).then(key=>{
               const res = weatherService.Forecasts(key)
               return res
           })

           var arr = [];
            for (var i = 0; i < ForecastsRes.DailyForecasts.length; i++) {
                arr.push({ Temperature: ForecastsRes.DailyForecasts[i].Temperature.Minimum.Value, Day: ForecastsRes.DailyForecasts[i].Date })
            }
            arr.sort(function(a,b){
                return b.Day - a.Day;
              });
        setGet5DaysWeather(arr)
           return ForecastsRes.DailyForecasts
           }
        catch(err)
        {
           console.log(err)
        }
   }
   
   const saveCity=()=>{
    console.log('json before save2 '+JSON.stringify(saveSuccess))
        console.log(saveSuccess)
        props.addToList(saveSuccess);
        saveFavoriteInLocalStorage.saveCity(saveSuccess)
        setIsSave(!isSave)
   }

   const removeCity=()=>{
        const city_to_remove = JSON.parse(saveSuccess)
        saveFavoriteInLocalStorage.removeCity(city_to_remove.key)
        setIsSave(!isSave)
   }

   const listItemsJSX = get5DaysWeather.map((infoForEachDay, key) => (
    <DailyForecasts style={{display:"inline"}} daily={infoForEachDay} key={key} >,</DailyForecasts>));

   const initial = {
        key:212476,
        city: "rishon leZiyyon",
        Temperature: {
            Imperial:{Unit: "F",UnitType: 18,Value: 52},
            Metric:{Unit: "C",UnitType: 17,Value: 11}
        },
        WeatherText:"Mostly cloudy",
        WeatherIcon:"7"
    };
   console.log('first render ' + saveSuccess) 
   const currentCity = saveSuccess || JSON.stringify(initial)
   const parseCurrentCity = JSON.parse(currentCity)
    return (
      <div>
        <Container
          fixed
          sx={{
            borderRadius: "50px 20px",
            border: "2px solid #d2c8c8",
            justifyContent: "center",
          }}
        >
          <Container
            fixed
            sx={{
              borderRadius: "50px 20px",
            //   border: "2px solid #d2c8c8",
              justifyContent: "center",
              marginTop:"3%"
            }}
          >
            <Card
              sx={{
                borderRadius: "50px 40px",
                // border: "2px solid #d2c8c8",
                // marginTop: "10%",
                // marginBottom: "10%",
                alignItems: "center",
              }}
            >
              <CardActions sx={{  marginLeft: "40%" }}>
                <Input  ref={inputRef} placeholder="Enter a city..." />
                <Button
                  style={{ justifyContent: "center" }}
                  onClick={updateQuery}
                >
                  search
                </Button>
              </CardActions>
            </Card>
              <Card sx={{ maxWidth: 350, marginLeft: "30%", marginTop:"6%" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {parseCurrentCity.city.toUpperCase()}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="190"
                    src={img1}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {parseCurrentCity.Temperature.Metric.Value + "C"}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {parseCurrentCity.WeatherText}
                  </Typography>
                </CardContent>
              </Card>
      
            <CardActions sx={{ maxWidth: 350, marginLeft: "90%" }}>
                {isSave ? (
                  <Button
                    style={{ marginLeft: "23%" }}
                    endIcon={<FavoriteIcon />}
                    onClick={removeCity}
                  />
                ) : (
                  <Button
                    style={{ marginLeft: "23%" }}
                    endIcon={<FavoriteBorderIcon />}
                    onClick={saveCity}
                  />
                )}
              </CardActions>
          </Container>
          <Container fixed sx={{ display: "flex", flexDirection: "row" ,marginTop:"5%", marginBottom:"20px", marginLeft:"10%"}}>
            {listItemsJSX}
          </Container>
        </Container>
      </div>
    );
}
export default connect(null, mapDispatchToProps)(GetCity);
