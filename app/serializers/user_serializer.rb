class UserSerializer < ActiveModel::Serializer
  attributes :id, :email, :name, :username, :profile_picture
end
