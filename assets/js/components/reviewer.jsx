import React from "react"
import ReactDOM from "react-dom"
import { connect, Provider } from "react-redux"
import { BrowserRouter as Router, Route } from "react-router-dom"

import Feed from "./feed"
import ReviewListItem from "./review_list_item"
import ReviewPage from "./review_page"
import Search from "./search"

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
          <Users users={props.users} />
        } />
        <Route path="/users/:user_id" render={({match}) =>
          <Feed reviews={_.filter(props.reviews, (r) =>
            match.params.user_id == r.user.id )
          } />
        } />
        <Route path="/reviews" exact={true} render={() =>
          <Reviews reviews={props.reviews} />
        } />
        <Route path="/reviews/:review_id" render={({match}) =>
          <ReviewPage review={_.filter(props.reviews, (r) =>
            match.params.review_id == r.id )
          } />
        } />
      </div>
    </Router>
  )
})
