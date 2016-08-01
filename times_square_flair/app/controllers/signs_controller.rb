class SignsController < ApplicationController

  # Much help from Rafa's Happy Pets tutorial for this controller. Also help from students_app lesson
  def index
    render json: Sign.all.to_json
  end

  def show
    render :json => Sign.find(params[:id])
  end

  def create
    my_sign = {'name': params['name'], 'sqfootage': params['square-footage'].to_i, 'address': params['address']}
    Sign.create my_sign
    render :json => Sign.last
  end

  # def edit
  #   render :json => Sign.find(params[:id])
  # end

  # def update
  #   my_sign = {name: params[:name], square-footage: params[:square-footage].to_i, address: params[:address]}
  #   Sign.find(params[:id]).update my_sign
  #   render :json => my_sign
  # end

  def destroy
    my_sign = Sign.find(params[:id])
    my_sign.destroy
  end

end
