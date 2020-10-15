
require 'sqlite3'
class Site < Sinatra::Base
    Dotenv.load
    enable :sessions

    before do 
        @db = SQLite3::Database.new("./db/database.db")
        @db.results_as_hash = true
    end

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

    get '/api/user-repos' do
        
    end
end
    
