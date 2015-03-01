class Picture < ActiveRecord::Base
	belongs_to :memorial
	mount_uploader :path, PathUploader

end
