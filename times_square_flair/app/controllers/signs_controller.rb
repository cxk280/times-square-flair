class SignsController < ApplicationController

  # Much help from Rafa's Happy Pets tutorial for this controller. Also help from students_app lesson
  def index
    render json: Sign.all.to_json
  end


  def create
    puts params
    new_sign = {name: params[:name], sqfootage: params[:sqfootage].to_i, address: params[:address]}
    if new_sign.valid?
      new_sign.save
      head 204
    else
      head 422
    end
  end

end
