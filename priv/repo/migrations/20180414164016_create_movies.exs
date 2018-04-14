defmodule WebdevProj2.Repo.Migrations.CreateMovies do
  use Ecto.Migration

  def change do
    create table(:movies) do
      add :title, :string
      add :api_id, :string
      add :runtime, :string
      add :poster, :string
      add :summary, :string

      timestamps()
    end

  end
end
