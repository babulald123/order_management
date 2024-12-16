Rails.application.routes.draw do
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    namespace :v1 do
      devise_for :users, singular: :user, controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }

      # devise_for :restaurants, singular: :restaurant, controllers: {
      #   sessions: 'api/v1/restaurants/sessions',
      #   registrations: 'api/v1/restaurants/registrations'
      # }
    end
  end

  # resources :referrals, only: [:create]
  # resources :restaurants, only: [:index]  do
  #   resources :menus
  # end

  # resources :users do
  #   resources :orders, only: [:index, :create, :show]
  # end

  # resources :driver_locations, only: [:update]


  namespace :api do
    namespace :v1 do
      resources :restaurants do
        resources :menus
        resources :orders
      end
      resources :driver_locations, only: [:update]
    end
  end
end
