class User < ApplicationRecord

    has_one_attached :avatar

    has_many :sent_emails, class_name: "Email", foreign_key: "sender_id", dependent: :destroy
    has_many :recipients, through: :sent_emails, dependent: :destroy

    has_many :received_emails, class_name: "Email", foreign_key: "recipient_id", dependent: :destroy
    has_many :senders, through: :received_emails, dependent: :destroy

    validates :email, uniqueness: true
    validates :email, uniqueness: { case_sensitive: false }
    validates :email, length: { minimum: 13, maximum: 25 }, on: :update, if: :should_validate_email?
    validates :email, length: { minimum: 13, maximum: 25 }, on: :create
    validates_format_of :email, with: /\b[A-Z0-9._%a-z\-]+@hmail\.com\z/

    validates :username, uniqueness: true

    has_secure_password
    validates :password, length: { minimum: 3 }, on: :update, if: :should_validate_password?
    validates :password, length: { minimum: 3 }, on: :create

    private

    def should_validate_password?
        password.present?
    end

    def should_validate_email?
        email.present?
    end

end