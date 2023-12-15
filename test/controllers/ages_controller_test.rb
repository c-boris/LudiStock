require "test_helper"

class AgesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @age = ages(:one)
  end

  test "should get index" do
    get ages_url, as: :json
    assert_response :success
  end

  test "should create age" do
    assert_difference("Age.count") do
      post ages_url, params: { age: { label: @age.label, value: @age.value } }, as: :json
    end

    assert_response :created
  end

  test "should show age" do
    get age_url(@age), as: :json
    assert_response :success
  end

  test "should update age" do
    patch age_url(@age), params: { age: { label: @age.label, value: @age.value } }, as: :json
    assert_response :success
  end

  test "should destroy age" do
    assert_difference("Age.count", -1) do
      delete age_url(@age), as: :json
    end

    assert_response :no_content
  end
end
