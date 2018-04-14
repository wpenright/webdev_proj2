defmodule WebdevProj2.Accounts.Follow do
  use Ecto.Schema
  import Ecto.Changeset


  schema "follows" do
    field :follwee, :id
    field :follower, :id

    timestamps()
  end

  @doc false
  def changeset(follow, attrs) do
    follow
    |> cast(attrs, [])
    |> validate_required([])
  end
end
