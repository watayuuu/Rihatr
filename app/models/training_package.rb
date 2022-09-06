class TrainingPackage < ApplicationRecord
  has_many :training
  belongs_to :package
end
