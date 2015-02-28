class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :edit, :update, :destroy]
  before_action :set_user, only: [:create, :new, :index, :show, :timeline]

  def index
  	@memorials = @user.memorials.all
  end

  def new
  	@memorial = Memorial.new
  end

  def show
    @users = User.search params[:search]
  end

  def timeline

  end

  def edit
  end

  def create

    @memorial = @user.memorials.new(memorial_params)

  	respond_to do |format|
  		if @user.save
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
        format.html { redirect_to @memorial, notice: 'Memorial was successfully updated.' }
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

  	# Never trust parameters from the scary internet, only allow the white list through.
  	def memorial_params
    	params.require(:memorial).permit(:title, :name, :description, :birth_date, :death_date)
  	end
end
