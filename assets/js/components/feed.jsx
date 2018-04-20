import React from 'react';
import ReviewListItem from './review_list_item';
import api from '../api'

export default function Feed(props) {
  api.request_reviews()
  let reviews = _.map(props.reviews, (r) => <ReviewListItem key={r.id} review={r} />);
  return (
    <div>
      { reviews }
    </div>
  )
}
