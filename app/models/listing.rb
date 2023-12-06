class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :age
  belongs_to :state
  belongs_to :user
end
