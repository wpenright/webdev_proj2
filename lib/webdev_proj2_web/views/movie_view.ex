defmodule WebdevProj2Web.MovieView do
  use WebdevProj2Web, :view
  alias WebdevProj2Web.MovieView

  def render("index.json", %{movies: movies}) do
    %{data: render_many(movies, MovieView, "movie.json")}
  end

  def render("show.json", %{movie: movie}) do
    %{data: render_one(movie, MovieView, "movie.json")}
  end

  def render("movie.json", %{movie: movie}) do
    %{id: movie.id,
      title: movie.title,
      api_id: movie.api_id,
      runtime: movie.runtime,
      poster: movie.poster,
      summary: movie.summary}
  end
end
