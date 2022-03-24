Rails.application.routes.draw do
  devise_for :users
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "top#index"

  resources :menu, only: [:index, :show,:new,:create,:preview,:destroy] do
    collection do
      post 'preview'
      get  'search'
      get  'filter'
    end
  end
  resources :package, only: [:index,:new,:create] do
    collection do
      get 'packageall'
    end
  end


end
