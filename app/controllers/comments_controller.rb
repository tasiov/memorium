class CommentsController < ApplicationController
  before_action :set_comment, only: [:destroy]

  def create
    p "hello"
  	@comment = @current_user.comments.new(comment_params)
  	@comment.save
  	#@user = @current_user
    render layout: false
  end

  def destroy
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: "Comment was successfully destroyed."}
      format.json { head :no_content }
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:message, :memorial_id, :path)
  end

  def set_comment
      @comment = Comment.find(params[:id])
  end
end
