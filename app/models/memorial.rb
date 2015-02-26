class Memorial < ActiveRecord::Base
	has_many :memorial_users
	has_many :users, through: :memorial_users
end
