class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  before_action :get_user
  before_action :redirect_unless_loggedin, except: [:new, :create]


  def get_user
  	if session[:user_id]
  		@current_user = User.find(session[:user_id])
  	else
  		@current_user = nil
  	end
  end


  def redirect_unless_loggedin
      redirect_to root_path unless @current_user
  end
end
