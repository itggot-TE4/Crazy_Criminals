
class Site < Sinatra::Base
    Dotenv.load
    enable :sessions

    get '/' do
        slim :index
    end

    get '/:user/:repo' do
        slim :repoview
    end

end
    
