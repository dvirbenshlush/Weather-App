import reducer from './reducer';
import { createStore } from 'redux';
import { loadState } from './localStorage';

const cartItems = [
{
	key:212476,
	city: "Rishon LeZiyyon23",
	Temperature: {
		Imperial:{Unit: "F",UnitType: 18,Value: 52},
		Metric:{Unit: "C",UnitType: 17,Value: 11}
	},
	WeatherText:"Mostly cloudy",
	WeatherIcon:"7"
}
];

const persistedState = loadState();

// const initialStore = {
// cart: cartItems,
// amount: 0,
// total: 0,
// persistedState
// }

export const store = createStore(reducer, persistedState);
