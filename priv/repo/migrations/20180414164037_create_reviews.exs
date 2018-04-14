defmodule WebdevProj2.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :rating, :integer, null: false
      add :user_review, :string, null: false
      add :user_id, references(:User, on_delete: :nothing), null: false
      add :movie_id, references(:Movie, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:reviews, [:user])
    create index(:reviews, [:movie])
  end
end
