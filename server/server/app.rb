
class Site < Sinatra::Base
    Dotenv.load
    enable :sessions

    get '/' do

        slim :index
    end

end
    
