class CreateAges < ActiveRecord::Migration[7.1]
  def change
    create_table :ages do |t|
      t.integer :value
      t.string :label

      t.timestamps
    end
  end
end
