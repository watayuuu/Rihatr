class CreateTrainings < ActiveRecord::Migration[6.0]
  def change
    create_table :trainings do |t|
      t.string :training_title, null: false
      t.string :mascle_name,    null: false
      t.text   :explanation,    null: false
      t.text   :step1_comment,  null: false
      t.text   :step2_comment,  null: false
      t.text   :step3_comment,  null: false
      t.text   :step4_comment,  null: false
      t.boolean :shoulder
      t.boolean :elbow 
      t.boolean :hand_fingers
      t.boolean :hip
      t.boolean :knee
      t.boolean :ankle
      t.boolean :front_trank
      t.boolean :back_trank
      t.boolean :composite
      t.boolean :supine
      t.boolean :prone
      t.boolean :lateral
      t.boolean :sitting
      t.boolean :standing
      t.boolean :fours
      t.boolean :stretch
      t.boolean :muscle_training
      t.boolean :stability


      t.timestamps
    end
  end
end
