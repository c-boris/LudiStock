# config/routes.rb

Rails.application.routes.draw do
  resources :ages
  resources :categories
  resources :states
  resources :age_ranges
  resources :listings

  devise_for :users,
             controllers: {
               sessions: 'users/sessions',
               registrations: 'users/registrations',
               passwords: 'users/passwords'
             }

  # namespace :api do
  #   devise_for :users,
  #              controllers: {
  #                sessions: 'api/users/sessions',
  #                registrations: 'api/users/registrations',
  #                passwords: 'api/users/passwords'
  #              }
  # end

  # resources :properties
  get '/member-data', to: 'members#show'
  get '/users', to: 'members#get_all_users', as: 'users'

  resources :properties

  devise_scope :user do
    patch '/users/update_profile', to: 'users/registrations#update_profile', as: :update_profile
  end

  get "*path", to: "fallback#index", constraints: ->(req) { !req.xhr? && req.format.html? }
end
