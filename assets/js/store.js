import { createStore, combineReducers } from 'redux';
import deepFreeze from 'deep-freeze';

let search_state = {
  status: "waiting",
  input: "",
  results: [],
}

function search(state = search_state, action) {
  switch (action.type) {
    case 'SEARCH_UPDATE':
      return Object.assign({}, state, action.data)
    case 'SEARCH_START':
      let newData = {
        status: "searching",
        results: [],
      }
      return Object.assign({}, state, newData)
    case 'SEARCH_END':
      let newStatus = {
        status: "waiting",
      }
      newData = Object.assign({}, action.data, newStatus)
      return Object.assign({}, state, newData)
    default:
      return state
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action);
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({search});
  let state1 = reducer(state0, action);
  console.log("state1", state1);
  return deepFreeze(state1);
};

let store = createStore(root_reducer);
export default store;
