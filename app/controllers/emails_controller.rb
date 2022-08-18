class EmailsController < ApplicationController

    def show
        email = Email.find(params[:id])
        render json: email, status: :ok
    end 

    def create
        email = Email.create!(email_params)
        render json: email, status: :created
    end

    def destroy
        email = Email.find(params[:id])
        email.destroy
        head :no_content
    end

    private

    def email_params
        params.permit(:subject, :body, :file, :sender_id, :recipient_id)
    end

end

# A lot of emails sent and recieved, load only the ones for the specific tab that is opened
# (don't load all emails if you are in sent tab, only sent emails)

# GET ALL RECEIEVED EMAILS WHERE READ === FALSE
# /emails?status=read