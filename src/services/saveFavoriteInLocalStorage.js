function saveCity(new_city){
    const current_save = JSON.parse(new_city)
    if(JSON.parse(localStorage.getItem("favorite_cities"))!=null){
        var storedCities = JSON.parse(localStorage.getItem("favorite_cities")); 
        const isExist = storedCities.filter(item=>item.key===current_save.key)
        if(isExist.length===0){
          storedCities.push(current_save);
          localStorage.setItem("favorite_cities", JSON.stringify(storedCities));
        }
    }
    else{
      var cities = [current_save];
      localStorage.setItem("favorite_cities", JSON.stringify(cities)); //store cities
    }
    return JSON.parse(localStorage.getItem("favorite_cities"));
}

function removeCity(key_of_city_remove){
    var storedCities = JSON.parse(localStorage.getItem("favorite_cities")); 
    const isExist = storedCities.filter(item=>item.key===key_of_city_remove)
    if(isExist.length!==0){
        const new_array_of_cities = storedCities.filter(item=>item.key!==key_of_city_remove)
        localStorage.setItem("favorite_cities", JSON.stringify(new_array_of_cities))
    }
    return JSON.parse(localStorage.getItem("favorite_cities"));
}

export const saveFavoriteInLocalStorage = {
    saveCity,
    removeCity
}