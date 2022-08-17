class EmailSerializer < ActiveModel::Serializer
  attributes :id, :subject, :body, :file, :saved, :deleted, :read
  has_one :recipient
  has_one :sender
end
