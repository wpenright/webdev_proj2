import React from 'react';
import ReviewListItem from './review_list_item';

export default function Feed(props) {
  let reviews = _.map(props.reviews, (r) => <ReviewListItem key={r.id} review={r} />);
  return (
    <div>
      { reviews }
    </div>
  )
}