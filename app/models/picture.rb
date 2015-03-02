class Picture < ActiveRecord::Base
	belongs_to :memorial
	mount_uploader :path, PathUploader

  def self.date_sort
    Picture.order('date')
  end
end
