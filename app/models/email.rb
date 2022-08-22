class Email < ApplicationRecord
  
  belongs_to :recipient, class_name: "User", foreign_key: "recipient_id"
  belongs_to :sender, class_name: "User", foreign_key: "sender_id"

  validates :recipient_id, presence: true
  validates :sender_id, presence: true
  validates :subject, presence: true, length: { minimum: 1 }

end
