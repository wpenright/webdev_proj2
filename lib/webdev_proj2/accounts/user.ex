defmodule WebdevProj2.Accounts.User do
  use Ecto.Schema
  import Ecto.Changeset
  alias WebdevProj2.Accounts.Follow
  alias WebdevProj2.Reviews.Review


  schema "users" do
    field :email, :string
    field :name, :string
    field :password_hash, :string
    field :password, :string, virtual: true
    has_many :follower_follows, Follow, foreign_key: :follower_id
    has_many :followee_follows, Follow, foreign_key: :followee_id
    has_many :followers, through: [:followee_follows, :follower]
    has_many :followees, through: [:follower_follows, :followee]
    has_many :reviews, Review, foreign_key: :user_id

    timestamps()
  end

  @doc false
  def changeset(user, attrs) do
    user
    |> cast(attrs, [:name, :email, :password])
    |> validate_required([:name, :email])
  end
end
