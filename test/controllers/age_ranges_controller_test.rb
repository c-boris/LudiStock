require "test_helper"

class AgeRangesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @age_range = age_ranges(:one)
  end

  test "should get index" do
    get age_ranges_url, as: :json
    assert_response :success
  end

  test "should create age_range" do
    assert_difference("AgeRange.count") do
      post age_ranges_url, params: { age_range: { label: @age_range.label, value: @age_range.value } }, as: :json
    end

    assert_response :created
  end

  test "should show age_range" do
    get age_range_url(@age_range), as: :json
    assert_response :success
  end

  test "should update age_range" do
    patch age_range_url(@age_range), params: { age_range: { label: @age_range.label, value: @age_range.value } }, as: :json
    assert_response :success
  end

  test "should destroy age_range" do
    assert_difference("AgeRange.count", -1) do
      delete age_range_url(@age_range), as: :json
    end

    assert_response :no_content
  end
end
