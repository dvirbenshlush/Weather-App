import React, { useCallback, useEffect, useState } from "react";
import  {weatherService}  from '../services/weatherervice.js'
import DailyForecasts from "./DailyForecasts.js";
// import { addItem } from '../redux/actions';
import { useSelector,connect } from 'react-redux';
import {  saveFavoriteInLocalStorage } from "../services/saveFavoriteInLocalStorage.js";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Input from '@mui/material/Input';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CardMedia from '@mui/material/CardMedia';
import { changeType } from '../redux/actions';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
 
// import { useSelector, useDispatch } from 'react-redux';



const mapDispatchToProps = (dispatch, ownProps) => ({
    changeType: (WhetherType) => dispatch(changeType(WhetherType)),
  });
  

  let currentCity = "[]";
const GetCity=(props)=>{
    const DarkMode = useSelector(state => state)
    const dark = DarkMode.items.CelsiusOrFahrenheit
    console.log('redux result is ' + JSON.stringify(dark))
    const inputRef = React.createRef()
    const [get5DaysWeather,setGet5DaysWeather] = useState([])
    const [saveSuccess,setSaveSuccess] = useState('')
    const [isSave,setIsSave] = useState(false)
    const [WhetherType, setWhetherType] = useState(false);
    function clickHandler(e) {
      props.changeType(WhetherType);
      console.log('WhetherType ' + WhetherType)
    }
    useEffect(()=>{
        // debugger
        CityProps('tel aviv')
        Forecasts('tel aviv')
        // currentCity = saveSuccess || JSON.stringify(initial)
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
            let cartItems = 
            {
                key:MobileLink.split('?')[0].split('/')[6], //excute the key of the city
                city: MobileLink.split('?')[0].split('/')[5], //excute the name of the city,
                Temperature: Temperature,
                WeatherText:WeatherText,
                WeatherIcon:WeatherIcon
            }
            
            // cartItems = undefined
            currentCity = JSON.stringify(cartItems) || JSON.stringify(initial)
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
           console.log(ForecastsRes.DailyForecasts)

           var arr = [];
            for (var i = 0; i < ForecastsRes.DailyForecasts.length; i++) {
                arr.push({ Temperature: ForecastsRes.DailyForecasts[i].Temperature.Minimum.Value,
                     Day: ForecastsRes.DailyForecasts[i].Date,
                     Icon: ForecastsRes.DailyForecasts[i].Day.Icon,
                     IconPhrase: ForecastsRes.DailyForecasts[i].Day.IconPhrase
                     })
            }
            arr.sort(function(a,b){
                return b.Day - a.Day;
              });
              console.log('arr ' + JSON.stringify(arr))
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

//    console.log('first render ' + saveSuccess) 

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
                <input  ref={inputRef} placeholder="Enter a city..." />
                <Button
                  style={{ justifyContent: "center" }}
                  onClick={updateQuery}
                >
                  search
                </Button>
              </CardActions>
            </Card>
            {parseCurrentCity.city ? <Container>
              <Card className={"text-dan"} sx={{ maxWidth: 350, marginLeft: "30%", marginTop:"6%" }}>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="div">
                    {parseCurrentCity.city.toUpperCase()}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="190"
                    src={`assets/images/icons/${parseCurrentCity.WeatherIcon}-s.png`}
                  />
                  {/* {
                  DarkMode.items.CelsiusOrFahrenheit ? <Container>
                  <Typography variant="body2" color="text.secondary">
                    {parseCurrentCity.Temperature.Imperial.Value + parseCurrentCity.Temperature.Imperial.Unit}
                  </Typography>
                  </Container>
                  :
                  <Container>
                  <Typography variant="body2" color="text.secondary">
                    {parseCurrentCity.Temperature.Metric.Value + parseCurrentCity.Temperature.Metric.Unit}
                  </Typography>
                  </Container>
                  
                  } */}
                         <Container>
                  <Typography variant="body2" color="text.secondary">
                    {weatherService.converCtoVorVtoC(parseCurrentCity.Temperature.Metric.Value, DarkMode.items.CelsiusOrFahrenheit)}
                  </Typography>
                  </Container>
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
              </Container> : "טוען"
           }
                 <FormGroup>
          <FormControlLabel
            onClick={clickHandler}
            control={<Switch  />}
            label="Whether Type"
          />
        </FormGroup>

          </Container>
          <Container fixed sx={{ display: "flex", flexDirection: "row" ,marginTop:"5%", marginBottom:"20px", marginLeft:"10%"}}>
            {listItemsJSX}
          </Container>
        </Container>
      </div>
    );
}
export default connect(null, mapDispatchToProps)(GetCity);
