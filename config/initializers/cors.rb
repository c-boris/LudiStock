Rails.application.config.middleware.insert_before 0, Rack::Cors do
  allow do
    origins '*'
    # origins 'http://localhost:3000'
    #origins 'https://ludistock-95072edabbd0.herokuapp.com', 'http://localhost:3000'

    resource '*',
             headers: %w[Authorization],
             methods: %i[get post put patch delete options head],
             expose: %w[Authorization]
             #max_age: 600
  end

end
# Rails.application.config.middleware.insert_before 0, Rack::Cors do
#   allow do
#     origins 'http://127.0.0.1:3000' # Spécifiez l'origine correcte de votre application front-end
#     resource '*',
#              headers: %w[Authorization],
            #  headers: :any,
#              methods: %i[get post put patch delete options head],
#              expose: %w[Authorization],
#              credentials: true
#   end
# end
