Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    #origins 'https://immotep.vercel.app/', 'http://localhost:3001'

    resource '*',
             headers: %w[Authorization],
             methods: %i[get post put patch delete options head],
             expose: %w[Authorization]
             #max_age: 600
  end
end