class AddClipCornersToMemorial < ActiveRecord::Migration
  def change
    add_column :memorials, :crop_top, :string
    add_column :memorials, :crop_left, :string
    add_column :memorials, :crop_width, :string
  end
end
