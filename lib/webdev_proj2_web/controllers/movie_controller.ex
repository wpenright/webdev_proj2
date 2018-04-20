defmodule WebdevProj2Web.MovieController do
  use WebdevProj2Web, :controller

  alias WebdevProj2.Reviews
  alias WebdevProj2.Reviews.Movie
  alias WebdevProj2.API 

  action_fallback WebdevProj2Web.FallbackController

  def index(conn, _) do
    if conn.assigns[:user_id] do
      movies = Reviews.list_movies()
      render(conn, "index.json", movies: movies)
    end
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

  def show(conn, %{"id" => id}) do
    if conn.assigns[:user_id] do
      movie = Reviews.get_movie_by_api_preloaded(id)
      render(conn, "show.json", movie: movie)
    end
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

  def search(conn, %{"title" => title}) do
<<<<<<< HEAD
	movies = API.search_movies(title)
    json(conn, movies)

	# TODO: Return this data in the format expected by the front end
=======
    if conn.assigns[:user_id] do
	  movies = API.search_movies(title)
      json(conn, movies)
    end
>>>>>>> master
  end
end
