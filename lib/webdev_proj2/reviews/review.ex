defmodule WebdevProj2.Reviews.Review do
  use Ecto.Schema
  import Ecto.Changeset
  alias WebdevProj2.Accounts.User
  alias WebdevProj2.Reviews.Movie


  schema "reviews" do
    field :rating, :integer
    field :user_review, :string
    belongs_to :user, User
    belongs_to :movie, Movie

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:rating, :user_review])
    |> validate_required([:rating, :user_review])
  end
end
