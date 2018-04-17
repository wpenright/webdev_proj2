import React from 'react'
import ReviewListItem from "./review_list_item"

export default function ReviewList(params) {
  let reviews = params.reviews.map((r) => <ReviewListItem key={r.id} review={r} movieLink={params.movieLink}/>)
  return (
    <div>
      { reviews }
    </div>
  )
}
