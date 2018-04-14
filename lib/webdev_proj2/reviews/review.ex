defmodule WebdevProj2.Reviews.Review do
  use Ecto.Schema
  import Ecto.Changeset


  schema "reviews" do
    field :rating, :integer
    field :user_review, :string
    field :user, :id
    field :movie, :id

    timestamps()
  end

  @doc false
  def changeset(review, attrs) do
    review
    |> cast(attrs, [:rating, :user_review])
    |> validate_required([:rating, :user_review])
  end
end
