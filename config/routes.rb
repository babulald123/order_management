Rails.application.routes.draw do
  devise_for :restaurants
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      devise_for :users, singular: :user, controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }

      devise_for :restaurants, controllers: {
        sessions: 'restaurants/sessions',
        registrations: 'restaurants/registrations'
      }
    end
  end

  resources :referrals, only: [:create]
  resources :restaurants, only: [:index]  do
    resources :menus
  end

  resources :users do
    resources :orders, only: [:index, :create, :show]
  end
end
