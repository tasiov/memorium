class CreateDeceaseds < ActiveRecord::Migration
  def change
    create_table :deceaseds do |t|
      t.string :name
      t.date :birth
      t.date :death

      t.timestamps null: false
    end
  end
end
