class CreateMemorials < ActiveRecord::Migration
  def change
    create_table :memorials do |t|
      t.string :title
      t.text :description

      t.timestamps null: false
    end
  end
end
