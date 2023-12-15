class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :age
  belongs_to :state
  belongs_to :user
  has_one_attached :header_image
  
end
