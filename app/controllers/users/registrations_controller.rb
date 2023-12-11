# app/controllers/users/registrations_controller.rb

class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def update_profile
    authenticate_user!
    
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
  end

  def destroy
    authenticate_user!

    # Supprimer les enregistrements associés dans la table "listings"
    # ou effectuer d'autres actions nécessaires pour gérer les contraintes de clé étrangère

    begin
      current_user.destroy
      sign_out(current_user) # Déconnexion de l'utilisateur après la suppression
      render json: { message: 'Account deleted successfully.' }, status: :ok
    rescue ActiveRecord::InvalidForeignKey
      render json: { error: 'Failed to delete account due to foreign key constraint.' }, status: :unprocessable_entity
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
    render json: { message: 'Something went wrong.' }, status: :unprocessable_entity
  end
end