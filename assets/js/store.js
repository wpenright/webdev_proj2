import { createStore, combineReducers } from "redux"
import deepFreeze from "deep-freeze"

function movies(state = [], action) {
  switch (action.type) {
  case 'MOVIES_LIST':
    return [...action.movies];
  default:
    return state;
  }
}

function reviews(state = [], action) {
  switch (action.type) {
  case 'REVIEW_LIST':
    return [...action.reviews];
  default:
    return state;
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users];
  default:
    return state;
  }
}

let search_state = {
  status: "waiting",
  input: "",
  results: [],
}

function search(state = search_state, action) {
  switch (action.type) {
    case "SEARCH_UPDATE":
      console.log("update", action.data)
      return Object.assign({}, state, action.data)
    case "SEARCH_START":
      let newData = {
        status: "searching",
        results: [],
      }
      return Object.assign({}, state, newData)
    case "SEARCH_END":
      let newResults = {
        status: "have_results",
        results: [...action.data]
      }
      return Object.assign({}, state, newResults)
    default:
      return state
  }
}

function token(state = null, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return action.token
    default:
      return state
  }
}

let empty_login = {
  name: "",
  pass: "",
}

function login(state = empty_login, action) {
  switch (action.type) {
    case "UPDATE_LOGIN_FORM":
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}


let empty_user_form = {
  name: "",
  email: "",
  password: "",
}

function user_form(state = empty_user_form, action) {
  switch (action.type) {
    case 'USER_UPDATE_FORM':
      return Object.assign({}, state, action.data)
    case 'USER_CLEAR_FORM':
      return Object.assign({}, state, empty_user_form)
    case 'SET_TOKEN':
      return Object.assign({}, state, action.token)
    default:
      return state
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action)
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({login, reviews, search, token, users, user_form})
  let state1 = reducer(state0, action)
  console.log("state1", state1)
  return deepFreeze(state1)
}

let store = createStore(root_reducer)
export default store
