class AddPictureToComments < ActiveRecord::Migration
  def change
    add_column :comments, :path, :string
  end
end
