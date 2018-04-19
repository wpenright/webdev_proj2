defmodule WebdevProj2.Repo.Migrations.CreateReviews do
  use Ecto.Migration

  def change do
    create table(:reviews) do
      add :rating, :integer, null: false
      add :user_review, :string, null: false
      add :user_id, references(:users, on_delete: :nothing), null: false
      add :movie_id, references(:movies, column: :api_id, type: :string, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:reviews, [:user_id])
    create index(:reviews, [:movie_id])
  end
end
