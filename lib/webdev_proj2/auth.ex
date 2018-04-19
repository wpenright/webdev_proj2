defmodule WebdevProj2.Auth do

	# Verify the given token
	def verify_token(conn, token) do
		{status, user_id} = Phoenix.Token.verify(conn, "authorization", token, max_age: 86400)

		# If token is valid, return user_id
		if status == :ok do
			user_id
		# Else return raise exception / return nil
		else
			raise "Invalid Token!"
			nil
		end
	end

end
