class Picture < ActiveRecord::Base
	belongs_to :memorial
	mount_uploader :path, PathUploader

  def self.sort
    Picture.order('date')
  end
end
