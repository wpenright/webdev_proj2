defmodule WebdevProj2.Reviews do
  @moduledoc """
  The Reviews context.
  """

  import Ecto.Query, warn: false
  alias WebdevProj2.Repo

  alias WebdevProj2.Reviews.Movie

  @doc """
  Returns the list of movies.

  ## Examples

      iex> list_movies()
      [%Movie{}, ...]

  """
  def list_movies do
    Repo.all(Movie)
  end

  @doc """
  Gets a single movie.

  Raises `Ecto.NoResultsError` if the Movie does not exist.

  ## Examples

      iex> get_movie!(123)
      %Movie{}

      iex> get_movie!(456)
      ** (Ecto.NoResultsError)

  """
  def get_movie!(id) do
    Repo.get!(Movie, id)
  end

  @doc """
  Gets a single movie by its api_id.

  """
  def get_movie_by_api(id) do
    populate_movie(id)
    Repo.get_by(Movie, api_id: id)
  end

  @doc """
  Gets a single movie preloaded with reviews.

  """
  def get_movie_by_api_preloaded(id) do
    populate_movie(id)
    Repo.get_by(Movie, api_id: id)
    |> Repo.preload([reviews: [:user]])
  end

  @doc """
  Creates a movie.

  ## Examples

      iex> create_movie(%{field: value})
      {:ok, %Movie{}}

      iex> create_movie(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_movie(attrs \\ %{}) do
    %Movie{}
    |> Movie.changeset(attrs)
    |> Repo.insert()
  end

  @doc """
  Updates a movie.

  ## Examples

      iex> update_movie(movie, %{field: new_value})
      {:ok, %Movie{}}

      iex> update_movie(movie, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_movie(%Movie{} = movie, attrs) do
    movie
    |> Movie.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Movie.

  ## Examples

      iex> delete_movie(movie)
      {:ok, %Movie{}}

      iex> delete_movie(movie)
      {:error, %Ecto.Changeset{}}

  """
  def delete_movie(%Movie{} = movie) do
    Repo.delete(movie)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking movie changes.

  ## Examples

      iex> change_movie(movie)
      %Ecto.Changeset{source: %Movie{}}

  """
  def change_movie(%Movie{} = movie) do
    Movie.changeset(movie, %{})
  end

  alias WebdevProj2.Reviews.Review

  @doc """
  Returns the list of reviews.

  ## Examples

      iex> list_reviews()
      [%Review{}, ...]

  """
  def list_reviews do
    Repo.all(Review)
    |> Repo.preload([:user, :movie])
  end

  @doc """
  Gets a single review.

  Raises `Ecto.NoResultsError` if the Review does not exist.

  ## Examples

      iex> get_review!(123)
      %Review{}

      iex> get_review!(456)
      ** (Ecto.NoResultsError)

  """
  def get_review!(id) do
    Repo.get!(Review, id)
    |> Repo.preload([:user, :movie])
  end

  @doc """
  Gets a single review.

  """
  def get_review(id) do
    Repo.get(Review, id)
    |> Repo.preload([:user, :movie])
  end

  @doc """
  Creates a review.

  ## Examples

      iex> create_review(%{field: value})
      {:ok, %Review{}}

      iex> create_review(%{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def create_review(attrs \\ %{}) do
    toReturn = %Review{}
    |> Review.changeset(attrs)
    |> Repo.insert()
    IO.puts("-------------")
    IO.inspect(toReturn)
    IO.puts("-------------")
    IO.inspect(elem(toReturn, 1))
    withLoaded = Repo.preload(elem(toReturn, 1), [:user, :movie])
    IO.puts("-------------")
    IO.inspect(withLoaded)
    IO.puts("-------------")
    toReturn
  end

  @doc """
  Updates a review.

  ## Examples

      iex> update_review(review, %{field: new_value})
      {:ok, %Review{}}

      iex> update_review(review, %{field: bad_value})
      {:error, %Ecto.Changeset{}}

  """
  def update_review(%Review{} = review, attrs) do
    review
    |> Review.changeset(attrs)
    |> Repo.update()
  end

  @doc """
  Deletes a Review.

  ## Examples

      iex> delete_review(review)
      {:ok, %Review{}}

      iex> delete_review(review)
      {:error, %Ecto.Changeset{}}

  """
  def delete_review(%Review{} = review) do
    Repo.delete(review)
  end

  @doc """
  Returns an `%Ecto.Changeset{}` for tracking review changes.

  ## Examples

      iex> change_review(review)
      %Ecto.Changeset{source: %Review{}}

  """
  def change_review(%Review{} = review) do
    Review.changeset(review, %{})
  end

  alias WebdevProj2.API

  # If the movie with the given id is not already in the database, grab the data from the API
  def populate_movie(id) do
    # Check to see if the given movie is already in the db
    m = Repo.get_by(Movie, api_id: id)

    # If the movie was not found
    if m == nil do
      data = API.get_movie_data(id)

      # Set each record value from the API result
      attrs = %{
        api_id: id,
        title: data["Title"],
        poster: data["Poster"],
        runtime: data["Runtime"],
        summary: data["Plot"],
        director: data["Director"],
        rating: data["imdbRating"]
      }

      %Movie{}
      |> Movie.changeset(attrs)
      |> Repo.insert()
    end
    # Else do nothing

  end

end
