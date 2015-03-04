json.user do
  json.array!(@users) do |user|
    json.extract! user, :id, :first_name, :email, :password, :created_at, :updated_at, :last_name
  end
end

json.memorial_users do
  json.array!(@memorial_users) do |mu|
    json.extract! mu, :id, :user_id, :memorial_id, :role
  end
end
