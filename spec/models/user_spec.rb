require 'rails_helper'

RSpec.describe User, type: :model do
  before(:each) do
    @user = User.create(email: "testing@email.com", password: "123456")
  end
    context "validation" do
        it "is valid with valid attributs" do
        expect(@user).to be_a(User)
        expect(@user).to be_valid
    end
  end
  describe "email" do
      it "should not be valid without an email" do
        invalid_User = User.new(password: "123456")
        expect(invalid_User).not_to be_valid
      end
    end
    describe "password" do
      it "should not be valid without a password" do
        invalid_User = User.new(email: "testing@gmail.com")
        expect(invalid_User).not_to be_valid
      end
    end
    describe "password length" do
      it "should not be valid without a shorter password (<6)" do
        invalid_User = User.new(password: "123")
        expect(invalid_User).not_to be_valid
      end
    end
     describe "not admin on creation " do
      it "should not be admin" do
        invalid_User = User.new(password: "123")
        expect(invalid_User).not_to be_valid
      end
    end
end