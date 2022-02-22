  json.array! @training do |filter|
    json.id filter.id
    json.training_title filter.training_title
    json.image url_for(filter.image4)
    json.stretch filter.stretch
    json.muscle_training filter.muscle_training
    json.stability filter.stability
  end



    