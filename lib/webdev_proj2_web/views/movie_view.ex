defmodule WebdevProj2Web.MovieView do
  use WebdevProj2Web, :view
  alias WebdevProj2Web.MovieView
  alias WebdevProj2Web.ReviewView

  def render("index.json", %{movies: movies}) do
    %{data: render_many(movies, MovieView, "movie.json")}
  end

  def render("show.json", %{movie: movie}) do
    %{data: render_one(movie, MovieView, "movie.json")}
  end

  def render("movie.json", %{movie: movie}) do
    reviews = if Ecto.assoc_loaded?(movie.reviews), do: movie.reviews, else: []
    %{id: movie.id,
      title: movie.title,
      api_id: movie.api_id,
      runtime: movie.runtime,
      poster: movie.poster,
      summary: movie.summary,
      reviews: render_many(reviews, ReviewView, "review.json")}
  end
end
