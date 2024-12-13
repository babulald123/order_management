class ApplicationController < ActionController::API
	rescue_from StandardError do
		respond_to do |type|
			type.all  { render nothing: true, status: 404 }
		end
	end
end
