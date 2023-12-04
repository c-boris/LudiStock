class AgeRangesController < ApplicationController
  before_action :set_age_range, only: %i[ show update destroy ]

  # GET /age_ranges
  def index
    @age_ranges = AgeRange.all

    render json: @age_ranges
  end

  # GET /age_ranges/1
  def show
    render json: @age_range
  end

  # POST /age_ranges
  def create
    @age_range = AgeRange.new(age_range_params)

    if @age_range.save
      render json: @age_range, status: :created, location: @age_range
    else
      render json: @age_range.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /age_ranges/1
  def update
    if @age_range.update(age_range_params)
      render json: @age_range
    else
      render json: @age_range.errors, status: :unprocessable_entity
    end
  end

  # DELETE /age_ranges/1
  def destroy
    @age_range.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_age_range
      @age_range = AgeRange.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def age_range_params
      params.require(:age_range).permit(:value, :label)
    end
end
