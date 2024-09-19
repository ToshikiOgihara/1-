Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  root "pages#index"
  
  get 'game/', action: :index, controller: 'game'
  get 'game/play', action: :play, controller: 'game'
  post 'game/play', action: :discard, controller: 'game'
  
  get 'game/result'
  post 'game/result', action: :tsumo, controller: 'game'
end
