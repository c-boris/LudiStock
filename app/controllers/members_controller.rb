# app/controllers/members_controller.rb

class MembersController < ApplicationController
  before_action :authenticate_user!, except: [:get_all_users]
  

  def show
    user = get_user_from_token
    render json: {
      message: "If you see this, you're in!",
      user: user
    }
  end

  def get_all_users
  @users = User.all # User.all pour récupérer tous les utilisateurs enregistrés
  render json: @users # Vous pouvez choisir de renvoyer les utilisateurs au format JSON ou HTML, selon vos besoins
end
  private

  def get_user_from_token
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                             Rails.application.credentials.devise[:jwt_secret_key]).first
    user_id = jwt_payload['sub']
    User.find(user_id.to_s)
  end
end