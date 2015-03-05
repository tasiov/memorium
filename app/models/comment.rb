class Comment < ActiveRecord::Base
  mount_uploader :path, PathUploader
  belongs_to :user
  belongs_to :memorial
end
