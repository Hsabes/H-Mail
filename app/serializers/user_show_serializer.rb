class UserShowSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers

  attributes :id, :email, :name, :username, :sent_emails, :received_emails, :password_digest, :avatar

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end

end
