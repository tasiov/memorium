class Memorial < ActiveRecord::Base
  mount_uploader :path, PathUploader

	has_many :memorial_users
	has_many :users, through: :memorial_users
	has_many :comments
	has_many :pictures
  has_many :notifications
end
