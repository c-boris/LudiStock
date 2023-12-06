class CreateListings < ActiveRecord::Migration[7.1]
  def change
    create_table :listings do |t|
      t.string :title
      t.integer :price
      t.text :description

      t.timestamps
    end
  end
end
