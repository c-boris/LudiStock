require 'rails_helper'

RSpec.describe Listing, type: :model do
  before(:each) do
    # Création des instances nécessaires pour passer les validations
    category = Category.create(value: 1)
    age = Age.create(value: 1)
    state = State.create(value: 1)
    user = User.create(email: "testing@email.com", password: 123456)

    @listing = Listing.create(
      title: "Mon premier jouet en bois",
      price: 26,
      description: "Différentes formes: cubes, triangles, rectangles. 56 pièces au total.",
      category: category,
      age: age,
      state: state,
      user: user
    )
  end

  context "validation" do 
    it "should have a title" do
      expect(@listing).to be_a(Listing)
      expect(@listing).to be_valid
    end

    describe "title" do
      it "should not be valid without a title" do
        invalid_listing = Listing.create(description: "awesome testing by me and for me")
        expect(invalid_listing).not_to be_valid
      end
    end
  end

  context "associations" do 
end
