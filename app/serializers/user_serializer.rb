class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :username

  # def avatar
  #   rails_blob_path(object.avatar, only_path: true) if object.avatar.attached?
  # end

end