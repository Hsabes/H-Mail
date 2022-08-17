class SessionsController < ApplicationController
    # skip_before_action :authenticate_user, only: [:create]
    
    # POST '/login'
    def create
      user = User.find_by(email: params[:email])
      if user&.authenticate(params[:password])
        session[:user_id] = user.id
        render json: user, status: :ok
      else
        render json: "Invalid Credentials", status: :unauthorized
      end
    end
  
    # DELETE '/logout'
    def destroy
      session.delete(:user_id)
    end
  
    # get logged in user's object
    # GET '/me'
    def show
      user = User.find(session[:user_id])
      render json: user, serializer: UserShowSerializer, status: :ok
    end
  end