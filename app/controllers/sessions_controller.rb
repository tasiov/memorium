class SessionsController < ApplicationController
	skip_before_action :redirect_unless_loggedin

	# Redirects user to their show page if they try to retreat back to the login page
	def login
		if @current_user != nil
			redirect_to user_path(@current_user.id)
		end
	end

	# Removes user session, and sends them back to the login page
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
