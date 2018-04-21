import React from 'react'
import ReviewListItem from "./review_list_item"
import api from '../api'
import store from "../store";

export default class ReviewList extends React.Component {

  constructor(props){
    super(props);
    this.state = {reviews: props.reviews, movieLinks: props.movieLinks};
  }

  render() {
    let reviews = this.state.reviews.map((r) =>
      <ReviewListItem key={r.id} review={r} movieLink={this.state.movieLinks}/>
    );
    return(
      <div>
        { reviews }
      </div>
    );
  }

  // Pull latest state from the server if the user re-clicks the tab
  componentDidUpdate(prevProps, prevState) {
    api.request_reviews();
    var olds = JSON.stringify(this.state.reviews);
    var news = JSON.stringify(store.getState().reviews);

    // Only update the state if it is different
    if (news != olds) {
      this.setState({reviews: store.getState().reviews});
    }
  }

  // Make sure we pull the latest state when the feed is first mounted
  // (Guaranteed to cause update)
  componentDidMount() {
    api.request_reviews();
    this.setState({reviews: store.getState().reviews});
  }
}
