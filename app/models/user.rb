class User < ApplicationRecord
  after_create :welcome_send
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        #  :recoverable, :rememberable, :validatable,
         :jwt_authenticatable,
         jwt_revocation_strategy: JwtDenylist
  #  validates :email, presence: true
  has_many :properties

  validates :username, uniqueness: { case_sensitive: false }, allow_blank: true

  # attr_accessor :login
  # validates :admin, inclusion: { in: [true, false] }
  
  def welcome_send
    UserMailer.welcome_email(self).deliver_now
  end

end