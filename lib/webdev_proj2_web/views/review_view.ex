defmodule WebdevProj2Web.ReviewView do
  use WebdevProj2Web, :view
  alias WebdevProj2Web.ReviewView
  alias WebdevProj2Web.UserView
  alias WebdevProj2Web.MovieView

  def render("index.json", %{reviews: reviews}) do
    %{data: render_many(reviews, ReviewView, "review.json")}
  end

  def render("show.json", %{review: review}) do
    %{data: render_one(review, ReviewView, "review.json")}
  end

  def render("review.json", %{review: review}) do
    %{id: review.id,
      rating: review.rating,
      user_review: review.user_review,
      user: render_one(review.user, UserView, "user.json"),
      movie: render_one(review.movie, MovieView, "movie.json")}
  end
end
