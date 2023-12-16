# app/controllers/users/registrations_controller.rb

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json
  before_action :drop_session_cookie

  def update_profile
    authenticate_user!

    if params[:user][:password].blank?
      render json: { error: 'Password is required to update profile' }, status: :unprocessable_entity
      return
    end

    if current_user.valid_password?(params[:user][:password])
      if current_user.update(user_params)
        render json: {
          message: 'Profile updated successfully.',
          user: current_user
        }, status: :ok
      else
        render json: {
          error: 'Failed to update profile.',
          details: current_user.errors.full_messages
        }, status: :unprocessable_entity
      end
    else
      render json: { error: 'Invalid password' }, status: :unprocessable_entity
    end
  end

  def destroy
    authenticate_user!

    begin
      current_user.destroy
      sign_out(current_user)
      render json: { message: 'Account deleted successfully.' }, status: :ok
    rescue ActiveRecord::InvalidForeignKey
      render json: { error: 'Failed to delete account.' }, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(:username, :email, :password)
  end

  def respond_with(resource, _opts = {})
    register_success && return if resource.persisted?

    register_failed
  end

  def register_success
    render json: {
      message: 'Signed up sucessfully.',
      user: current_user
    }, status: :ok
  end

  def register_failed
    render json: { message: 'Registration failed.' }, status: :unprocessable_entity
  end
  
  private

  def drop_session_cookie
    request.session_options[:skip] = true
  end
end