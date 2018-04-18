import React from "react"
import ReactDOM from "react-dom"
import { connect, Provider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Feed from "./feed"
import Nav from "./nav"
import ReviewList from "./review_list"
import ReviewListItem from "./review_list_item"
import MoviePage from "./movie_page"
import Search from "./search"
import Users from "./users"
import UserForm from './user-form'

export default function reviewer_init(store) {
  ReactDOM.render(
    <Provider store={store}>
      <Reviewer state={store.getState()} />
    </Provider>,
    document.getElementById("root"),
  )
}

let Reviewer = connect((state) => state)((props) => {
  return (
    <Router>
      <div>
        <Nav />
        <Route path="/" exact={true} render={() =>
          <div>
            <Feed reviews={props.reviews} />
          </div>
        } />
        <Route path="/search" exact={true} render={() =>
          <Search />
        } />
        <Route path="/users" exact={true} render={() =>
          <Users users={props.users} current_user={props.token}/>
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed reviews={_.filter(props.reviews, (r) =>
            match.params.user_id == r.user.id )
          } />
        } />
        <Route path="/reviews" exact={true} render={() =>
          <ReviewList reviews={props.reviews} movieLinks={true}/>
        } />
        <Route path="/movies/:movie_id" render={({match}) =>
          <MoviePage id={match.params.movie_id} movie={_.filter(props.movies, (m) =>
            match.params.movie_id == m.api_id )[0]
          } reviews={_.filter(props.reviews, (r) =>
            match.params.movie_id == r.movie.id )
          }/>
        } />
      <Route path="/register" exact={true} render={() =>
          <UserForm />
        } />
      </div>
    </Router>
  )
})
