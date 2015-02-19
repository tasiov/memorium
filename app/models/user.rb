class User < ActiveRecord::Base
	has_many :memorial_users
	has_many :memorials, through: :memorial_users
end
