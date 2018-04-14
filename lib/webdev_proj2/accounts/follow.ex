defmodule WebdevProj2.Accounts.Follow do
  use Ecto.Schema
  import Ecto.Changeset
  alias WebdevProj2.Accounts.User


  schema "follows" do
    belongs_to :follower, User
    belongs_to :followee, User

    timestamps()
  end

  @doc false
  def changeset(follow, attrs) do
    follow
    |> cast(attrs, [:follower_id, :followee_id])
    |> validate_required([:follower_id, :followee_id])
  end
end
