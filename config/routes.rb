Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
  root to: "top#index"
  resources :menu, only: [:index, :show,:new,:create,:preview] do
    collection do
      post 'preview'
      get  'search'
      get  'filter'
    end
  end
end
