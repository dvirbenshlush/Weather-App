export const ADD_ITEM = 'ADD_ITEM';

export const RESET_LIST = 'RESET_LIST';

export const REMOVE_ITEM = 'REMOVE_ITEM';

export const CHANGE_MODE = 'CHANGE_MODE';

export const CHANGE_TYPE = 'CHANGE_TYPE';

/*
 * action creators
 */
export function addItem(text) {
  console.log('This is the text', text);
  return { type: ADD_ITEM, payload: text };
}

export function removeItem(text) {
  return { type: REMOVE_ITEM, payload: text };
}

export function resetList() {
  return { type: RESET_LIST };
}

export const changeMode = (isDark)=>{
    return { type: CHANGE_MODE, payload: isDark };
}

export const changeType = (CelsiusOrFahrenheit)=>{
  return { type: CHANGE_TYPE, payload: CelsiusOrFahrenheit };
}