defmodule WebdevProj2.AccountsTest do
  use WebdevProj2.DataCase

  alias WebdevProj2.Accounts

  describe "users" do
    alias WebdevProj2.Accounts.User

    @valid_attrs %{email: "some email", name: "some name", password_hash: "some password_hash"}
    @update_attrs %{email: "some updated email", name: "some updated name", password_hash: "some updated password_hash"}
    @invalid_attrs %{email: nil, name: nil, password_hash: nil}

    def user_fixture(attrs \\ %{}) do
      {:ok, user} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_user()

      user
    end

    test "list_users/0 returns all users" do
      user = user_fixture()
      assert Accounts.list_users() == [user]
    end

    test "get_user!/1 returns the user with given id" do
      user = user_fixture()
      assert Accounts.get_user!(user.id) == user
    end

    test "create_user/1 with valid data creates a user" do
      assert {:ok, %User{} = user} = Accounts.create_user(@valid_attrs)
      assert user.email == "some email"
      assert user.name == "some name"
      assert user.password_hash == "some password_hash"
    end

    test "create_user/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_user(@invalid_attrs)
    end

    test "update_user/2 with valid data updates the user" do
      user = user_fixture()
      assert {:ok, user} = Accounts.update_user(user, @update_attrs)
      assert %User{} = user
      assert user.email == "some updated email"
      assert user.name == "some updated name"
      assert user.password_hash == "some updated password_hash"
    end

    test "update_user/2 with invalid data returns error changeset" do
      user = user_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_user(user, @invalid_attrs)
      assert user == Accounts.get_user!(user.id)
    end

    test "delete_user/1 deletes the user" do
      user = user_fixture()
      assert {:ok, %User{}} = Accounts.delete_user(user)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_user!(user.id) end
    end

    test "change_user/1 returns a user changeset" do
      user = user_fixture()
      assert %Ecto.Changeset{} = Accounts.change_user(user)
    end
  end

  describe "follows" do
    alias WebdevProj2.Accounts.Follow

    @valid_attrs %{}
    @update_attrs %{}
    @invalid_attrs %{}

    def follow_fixture(attrs \\ %{}) do
      {:ok, follow} =
        attrs
        |> Enum.into(@valid_attrs)
        |> Accounts.create_follow()

      follow
    end

    test "list_follows/0 returns all follows" do
      follow = follow_fixture()
      assert Accounts.list_follows() == [follow]
    end

    test "get_follow!/1 returns the follow with given id" do
      follow = follow_fixture()
      assert Accounts.get_follow!(follow.id) == follow
    end

    test "create_follow/1 with valid data creates a follow" do
      assert {:ok, %Follow{} = follow} = Accounts.create_follow(@valid_attrs)
    end

    test "create_follow/1 with invalid data returns error changeset" do
      assert {:error, %Ecto.Changeset{}} = Accounts.create_follow(@invalid_attrs)
    end

    test "update_follow/2 with valid data updates the follow" do
      follow = follow_fixture()
      assert {:ok, follow} = Accounts.update_follow(follow, @update_attrs)
      assert %Follow{} = follow
    end

    test "update_follow/2 with invalid data returns error changeset" do
      follow = follow_fixture()
      assert {:error, %Ecto.Changeset{}} = Accounts.update_follow(follow, @invalid_attrs)
      assert follow == Accounts.get_follow!(follow.id)
    end

    test "delete_follow/1 deletes the follow" do
      follow = follow_fixture()
      assert {:ok, %Follow{}} = Accounts.delete_follow(follow)
      assert_raise Ecto.NoResultsError, fn -> Accounts.get_follow!(follow.id) end
    end

    test "change_follow/1 returns a follow changeset" do
      follow = follow_fixture()
      assert %Ecto.Changeset{} = Accounts.change_follow(follow)
    end
  end
end
