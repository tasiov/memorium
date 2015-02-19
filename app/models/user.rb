class User < ActiveRecord::Base
	has_many memorial_user
	has_many :memorials, through: :memorial_user
end
