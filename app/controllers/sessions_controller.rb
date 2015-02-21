class SessionsController < ApplicationController
	skip_before_action :redirect_unless_loggedin

	def login
	end

	def logout
		session[:user_id] = nil
		redirect_to :login
		flash[:notice] = "You have succesfully logged out of the system."
	end

	def verify
		user = User.find_by(email: params[:email], password: params[:password])
		if user
			session[:user_id] = user.id
			redirect_to user_path(user.id)
		else
			redirect_to :login
			flash[:notice] = "Invalid e-mail/password combination. Please try again."
		end
	end
end
