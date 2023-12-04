class CreateAgeRanges < ActiveRecord::Migration[7.1]
  def change
    create_table :age_ranges do |t|
      t.integer :value
      t.string :label

      t.timestamps
    end
  end
end
