
import React from "react";
// import FavoriteIcon from '@mui/icons-material';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from "@mui/material/Container";

const DailyForecasts = (props) => {
    // console.log(props)

    const day = new Date(props.daily.Day)
    const dayInWord =  executeDayByDate(day.getDay())
    return (
        <div className={'DailyForecasts-container'}>
             <Container fixed sx={{ display: 'flex',justifyContent: 'center'}}>
          <Card sx={{ maxWidth: 350}}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {dayInWord}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.daily.Temperature + " C"}
              </Typography>
            </CardContent>
            <CardActions>
            </CardActions>
          </Card>
        </Container>
        </div>
    )
}


function executeDayByDate(dayInNumber){
    switch (dayInNumber) {
      case 0:
        return "Sunday";
        break;
      case 1:
        return "Monday";
        break;
      case 2:
        return "Tuesday";
        break;
      case 3:
        return "Wednesday";
        break;
      case 4:
        return "Thursday";
        break;
      case 5:
        return "Friday";
        break;
      default:
        return "Saturday";
    }
    }

export default DailyForecasts; 
