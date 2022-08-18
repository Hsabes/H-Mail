class User < ApplicationRecord

    has_many :sent_emails, class_name: "Email", foreign_key: "sender_id", dependent: :destroy
    has_many :recipients, through: :sent_emails, dependent: :destroy

    has_many :received_emails, class_name: "Email", foreign_key: "recipient_id", dependent: :destroy
    has_many :senders, through: :received_emails, dependent: :destroy

    validates :email, uniqueness: true
    validates :email, uniqueness: { case_sensitive: false }
    validates :email, length: { minimum: 13, maximum: 25 }
    validates_format_of :email, with: /\b[A-Z0-9._%a-z\-]+@hmail\.com\z/
    # custom example on front end text field instead of error ("example@hmail.com")

    validates :username, uniqueness: true

    has_secure_password
    validates :password, length: { minimum: 3 }

end
