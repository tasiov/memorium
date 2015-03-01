class AddMemorialIdToPictures < ActiveRecord::Migration
  def change
    add_reference :pictures, :memorial, index: true
    add_foreign_key :pictures, :memorials
  end
end
