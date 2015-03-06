class AddPathToMemorial < ActiveRecord::Migration
  def change
    add_column :memorials, :path, :string
  end
end
