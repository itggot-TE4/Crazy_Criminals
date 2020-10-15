require 'sqlite3'
require 'bcrypt'

class Seeder
    def self.seed!
        puts "Seeding tables. Continue? (y/n)"
        answer = gets.chomp
        if answer.downcase != "y"
            return
        end

        puts "Connecting..."
        db = connect()
        puts "Dropping..."
        drop_tables(db)
        puts "Creating..."
        create_tables(db)
        puts "Populating..."
        populate_tables(db)
    end

    def self.connect()
       SQLite3::Database.new './database.db'
    end

    def self.drop_tables(db)
        db.execute('DROP TABLE IF EXISTS users;')
    end

    def self.create_tables(db)
        db.execute('CREATE TABLE "users" (
            "id"    INTEGER NOT NULL UNIQUE,
            "name"  TEXT NOT NULL UNIQUE,
            "password"  TEXT NOT NULL,
            PRIMARY KEY("id" AUTOINCREMENT  )
        )')
    end


    def self.populate_tables(db)
        users = [
            {name: "Stefan", password: BCrypt::Password.create('123')},
            {name: "Johan", password: BCrypt::Password.create('123')},
            {name: "Kalle", password: BCrypt::Password.create('123')}
        ]

        users.each do |u|
            db.execute("INSERT INTO users (name, password) VALUES(?,?);", u[:name], u[:password])
        end
    end
end

Seeder.seed!