class CreateTiles < ActiveRecord::Migration[7.1]
  def change
    create_table :tiles do |t|
      t.string :suit
      t.integer :value

      t.timestamps
    end
  end
end
