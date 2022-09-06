class Package < ApplicationRecord
  belongs_to :user
  has_many :training_packages
  has_many :trainings,through: :training_packages
end
