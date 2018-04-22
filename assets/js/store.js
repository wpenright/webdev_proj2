import { createStore, combineReducers } from "redux"
import deepFreeze from "deep-freeze"

function movies(state = [], action) {
  switch (action.type) {
  case 'MOVIES_LIST':
    return [...action.movies]
  case 'MOVIES_ADD':
    return [action.movie, ...state]
  default:
    return state
  }
}

function feed(state = [], action) {
  switch (action.type) {
    case 'FEED_LIST':
      return [...action.reviews]
    case 'CLEAR_TOKEN':
      return []
    default:
      return state
  }
}

function reviews(state = [], action) {
  switch (action.type) {
  case 'REVIEW_LIST':
    return [...action.reviews]
  case 'REVIEW_ADD':
    return [action.review, ...state]
  default:
    return state
  }
}

function follows(state = [], action) {
  switch (action.type) {
  case 'FOLLOW_LIST':
    return [...action.follows]
  case 'FOLLOW_ADD':
    return [action.follow.data, ...state]
  case 'FOLLOW_DELETE':
    return state.filter((f) => f.id != action.follow_id)
  default:
    return state
  }
}

function users(state = [], action) {
  switch (action.type) {
  case 'USERS_LIST':
    return [...action.users]
  default:
    return state
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
      return Object.assign({}, state, action.data)
    case "SEARCH_START":
      let newData = {
        status: "searching",
        results: [],
      }
      return Object.assign({}, state, newData)
    case "SEARCH_ERROR":
      let newResultError = {
        status: "have_results",
        results: []
      }
      return Object.assign({}, state, newResultError)
    case "SEARCH_SUCCESS":
      let newResultSuccess = {
        status: "have_results",
        results: [...action.data]
      }
      return Object.assign({}, state, newResultSuccess)
    default:
      return state
  }
}

let empty_token = {
  token: null,
  user_id: -1,
  user_name: "",
}

function token(state = empty_token, action) {
  switch (action.type) {
    case "SET_TOKEN":
      return {
        token: action.data.token,
        user_id: action.data.user_id,
        user_name: action.data.user_name,
      }
    case 'CLEAR_TOKEN':
      return empty_token;
    default:
      return state
  }
}

let empty_login = {
  email: "",
  password: "",
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
    default:
      return state
  }
}

let empty_review_form = {
  rating: "",
  user_review: "",
}

function review_form(state = empty_review_form, action) {
  switch (action.type) {
    case 'REVIEW_UPDATE_FORM':
      return Object.assign({}, state, action.data)
    case 'SET_TOKEN':
      return Object.assign({}, state, action.data)
    default:
      return state
  }
}

function messages(state = [], action) {
  switch (action.type) {
    case 'SET_MESSAGES':
      return [...action.data]
    case 'NEW_MESSAGE':
      return [...state, ...action.data]
    default:
      return state
  }
}

function root_reducer(state0, action) {
  console.log("reducer", action)
  // {posts, users, form} is ES6 shorthand for
  // {posts: posts, users: users, form: form}
  let reducer = combineReducers({login, feed, movies, review_form, reviews, 
      search, token, users, user_form, follows, messages})
  let state1 = reducer(state0, action)
  console.log("state1", state1)
  return deepFreeze(state1)
}

let store = createStore(root_reducer)
export default store
