class UsersController < ApplicationController
  respond_to :js
  before_action :set_user, only: [:show, :edit, :update, :destroy]

  def index
    @users = User.all
    respond_with @users
  end

  def show
  end

  def new
    @user = User.new
  end

  def edit
  end

  def create
    @user = User.new user_params
    @user.save
    respond_with @user
  end

  def update
    @user.update user_params
    respond_with @user
  end

  def destroy
    @user.destroy
    respond_with @user
  end

  private
  def set_user
    @user = User.find(params[:id])
  end

  def user_params
    params.require(:user).permit(:name, :email, :password)
  end
end
