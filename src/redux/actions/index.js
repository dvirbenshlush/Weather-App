export const ADD_ITEM = 'ADD_ITEM';

export const RESET_LIST = 'RESET_LIST';

export const REMOVE_ITEM = 'REMOVE_ITEM';

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
