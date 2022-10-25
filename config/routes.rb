Rails.application.routes.draw do
  

  # SESSIONS

  namespace :api do

  resources :emails
  resources :users

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "sessions#show"

  end

  get '*path',
    to: 'fallback#index',
    constraints: ->(req) { !req.xhr? && req.format.html? }

end