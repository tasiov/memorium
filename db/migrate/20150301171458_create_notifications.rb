class CreateNotifications < ActiveRecord::Migration
  def change
    create_table :notifications do |t|
      t.references :sender, index: true
      t.references :recipient, index: true
      t.text :message
      t.string :type

      t.timestamps null: false
    end
    add_foreign_key :notifications, :senders
    add_foreign_key :notifications, :recipients
  end
end
