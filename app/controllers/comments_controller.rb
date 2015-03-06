class CommentsController < ApplicationController
  before_action :set_comment, only: [:destroy]

  def create
  	@comment = @current_user.comments.new(comment_params)
  	@comment.save
    if @comment.path.url != nil
      redirect_to :back
    else
      render layout: false
    end
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
