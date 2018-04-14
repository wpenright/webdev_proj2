defmodule WebdevProj2.Reviews.Movie do
  use Ecto.Schema
  import Ecto.Changeset


  schema "movies" do
    field :api_id, :string
    field :poster, :string
    field :runtime, :string
    field :summary, :string
    field :title, :string

    timestamps()
  end

  @doc false
  def changeset(movie, attrs) do
    movie
    |> cast(attrs, [:title, :api_id, :runtime, :poster, :summary])
    |> validate_required([:title, :api_id, :runtime, :poster, :summary])
  end
end
