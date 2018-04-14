defmodule WebdevProj2.Repo.Migrations.CreateFollows do
  use Ecto.Migration

  def change do
    create table(:follows) do
      add :follower_id, references(:User, on_delete: :delete_all), null: false
      add :followee_id, references(:User, on_delete: :delete_all), null: false

      timestamps()
    end

    create index(:follows, [:follower])
    create index(:follows, [:followee])
  end
end
