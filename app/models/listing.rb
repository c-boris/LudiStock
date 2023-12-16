class Listing < ApplicationRecord
  belongs_to :category
  belongs_to :age
  belongs_to :state
  belongs_to :user
  has_one_attached :header_image
  validates :title, presence: true, length: { minimum: 5 }
  validates :description, presence: true, length: { minimum: 15 }
  validates :price, presence: true
end
