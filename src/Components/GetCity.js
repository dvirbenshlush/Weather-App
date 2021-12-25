import React, { useState } from "react";
import  {weatherService}  from '../services/weatherervice.js'
import DailyForecasts from "./DailyForecasts.js";
import { addItem } from '../redux/actions';
import { connect } from 'react-redux';
import { saveFavoriteInLocalStorage } from "../services/saveFavoriteInLocalStorage.js";

const mapDispatchToProps = (dispatch, ownProps) => ({
    addToList: (item) => dispatch(addItem(item)),
  });


const GetCity=(props)=>{
    // console.log('props ' + JSON.stringify(props))
    const inputRef = React.createRef()
    const [get5DaysWeather,setGet5DaysWeather] = useState([])
    const [saveSuccess,setSaveSuccess] = useState('')
    
    const updateQuery = () => {
    const inputText = inputRef.current.value
    CityProps(inputText)
    Forecasts(inputText)
    }
 
 

    const CityProps= async(new_city)=>{
         try{
            const CityByKey = await  weatherService.searchCityAutoComplete(new_city).then(jsonRes=>{
                // console.log(jsonRes[0])
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
            console.log('json before save '+JSON.stringify(cartItems))
            setSaveSuccess(JSON.stringify(cartItems))
            // console.log(CityByKey)
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
            //    console.log(jsonRes[0].Key)
               return jsonRes[0].Key
           }).then(key=>{
               const res = weatherService.Forecasts(key)
               return res
           })

           var arr = [];
            for (var i = 0; i < ForecastsRes.DailyForecasts.length; i++) {
                // console.log('the day is '+ForecastsRes.DailyForecasts[i].Day)
                arr.push({ Temperature: ForecastsRes.DailyForecasts[i].Temperature.Minimum.Value, Day: ForecastsRes.DailyForecasts[i].Date })
            }
            arr.sort(function(a,b){
                // Turn your strings into dates, and then subtract them
                // to get a value that is either negative, positive, or zero.
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
        props.addToList(saveSuccess);
        saveFavoriteInLocalStorage.saveCity(saveSuccess)
   }

   const removeCity=()=>{
        const city_to_remove = JSON.parse(saveSuccess)
        saveFavoriteInLocalStorage.removeCity(city_to_remove.key)
   }

    return(
        <div>
       <input ref={inputRef}/>
       <button  onClick={saveCity}>add to favorite</button>
       <button  onClick={removeCity}>remove from favorite</button>
      <button onClick={updateQuery}>search</button>
      {get5DaysWeather.map((infoForEachDay, key) => <DailyForecasts daily={infoForEachDay} key={key} />)}
    
        </div>
    )
}
export default connect(null, mapDispatchToProps)(GetCity);
