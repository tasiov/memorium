class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :get_user
  before_action :redirect_unless_loggedin, except: [:new, :create]

  # This method is called by root. Sends user to their show
  # page if they are already logged in.
  def send_user_to_home
    if @current_user != nil
      redirect_to user_path(@current_user.id)
    end
  end

  # Gets the user of the current session
  def get_user
  	if session[:user_id]
  		@current_user = User.find(session[:user_id])
  	else
  		@current_user = nil
  	end
  end

  # Sends user to login page if they are not already logged in
  def redirect_unless_loggedin
      redirect_to login_path unless @current_user
  end
end
