require 'sqlite3'
require 'httparty'
require 'securerandom'
require 'sinatra/cookies'

class Site < Sinatra::Base
    Dotenv.load
    enable :sessions
    # set :cookie_options, :domain => 'localhost:9292'
    register Sinatra::Contrib
    set :protection, false


    before do 
        @db = SQLite3::Database.new("./db/database.db")
        @db.results_as_hash = true

        headers 'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => ['OPTIONS','GET','POST']
        @user_token = session[:user_token]
    end


    get '/' do
        if @user_token != nil
            response = HTTParty.get("https://api.github.com/user/repos", headers: {"Authorization" => "Bearer #{@user_token}"})
            @repos = JSON.parse(response.body)
            puts @repos
        else
            @repos = []
        end

        slim :index
    end

    get '/user/:user/:repo' do
        slim :repoview
    end

    get '/user/logout' do
        session.delete(:user_token)
        redirect back
    end

    get '/user/callback' do
        ## Ev måste vara post för säkerhetsskäl

        
        content_type :json
        code = params[:code]
        
        response = HTTParty.post('https://github.com/login/oauth/access_token',
        { body:
        { client_id: ENV['CLIENT_ID'],
        client_secret: ENV['CLIENT_SECRET'],
        code: code },
        headers: { accept: 'application/json' } })
        puts "häör ###############", response, code
        session[:user_token] = JSON.parse(response.body)['access_token']

        redirect '/'
    end

    # post '/api/user-repos' do
    #    @user_token
    # end

    get '/forks/:user/:repo' do
        # content_type :json

        response = HTTParty.get("https://api.github.com/repos/#{params[:user]}/#{params[:repo]}/forks", headers: {"Authorization" => "Bearer #{@user_token}"})
        puts "####", response, "####"
        return response.body
    end

    get '/search/:search' do
        content_type :json
        # return params[:searchcontent]

        response = HTTParty.get("https://api.github.com/users/#{params[:search]}/repos", headers: {"Authorization" => "Bearer #{@user_token}"})
        return response.body
    end

    post '/manifest' do
        content_type :json
        data = JSON.parse(request.body.read)

        response = HTTParty.get("https://api.github.com/repos/#{data['fullname']}/contents/.manifest.json", headers: {"Authorization" => "Bearer #{@user_token}"})
                
        return response.body
    end

    post '/filecontent' do
        content_type :json
        data = JSON.parse(request.body.read)

        response = HTTParty.get("https://api.github.com/repos/#{data['fullname']}/contents/#{data['filePath']}", headers: {"Authorization" => "Bearer #{@user_token}"})
        return response.body
    end
end
    
