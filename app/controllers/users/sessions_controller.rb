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
    if current_user
      log_out_success
    else
      log_out_failure
    end
  end

  def log_out_success
    Rails.logger.info("User #{current_user.email} logged out successfully.")
    render json: { message: 'You are logged out.' }, status: :ok
  end
  
  def log_out_failure
    Rails.logger.error("Logout failure - current_user is nil.")
    render json: { message: 'Hmm, nothing happened.' }, status: :unauthorized
  end
end