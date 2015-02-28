class CreatePictures < ActiveRecord::Migration
  def change
    create_table :pictures do |t|
      t.Date :date
      t.string :path
      t.string :caption
      t.text :description

      t.timestamps null: false
    end
  end
end
