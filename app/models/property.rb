class Property < ApplicationRecord
  belongs_to  :user  
  validates :title, presence: true, length: { minimum: 5, message: "doit avoir au moins 5 caractères" }
  validates :price, presence: true
  validates :description,presence: true, length: { minimum: 15, message: "doit avoir au moins 15 caractères" }
end

#    t.string "title"
#    t.integer "price"
#    t.text "description"