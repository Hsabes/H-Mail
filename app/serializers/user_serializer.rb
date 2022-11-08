class UserSerializer < ActiveModel::Serializer

  include Rails.application.routes.url_helpers
  
  attributes :id, :email, :name, :username, :avatar

  def avatar
    rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  end

end