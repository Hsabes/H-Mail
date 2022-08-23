class UsersController < ApplicationController
    # skip_before_action :authenticate_user

    def index
        users = User.all
        render json: users, status: :ok
    end

    def show
        user = User.find(params[:id])
        render json: user, serializer: UserShowSerializer, status: :ok
    end

    def create
        user = User.create!(user_params)
        session[:user_id] = user.id
        render json: user, status: :created
    end

    def update
        user = User.find(params[:id])
        user.update!(user_params)
        render json: user, status: :accepted
    end

    def destroy
        user = User.find(params[:id])
        user.destroy
        head :no_content
    end

    private
    # ERRORS FOR INVALID AND RECORD NOT FOUND ARE IN APP CONTROLLER
    def user_params
        params.permit(:email, :name, :username, :password)
    end

end
