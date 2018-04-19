defmodule WebdevProj2Web.MovieController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Reviews
  alias WebdevProj2.Reviews.Movie
  alias WebdevProj2.API
  alias WebdevProj2.Auth

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, %{"token" => token}) do
    Auth.verify_token(conn, token)
    movies = Reviews.list_movies()
    render(conn, "index.json", movies: movies)
  end

  # NOTE: This should not ever be called directly by client (restrict in router)
  def create(conn, %{"movie" => movie_params}) do
    with {:ok, %Movie{} = movie} <- Reviews.create_movie(movie_params) do
      conn
      |> put_status(:created)
      |> put_resp_header("location", movie_path(conn, :show, movie))
      |> render("show.json", movie: movie)
    end
  end

  def show(conn, %{"id" => id, "token" => token}) do
    Auth.verify_token(conn, token)
    movie = Reviews.get_movie_by_api_preloaded(id)
    render(conn, "show.json", movie: movie)
  end

  # NOTE: This should not ever be called directly by client (restrict in router)
  def update(conn, %{"id" => id, "movie" => movie_params}) do
    movie = Reviews.get_movie_by_api(id)

    with {:ok, %Movie{} = movie} <- Reviews.update_movie(movie, movie_params) do
      render(conn, "show.json", movie: movie)
    end
  end

  # NOTE: This should not ever be called directly by client (restrict in router)
  def delete(conn, %{"id" => id}) do
    movie = Reviews.get_movie_by_api(id)
    with {:ok, %Movie{}} <- Reviews.delete_movie(movie) do
      send_resp(conn, :no_content, "")
    end
  end

  def search(conn, %{"title" => title, "token" => token}) do
    Auth.verify_token(conn, token)
	movies = API.search_movies(title)
    json(conn, movies)
  end
end
