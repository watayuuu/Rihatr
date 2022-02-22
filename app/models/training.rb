class Training < ApplicationRecord
  extend ActiveHash::Associations::ActiveRecordExtensions
  has_one_attached :image
  has_one_attached :image1
  has_one_attached :image2
  has_one_attached :image3
  has_one_attached :image4

  validates :training_title, :mascle_name, :explanation, :step1_comment, :step2_comment, :step3_comment, :step4_comment,presence: true
  validates :joint_filter, :position_filter, :training_filter, presence: true

  private
    def joint_filter
      shoulder.presence or elbow.presence or hand_fingers.presence or hip.presence or knee.presence or ankle.presence or front_trank.presence or back_trank.presence or composite.presence 
    end

    def position_filter
      supine.presence or prone.presence or lateral.presence or sitting.presence or standing.presence or fours.presence
    end

    def training_filter
      stretch.presence or muscle_training.presence or stability.presence
    end
  # belongs_to :training_category,:position_category,:tool_category,:video_category
  # validates :training_category,:position_category,:tool_category,:video_category, numericality: { other_than: 1 } 

end



