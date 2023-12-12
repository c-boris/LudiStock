class ListingsController < ApplicationController
  before_action :set_listing, only: %i[ show update destroy ]

  # GET /listings
  def index
    @listings = Listing.includes(:category, :age, :state, :user).all

    listings_json = @listings.map do |listing|
      { id: listing.id,
        title: listing.title,
        price: listing.price,
        description: listing.description,
        user_id: listing.user_id,
        age_id: listing.age_id,
        state_id: listing.state_id,
        category_id: listing.category_id,
        header_image: url_for(listing.header_image),
        category: { id: listing.category.id, label: listing.category.label },
        age: { id: listing.age.id, label: listing.age.label },
        state: { id: listing.state.id, label: listing.state.label },
        user: { id: listing.user.id, email: listing.user.email }
      }
    end

    render json: listings_json
  end

  # GET /listings/1
  def show
    render json: @listing
  end

  # POST /listings
  def create
    @listing = Listing.new(listing_params)
    @listing.header_image.attach(params[:listing][:header_image])

    if @listing.save
      render json: @listing.as_json(only: %i[id,title,price,description,user_id,age_id,state_id,category_id]).merge(header_image: url_for(@listing.header_image)), status: :created, location: @listing
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /listings/1
  def update
    if @listing.update(listing_params)
      render json: @listing.as_json(only: %i[id,title,price,description,user_id,age_id,state_id,category_id]).merge(header_image: url_for(@listing.header_image))
    else
      render json: @listing.errors, status: :unprocessable_entity
    end
  end

  # DELETE /listings/1
  def destroy
    @listing.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_listing
      @listing = Listing.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def listing_params
      params.require(:listing).permit(:id,:title, :price, :description, :age_id, :category_id, :state_id, :user_id, :header_image)
    end
end
 #params.require(:listing).permit(:id,:title, :price, :description, :age_id, :category_id, :state_id, :user_id, :header_image, images: [])