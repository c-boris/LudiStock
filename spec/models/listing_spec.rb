require 'rails_helper'

RSpec.describe Listing, type: :model do
  before(:each) do
    @category = Category.create(value: 1)
    @age = Age.create(value: 1)
    @state = State.create(value: 1)
    @user = User.create(email: "testing@email.com", password: "123456")

    @listing = Listing.create(
      title: "Mon premier jouet en bois",
      price: 26,
      description: "Différentes formes: cubes, triangles, rectangles. 56 pièces au total.",
      category: @category,
      age: @age,
      state: @state,
      user: @user
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
    describe "listings" do 
      it "should belong to a user" do
        expect(@user.listings.include?(@listing)).to eq(true)
      end
      it "should belong to age" do 
        expect(@age.listings.include?(@listing)).to eq(true)
      end
      it "should belong to state" do 
        expect(@state.listings.include?(@listing)).to eq(true)
      end
       it "should belong to state" do 
        expect(@category.listings.include?(@listing)).to eq(true)
      end
    end
  end
end
