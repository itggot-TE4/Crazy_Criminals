require 'sqlite3'
require 'httparty'
class Site < Sinatra::Base
    Dotenv.load
    enable :sessions

    before do 
        @db = SQLite3::Database.new("./db/database.db")
        @db.results_as_hash = true

        headers 'Access-Control-Allow-Origin' => '*',
                'Access-Control-Allow-Methods' => ['OPTIONS','GET','POST']
    end

    set :protection, false

    get '/' do
        slim :index
    end

    get '/user/:user/:repo' do
        slim :repoview
    end

    get '/users/login' do
        #Shows the login form

        slim :"user/login"
    end

    post '/users/login' do
        #Executes login form

        username = params[:name]
        login_pasword = params[:password]
        user = @db.execute('SELECT * FROM users WHERE name = ?;', username).first
        
        #Compares passwords and redirects based upon if they're equal
        if BCrypt::Password.new(user['password']) == login_pasword
            session[:user_id] = user['id']
            redirect '/'
        else
            redirect back
        end
    end

    post '/api/user-repos' do
       token = ENV['PRIVATE_TOKEN'] 
    end

    post '/forks/:user/:repo' do
        content_type :json
        headers = { 
            "Authorization" => "token #{ENV['PRIVATE_TOKEN']}"
        }
        response = HTTParty.get("https://api.github.com/repos/#{params[:user]}/#{params[:repo]}/forks", :headers => headers)
        # puts response
        return response.body
    end

    get '/search/:search' do
        content_type :json
        # return params[:searchcontent]

        headers = { 
            "Authorization" => "token #{ENV['PRIVATE_TOKEN']}"
        }
        response = HTTParty.get("https://api.github.com/users/#{params[:search]}/repos", :headers => headers)
        return response.body
    end
end
    
