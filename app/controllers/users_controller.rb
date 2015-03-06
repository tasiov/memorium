class UsersController < ApplicationController
  before_action :set_user, only: [:show, :edit, :update]
  before_action :redirect_unless_loggedin, except: [:new, :create]

  def index
    @users = User.all
    @memorial_users = MemorialUser.all
  end

  # GET /users/new
  def new
  	@user = User.new
  end

  # GET /users/1
  # GET /users/1.json
  def show
    @memorial = Memorial.new
  end

  # GET /users/1/edit
  def edit
    @user = User.find(params[:id])
  end

  def destroy
  end

  # POST /users
  # POST /users.json
  def create
    @user = User.new(user_params)

    respond_to do |format|
      if @user.save
        session[:user_id] = @user.id
        format.html { redirect_to user_path(@user.id), notice: 'User was successfully created.' }
        format.json { render :show, status: :created, location: @user }
      else
        format.html { render :new }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /users/1
  # PATCH/PUT /users/1.json
  def update
    respond_to do |format|
      if @user.update(user_params)
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render :show, status: :ok, location: @user }
      else
        format.html { render :edit }
        format.json { render json: @user.errors, status: :unprocessable_entity }
      end
    end
  end

  private
  # Use callbacks to share common setup or constraints between actions.
  def set_user
    @user = User.find(params[:id])
  end

  # Never trust parameters from the scary internet, only allow the white list through.
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email, :password, :path)
  end
end
