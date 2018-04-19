defmodule WebdevProj2.Reviews.Movie do
  use Ecto.Schema
  import Ecto.Changeset
  alias WebdevProj2.Reviews.Review

  schema "movies" do
    field :api_id, :string
    field :title, :string
    field :poster, :string
    field :runtime, :string
    field :summary, :string
    field :director, :string
    field :rating, :string
    has_many :reviews, Review, foreign_key: :movie_id, references: :api_id

    timestamps()
  end

  @doc false
  def changeset(movie, attrs) do
    movie
    |> cast(attrs, [:title, :api_id, :runtime, :poster, :summary, :director, :rating])
    |> unique_constraint(:unique_api_id, name: :unique_api_id_index)
    |> validate_required([:title, :api_id])
  end
end
