	class AddNameBirthDeathToMemorials < ActiveRecord::Migration
  def change
    add_column :memorials, :name, :string
    add_column :memorials, :birth_date, :date
    add_column :memorials, :death_date, :date
  end
end
