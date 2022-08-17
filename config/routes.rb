Rails.application.routes.draw do
  resources :emails
  resources :users

  # SESSIONS

  post "/login", to: "sessions#create"
  delete "/logout", to: "sessions#destroy"
  get "/me", to: "sessions#show"

  # EMAILS

  

end

# Rails.application.routes.draw do
#   get '*path',
#       to: 'fallback#index',
#       constraints: ->(req) { !req.xhr? && req.format.html? }
# end