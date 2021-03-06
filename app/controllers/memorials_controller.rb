class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :edit, :update, :destroy, :timeline, :picturecreate, :edit_picture]
  before_action :set_user, only: [:create, :new, :index, :show, :timeline, :picturecreate]
  before_action :set_picture, only: [:picturedestroy]

  def index
  	@memorials = @user.memorials.all
  end

  def new
  	@memorial = Memorial.new
  end

  def show
    @check_privilege = MemorialUser.where(user_id: @user.id, memorial_id: @memorial.id).first
    redirect_to user_path(@user.id) if @check_privilege == nil
    @users = User.search params[:search]
    @comment = @memorial.comments.new
  end

  def timeline
    @pictures = @memorial.pictures.where(page: 'timeline')
    @picture = Picture.new
  end

  def picturecreate
    @picture = @memorial.pictures.new(picture_params)

    respond_to do |format|
      if @memorial.save
        format.html { redirect_to user_memorial_timeline_path(@user.id, @memorial.id), notice: 'Product was successfully created.' }
      else
        format.html { render :timeline }
      end
    end
  end

  def picturedestroy
    @picture.destroy
    respond_to do |format|
      format.html { redirect_to :back, notice: "Picture was successfully destroyed."}
      format.json { head :no_content }
    end
  end

  def get_memorial_user
    @memorial_user = MemorialUser.all
  end

  def edit
  end

  def edit_picture
    respond_to do |format|
      if @memorial.update(memorial_params)
        format.html { redirect_to user_memorial_path, notice: 'Memorial was successfully updated.' }
        format.json { render json: @memorial}
      end
    end
  end


  def create

    @memorial = @user.memorials.new(memorial_params)

  	respond_to do |format|
  		if @user.save
          @memorial_user = @user.memorial_users.find_by_memorial_id(@memorial.id)
          @memorial_user.role = "creator"
          @memorial_user.save

  			  format.html { redirect_to user_memorial_path(@user.id, @memorial.id), notice: 'Product was successfully created.' }
        	format.json { render :show, status: :created, location: @memorial }
    	else
        	format.html { render :new }
        	format.json { render json: @memorial.errors, status: :unprocessable_entity }
    	end
    end
  end

  def update
    respond_to do |format|
      if @memorial.update(memorial_params)
        format.html { redirect_to user_memorial_path, notice: 'Memorial was successfully updated.' }
        format.json { render :show, status: :ok, location: @memorial }
      else
        format.html { render :edit }
        format.json { render json: @memorial.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @memorial.destroy
    respond_to do |format|
      format.html { redirect_to memorials_url, notice: "Memorial was successfully destroyed."}
      format.json { head :no_content }
    end
  end

  private
   # Use callbacks to share common setup or constraints between actions.
  	def set_memorial
    	@memorial = Memorial.find(params[:id])
  	end

    def set_user
      @user = User.find(params[:user_id])
    end

    def set_picture
      @picture = Picture.find(params[:id])
    end

  	# Never trust parameters from the scary internet, only allow the white list through.
  	def memorial_params
    	params.require(:memorial).permit(:title, :name, :description, :birth_date, :death_date, :path, :crop_top, :crop_left, :crop_width)
  	end

    def picture_params
      params.require(:picture).permit(:date, :path, :caption, :description, :page)
    end
end
