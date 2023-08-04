from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_cors import CORS

def fk_connect(conn,conn_record):
    conn.execute("PRAGMA foreign_keys='ON'")

app=Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"]="sqlite:///app.db"
db=SQLAlchemy(app)
migrate=Migrate(app,db)
CORS(app)



