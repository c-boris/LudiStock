class User < ApplicationRecord
  after_create :welcome_send
  
  devise :database_authenticatable, :registerable,
         :recoverable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist

  has_many :listings, dependent: :destroy

  validates :username, presence: true, allow_blank: true
  validates :email, presence: true
  validates :password, presence: true, length: { minimum: 6 }, confirmation: true

  def welcome_send
    UserMailer.welcome_email(self).deliver_now
  end
end
