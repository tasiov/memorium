class CreateMemorialUsers < ActiveRecord::Migration
  def change
    create_table :memorial_users do |t|
      t.references :user, index: true
      t.references :memorial, index: true
      t.string :role

      t.timestamps null: false
    end
    add_foreign_key :memorial_users, :users
    add_foreign_key :memorial_users, :memorials
  end
end
