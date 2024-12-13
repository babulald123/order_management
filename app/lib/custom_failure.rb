class CustomFailure < Devise::FailureApp
  def respond
    debugger
    if request.env['REQUEST_PATH'].start_with?('/api')
      http_auth
    else
      redirect
    end
  end

  private

  def json_error_response
    self.status = 401
    self.content_type = 'application/json'
    self.response_body = { status: 401, message: "Invalid Email or password." }.to_json
  end
end
