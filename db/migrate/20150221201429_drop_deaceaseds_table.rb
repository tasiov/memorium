class DropDeaceasedsTable < ActiveRecord::Migration
  def up
  	drop_table :deceaseds
  end

  def down
  end
end
