import { createStore, combineReducers } from "redux"
import deepFreeze from "deep-freeze"

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
      let newData = {
        status: "have_results",
        results: [...action.data]
      }
      return Object.assign({}, state, newData)
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

function root_reducer(state0, action) {
  console.log("reducer", action)
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({login, search, token})
  let state1 = reducer(state0, action)
  console.log("state1", state1)
  return deepFreeze(state1)
}

let store = createStore(root_reducer)
export default store
