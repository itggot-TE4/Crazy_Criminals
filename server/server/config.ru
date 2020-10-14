
require 'sinatra/base'
require 'bundler'
require 'json'

Bundler.require

require_relative 'app'

run Site
    
