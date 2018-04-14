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
    user = if Ecto.assoc_loaded?(review.user), do: review.user, else: nil
    movie = if Ecto.assoc_loaded?(review.movie), do: review.movie, else: nil
    %{id: review.id,
      rating: review.rating,
      user_review: review.user_review,
      user: render_one(user, UserView, "user.json"),
      movie: render_one(movie, MovieView, "movie.json")}
  end
end
