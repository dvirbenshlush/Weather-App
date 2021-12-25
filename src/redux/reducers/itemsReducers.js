import { ADD_ITEM, RESET_LIST, REMOVE_ITEM } from '../actions';
function manageList(state = { items: [] }, action) {
//   console.log('The action type', action.type);
  console.log('The state', state);
//   console.log(typeof state);
//   console.log(action);
  switch (action.type) {
    case ADD_ITEM:
      const oldItems = state.items || [];

      return {
        ...state,
        items: oldItems.concat(action.payload),
      };
    case RESET_LIST:
      return { ...state, items: [] };
      case REMOVE_ITEM:
        const beforeRemove = state.items || [];
        console.log('before the item that we remove '+beforeRemove)
        return {
          ...state,
          items: beforeRemove.reduce(item=>item!==action.payload),
        };

    default:
      return state;
  }
}
export default manageList;
