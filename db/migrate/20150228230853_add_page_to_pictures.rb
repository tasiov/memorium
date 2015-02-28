class AddPageToPictures < ActiveRecord::Migration
  def change
    add_column :pictures, :page, :string
  end
end
