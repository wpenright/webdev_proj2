defmodule WebdevProj2.Repo.Migrations.CreateFollows do
  use Ecto.Migration

  def change do
    create table(:follows) do
      add :follwee_id, references(:User, on_delete: :nothing)
      add :follower_id, references(:User, on_delete: :nothing)

      timestamps()
    end

    create index(:follows, [:follwee])
    create index(:follows, [:follower])
  end
end
