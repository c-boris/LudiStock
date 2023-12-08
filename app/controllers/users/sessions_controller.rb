class Users::SessionsController < Devise::SessionsController
  before_action :authenticate_user!, only: [:destroy]
  skip_before_action :verify_signed_out_user, only: [:destroy]
  respond_to :json

  def destroy
    reset_session
    respond_to_on_destroy
  end

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
