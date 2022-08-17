class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :username, :profile_picture, :sent_emails, :received_emails, :password_digest
end
