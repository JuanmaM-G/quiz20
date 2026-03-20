from flask import Flask, request, jsonify, session
from flask_session import Session
from flask_cors import CORS
import mysql.connector
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)
app.secret_key = 'clave_secreta'
app.config['SESSION_TYPE'] = 'filesystem'
Session(app)
CORS(app)

db_config = {
    'host': 'localhost',
    'user': 'Juan',
    'password': 'quiz_viernes20',
    'database': 'QUIZ'
}

def get_db_connection():
    return mysql.connector.connect(**db_config)


@app.route('/api/registro', methods=['POST'])
def registro():
    data = request.get_json()

    nombre    = data.get('Nombre')
    documento = data.get('Documento')
    telefono  = data.get('Telefono')
    password  = data.get('Password')

    if not all([nombre, documento, password]):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    password_hash = generate_password_hash(password)

    try:
        conn   = get_db_connection()
        cursor = conn.cursor()

        cursor.execute('SELECT ID_usuario FROM usuario WHERE Documento = %s', (documento,))
        if cursor.fetchone():
            return jsonify({'error': 'El documento ya está registrado'}), 409

        cursor.execute(
            'INSERT INTO usuario (Nombre, Documento, Telefono, Password_hash) VALUES (%s, %s, %s, %s)',
            (nombre, documento, telefono, password_hash)
        )
        conn.commit()
        return jsonify({'message': 'Usuario registrado correctamente'}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()


@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()

    documento = data.get('Documento')
    password  = data.get('Password')

    if not all([documento, password]):
        return jsonify({'error': 'Faltan campos obligatorios'}), 400

    try:
        conn   = get_db_connection()
        cursor = conn.cursor(dictionary=True)

        cursor.execute('SELECT * FROM usuario WHERE Documento = %s', (documento,))
        usuario = cursor.fetchone()

        if not usuario or not check_password_hash(usuario['Password_hash'], password):
            return jsonify({'error': 'Credenciales incorrectas'}), 401

        session['ID_usuario'] = usuario['ID_usuario']
        session['Nombre']     = usuario['Nombre']

        return jsonify({'message': 'Sesión iniciada correctamente'}), 200

    except Exception as e:
        return jsonify({'error': str(e)}), 500

    finally:
        cursor.close()
        conn.close()


if __name__ == '__main__':
    app.run(debug=True)