class CommentsController < ApplicationController
  def new
  	@comment = Comment.new(comment_params)
  	@comment.save
  	@user = @current_user
  end

  private
  def comment_params
    params.require(:comment).permit(:message, :created_at, :user_id, :memorial_id)
  end
end
