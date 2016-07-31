class CreateSigns < ActiveRecord::Migration[5.0]
  def change
    create_table :signs do |t|
      t.string :name
      t.integer :sqfootage
      t.string :address

      t.timestamps
    end
  end
end
