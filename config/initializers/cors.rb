Rails.application.config.middleware.insert_before 0, Rack::Cors do
  
  allow do
    origins '*'
    # origins Rails.env.development? ? 'http://localhost:3000' : 'https://ludistock-95072edabbd0.herokuapp.com'

    resource '*',
             headers: %w[Authorization],
             methods: %i[get post put patch delete options head],
             expose: %w[Authorization Uid]
             #max_age: 600
  end
end
