class ProjectsController < ApplicationController
  before_action :set_project, only: [:show, :edit, :update, :destroy]
  before_filter :authorize
  respond_to :json

  def index
    @projects = Project.all
    respond_with @projects
  end

  def edit
    @users = User.all
    respond_with [@project, @users], root: false
  end

  def create
    @project = Project.new project_params
    @project.save
    respond_with @project
  end

  def update
    @project.update project_params
    respond_with @project
  end

  def destroy
    @project.destroy
    respond_with @project
  end

  private
  def set_project
    @project = Project.find(params[:id])
  end

  def project_params
    params.merge(assignments_attributes: params[:assignments_attributes]) unless params[:assignments_attributes].nil?
    params.require(:project).permit(:name, :description, :company)
  end
end
