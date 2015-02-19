class Memorial < ActiveRecord::Base
	has_many memorial_user
	has_many :users, through: :memorial_user
end
