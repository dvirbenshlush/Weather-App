import { combineReducers } from 'redux';
import items from './itemsReducers';
import isDark from './itemsReducers';
import CelsiusOrFahrenheit from './itemsReducers';
export default combineReducers({
  items,isDark,CelsiusOrFahrenheit
});
