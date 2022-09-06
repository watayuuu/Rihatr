class CreateTrainingPackages < ActiveRecord::Migration[6.0]
  def change
    create_table :training_packages do |t|
      t.references :training, null: false,foreign_key: true
      t.references :package, null: false,foreign_key: true
      t.timestamps
    end
  end
end
