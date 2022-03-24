class PackageController < ApplicationController
  before_action :move_to_index

  def index
    @training =Training.all
    @counts =Training.count
  end

  def new
    @package = Package.new
  end

  def create
    @package = Package.new(package_params)
    if @package.save
      redirect_to  packageall_package_index_path
    else
      render :new
    end
  end

  def packageall
    @packageall = Package.all
    @counts =Package.count
  end


  private
  def package_params
    params.permit(:package_title,:package_id,:package1_id,:package2_id,:package3_id).merge(user_id: current_user.id)

    # params.permit(:package_title).merge(user_id: current_user.id,package_id:training.id,package1_id: training.id,package2_id:training.id,package3_id:training.id)
  end

  def move_to_index
    unless user_signed_in?
      redirect_to menu_index_path
    end
  end
end
