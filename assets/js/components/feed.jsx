import React from 'react';
import ReviewListItem from './review_list_item';
import api from '../api'
import store from "../store";

export default class Feed extends React.Component {

  constructor(props){
    super(props);
    this.state = {feed: props.reviews}
  }

  render() {
    let feed = _.map(this.state.feed, (r) => <ReviewListItem key={r.id} review={r} />);
    return(
      <div>
        { feed }
      </div>
    );
  }

  // Pull latest state from the server if the user re-clicks the tab
  componentDidUpdate(prevProps, prevState) {
    api.request_feed();
    var oldf = JSON.stringify(this.state.feed);
    var newf = JSON.stringify(store.getState().feed);

    // Only update the state if it is different
    if (newf != oldf) {
      this.setState({feed: store.getState().feed});
    }
  }

  // Make sure we pull the latest state when the feed is first mounted
  // (Guaranteed to cause update)
  componentDidMount() {
    api.request_feed();
    this.setState({feed: store.getState().feed});
  }
}
