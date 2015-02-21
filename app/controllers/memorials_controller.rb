class MemorialsController < ApplicationController
  before_action :set_memorial, only: [:show, :edit, :update, :destroy]

  def index
  	@memorial = Memorial.all
  end

  def new
  	@memorial = Memorial.new
  end

  def show
  end

  def edit
  end

  def create
  	@memorial = Memorial.new(memorial_params)

  	respond_to do |format|
  		if @product.save
  			format.html {redirect_to @memorial, notice: 'Product was successfully created.' }
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
        format.html { redirect_to @memorial, notice: 'Product was successfully updated.' }
        format.json { render :show, status: :ok, location: @memorial }
      else
        format.html { render :edit }
        format.json { render json: @memorial.errors, status: :unprocessable_entity }
      end
    end
  end

  private
   # Use callbacks to share common setup or constraints between actions.
  	def set_memorial
    	@memorial = Memorial.find(params[:id])
  	end

  	# Never trust parameters from the scary internet, only allow the white list through.
  	def memorial_params
    	params.require(:memorial).permit()
  	end
end
