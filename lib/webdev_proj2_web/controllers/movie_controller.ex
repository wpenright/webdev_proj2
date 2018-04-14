defmodule WebdevProj2Web.MovieController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Reviews
  alias WebdevProj2.Reviews.Movie

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, _params) do
    movies = Reviews.list_movies()
    render(conn, "index.json", movies: movies)
  end

  def create(conn, %{"movie" => movie_params}) do
    with {:ok, %Movie{} = movie} <- Reviews.create_movie(movie_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", movie_path(conn, :show, movie))
      |> render("show.json", movie: movie)
    end
  end

  def show(conn, %{"id" => id}) do
    movie = Reviews.get_movie_preloaded(id)
    render(conn, "show.json", movie: movie)
  end

  def update(conn, %{"id" => id, "movie" => movie_params}) do
    movie = Reviews.get_movie!(id)

    with {:ok, %Movie{} = movie} <- Reviews.update_movie(movie, movie_params) do
      render(conn, "show.json", movie: movie)
    end
  end

  def delete(conn, %{"id" => id}) do
    movie = Reviews.get_movie!(id)
    with {:ok, %Movie{}} <- Reviews.delete_movie(movie) do
      send_resp(conn, :no_content, "")
    end
  end
end
