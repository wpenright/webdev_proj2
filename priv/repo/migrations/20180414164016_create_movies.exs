defmodule WebdevProj2.Repo.Migrations.CreateMovies do
  use Ecto.Migration

  def change do
    create table(:movies) do
      add :title, :string, null: false
      add :api_id, :string, null: false
      add :runtime, :string
      add :poster, :string
      add :summary, :string
      add :director, :string
      add :rating, :string

      timestamps()
    end

    create unique_index(:movies, :api_id, name: :unique_api_id_index)

  end
end
