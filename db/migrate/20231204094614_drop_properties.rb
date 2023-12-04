class DropProperties < ActiveRecord::Migration[7.1]
  def change
    drop_table :properties
  end
end
