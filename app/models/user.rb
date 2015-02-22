class User < ActiveRecord::Base
	has_many :memorial_users
	has_many :memorials, through: :memorial_users

	validates :name, presence: true
	validates :email, presence: true, uniqueness: true, format: /\A[-a-z0-9~!\z%^&*_=+}{\'?]+(\.[-a-z0-9~!\z%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?\z/i
	validates :password, presence: true, length: { in: 6..20 }
end
