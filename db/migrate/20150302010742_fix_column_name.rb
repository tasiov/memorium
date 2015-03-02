class FixColumnName < ActiveRecord::Migration
  def change
        rename_column :notifications, :type, :message_type
  end
end
