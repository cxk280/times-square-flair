Rails.application.routes.draw do
  root 'welcome#index'

  # get '/signs', to: 'signs#index'
  # post '/signs', to: 'signs#create'

  resources :signs

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
