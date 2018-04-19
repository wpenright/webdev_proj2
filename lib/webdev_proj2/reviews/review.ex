defmodule WebdevProj2.Reviews.Review do
  use Ecto.Schema
  import Ecto.Changeset
  alias WebdevProj2.Accounts.User
  alias WebdevProj2.Reviews.Movie


  schema "reviews" do
    field :rating, :integer
    field :user_review, :string
    belongs_to :user, User
    belongs_to :movie, Movie, references: :api_id, type: :string

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    IO.puts "In review changeset"
    review
    |> cast(attrs, [:rating, :user_review, :user_id, :movie_id])
    |> validate_required([:rating, :user_review, :user_id, :movie_id])
    |> foreign_key_constraint(:user_id)
    |> foreign_key_constraint(:movie_id)

    #|> assoc_constraint(:user)
    #|> assoc_constraint(:movie)
  end
end
