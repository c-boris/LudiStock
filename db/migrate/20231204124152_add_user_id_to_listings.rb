class AddUserIdToListings < ActiveRecord::Migration[7.1]
  def change
    add_reference :listings, :user, null: false, foreign_key: true
    add_reference :listings, :age, null: false, foreign_key: true
    add_reference :listings, :state, null: false, foreign_key: true
    add_reference :listings, :category, null: false, foreign_key: true

  end
end
