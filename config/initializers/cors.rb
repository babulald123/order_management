# config/initializers/cors.rb
Rails.application.config.middleware.insert_before 0, Rack::Cors do
	allow do
    origins 'http://localhost:3001'  # Frontend URL, change if different
    # origins 'http://localhost:5100'  # Frontend URL, change if different


    resource '*',
    headers: :any,
    methods: [:get, :post, :put, :patch, :delete, :options],
    credentials: true
  end
end
