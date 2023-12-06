
  class Users::RegistrationsController < Devise::RegistrationsController
    before_action :authenticate_user!, only: [:update_profile]
    respond_to :json

    def create
      super do |resource|
        if resource.persisted?
          # Action to send a welcome email after user creation
          UserMailer.with(user: resource).welcome_email.deliver_later
        end
      end
    end

    def update_profile
      user = current_user

      if user.nil?
        Rails.logger.error("User not authenticated. Headers: #{request.headers.inspect}")
        render json: { errors: ["User not authenticated"] }, status: :unauthorized
        return
      end

      # Remove unnecessary parameters, excluding username
      allowed_params = user_params.except(:user_id, :username)

      # If email or password are not provided, use existing email and password
      allowed_params[:email] = user.email if allowed_params[:email].blank?
      allowed_params[:password] = user.password if allowed_params[:password].blank?

      if user.update_with_password(allowed_params)
        render json: render_user(user), status: :ok
      else
        Rails.logger.error("Failed to update profile. Errors: #{user.errors.full_messages}")
        render json: { errors: user.errors.full_messages }, status: :unprocessable_entity
      end
    end

    private

    def respond_with(resource, _opts = {})
      resource.persisted? ? register_success : register_failed
    end

    def register_success
      render json: {
        message: 'Signed up successfully.',
        user: current_user.slice(:id, :email, :username)
      }, status: :ok
    end

    def register_failed
      render json: { message: 'Something went wrong.' }, status: :unprocessable_entity
    end

    def user_params
      params.require(:user).permit(:email, :email_confirmation, :password, :password_confirmation, :current_password)
    end

    def render_user(user)
      # Customize as needed, for example, include additional attributes
      { user: user.slice(:id, :email, :username) }
    end
  end

