defmodule WebdevProj2.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :rating, :integer
      add :user_review, :string
      add :user_id, references(:User, on_delete: :nothing)
      add :movie_id, references(:Movie, on_delete: :nothing)

      timestamps()
    end

    create index(:reviews, [:user])
    create index(:reviews, [:movie])
  end
end
