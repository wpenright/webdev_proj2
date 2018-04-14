import React from 'react'
import ReviewListItem from "./review_list_item"

export default function ReviewsList(params) {
  let reviews = params.reviews.map((r) => <ReviewListItem key={"" + r.user_id + r.movie_id} review={r} />)
  return (
    <div>
      { reviews }
    </div>
  )
}
