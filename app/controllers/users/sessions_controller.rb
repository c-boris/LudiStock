# app/controllers/users/sessions_controller.rb

class Users::SessionsController < Devise::SessionsController
  respond_to :json

  private

  def respond_with(_resource, _opts = {})
    render json: {
      message: 'You are logged in.',
      user: current_user
    }, status: :ok
  end

  def respond_to_on_destroy
    log_out_success && return if current_user

    log_out_failure
  end

  def log_out_success
    render json: { message: 'You are logged out.' }, status: :ok
  end

  def log_out_failure
    render json: { message: 'Hmm nothing happened.' }, status: :unauthorized
  end
end



# class Users::SessionsController < Devise::SessionsController
#   before_action :authenticate_user!, except: [:destroy]

#   def destroy
#     if current_user
#       sign_out current_user
#       render json: { message: 'You are logged out.' }, status: :ok
#     else
#       render json: { message: 'You are already logged out.' }, status: :ok
#     end
#   end

#   # Ajoutez la méthode respond_to_on_destroy ici
#   def respond_to_on_destroy
#     # Personnalisez selon vos besoins
#     head :no_content
#   end

#   private

#   def log_out_success
#     render json: { message: 'You are logged out.' }, status: :ok
#   end

#   def log_out_failure(message)
#     render json: { message: "Logout failed. #{message}" }, status: :unauthorized
#   end
# end
