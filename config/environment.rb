require_relative "application"


ActionMailer::Base.smtp_settings =   {
  :address            => 'smtp.gmail.com',
  :port               => 587,
  :domain             => 'gmail.com', #you can also use google.com
  :authentication     => :plain,
  :user_name          => ENV['GMAIL_LOGIN'],
  :password           => ENV['GMAIL_USER_PASSWORD']
}

# ActionMailer::Base.smtp_settings = {
#   user_name: Rails.application.credentials.gmail.email ,
#   password:  Rails.application.credentials.gmail.password,
#   domain: 'ludystock.fr',
#   address: 'smtp.gmail.com',
#   port: 587,
#   authentication: :plain,
#   enable_starttls_auto: true
# }
# Initialize the Rails application.
Rails.application.initialize!


# Port SMTP Gmail (TLS) : 587
# Port SMTP Gmail (SSL) : 465