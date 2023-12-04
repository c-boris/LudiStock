class AddCityToProperties < ActiveRecord::Migration[7.1]
  def change
    add_column :properties, :city, :string
  end
end
