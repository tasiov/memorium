json.array!(@users) do |user|
  json.extract! user, :id, :first_name, :email, :password, :created_at, :updated_at, :last_name
  json.url user_url(user, format: :json)
end
