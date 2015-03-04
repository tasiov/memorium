class AddMemorialToNotifications < ActiveRecord::Migration
  def change
    add_reference :notifications, :memorial, index: true
    add_foreign_key :notifications, :memorials
  end
end
