from flask import Flask, flash, redirect, url_for, render_template, request, session
import mysql.connector
from flask_session import Session
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'clave_secreta'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)

db_config = {
    'host': 'localhost',
    'user': 'Juan',
    'password': 'quiz_viernes20',
    'database': 'QUIZ'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)