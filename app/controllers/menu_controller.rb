class MenuController < ApplicationController

  def index
    @training =Training.all
    @counts =Training.count

  end

  def new
    @training = Training.new
  end

  def create
    @training = Training.new(training_params)
    if @training.save
      redirect_to new_menu_path
    else
      render :new
    end
  end

  def show
    @training = Training.find(params[:id])

    respond_to do |format|
      format.html
      format.js
    end
  end

  def destroy
    training = Training.find(params[:id])
    
    training.destroy
    redirect_to menu_index_path
  end


  def preview
    @name = params[:name]
    @frequency = training_frequency_information
    # binding.pry
    num = params[:tid],params[:tid1],params[:tid2],params[:tid3]
    tid = []
    for n in num
      tid.push(n.to_i)
    end
    tid.delete(0)
    if tid.present?
      @training = Training.where(id:[tid]).to_a
      # binding.pry
    else
      redirect_to menu_index_path
    end
  end

  def search
    @training = Training.where('mascle_name LIKE(?)', "%#{params[:mascle_search]}%") 

    # binding.pry
    respond_to do |format|
      format.html { redirect_to :root }
      format.json {}
    end
  end

  def filter
    sholder ='shoulder LIKE ?', "#{params[:sholderFilter]}"
    elbow ='elbow LIKE ?', "#{params[:elbowFilter]}"
    hand_fingers ='hand_fingers LIKE ?', "#{params[:handFilter]}"
    hip ='hip LIKE ?', "#{params[:hipFilter]}"
    knee ='knee LIKE ?', "#{params[:kneeFilter]}"
    ankle ='ankle LIKE ?', "#{params[:ankleFilter]}"
    front_trank ='front_trank LIKE ?', "#{params[:frontTrunkFilter]}"
    back_trank ='back_trank LIKE ?', "#{params[:backTrunkFilter]}"
    composite ='composite LIKE ?', "#{params[:compositeFilter]}"
    
    supine ='supine LIKE ?', "#{params[:supineFilter]}"
    prone ='prone LIKE ?', "#{params[:proneFilter]}"
    lateral ='lateral LIKE ?', "#{params[:lateralFilter]}"
    sitting ='sitting LIKE ?', "#{params[:sittingFilter]}"
    standing ='standing LIKE ?', "#{params[:standingFilter]}"
    fours ='fours LIKE ?', "#{params[:foursFilter]}"
    stretch ='stretch LIKE ?', "#{params[:stretchFilter]}"
    muscle_training ='muscle_training LIKE ?', "#{params[:muscle_trainingFilter]}"
    stability ='stability LIKE ?', "#{params[:stabilityFilter]}"


    

    @filter = Training.where(sholder). or Training.where(elbow). or Training.where(hand_fingers). or Training.where(hip). or Training.where(knee). or Training.where(ankle). or Training.where(front_trank). or Training.where(back_trank). or Training.where(composite).or Training.where(supine).or Training.where(prone).or Training.where(lateral).or Training.where(sitting).or Training.where(standing).or Training.where(fours).or Training.where(stretch).or Training.where(muscle_training).or Training.where(stability)

    respond_to do |format|
      format.html { redirect_to :root }
      format.json {}
    end
  end

  
  private
  def training_params
    params.require(:training).permit(:training_title, :mascle_name, :explanation,:step1_comment,:step2_comment,:step3_comment,:step4_comment, :image,:image1,:image2,:image3,:image4,:shoulder,:elbow,:hand_fingers,:hip,:knee,:ankle,:front_trank,:back_trank,:composite,:supine,:prone,:lateral,:sitting,:standing,:fours,:stretch,:muscle_training,:stability)
  end

  def training_frequency_information
    params.permit(:number,:frequency_select,:number1,:frequency_select1,:number2,:frequency_select2,:number3,:frequency_select3,:menu_number)
  end

end


