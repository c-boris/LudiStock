require_relative "application"

ActionMailer::Base.smtp_settings = {
  user_name: Rails.application.credentials.gmail.email ,
  password:  Rails.application.credentials.gmail.password,
  domain: 'ludystock.fr',
  address: 'smtp.gmail.com',
  port: 587,
  authentication: :plain,
  enable_starttls_auto: true
}
# Initialize the Rails application.
Rails.application.initialize!


# Port SMTP Gmail (TLS) : 587
# Port SMTP Gmail (SSL) : 465