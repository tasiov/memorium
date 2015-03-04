class CommentsController < ApplicationController
  def create
  	@comment = @current_user.comments.new(comment_params)
  	@comment.save
  	#@user = @current_user
    render layout: false
  end

  private
  def comment_params
    params.require(:comment).permit(:message, :memorial_id)
  end
end
