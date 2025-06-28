from flask import Flask, request, jsonify, send_from_directory
import sqlite3
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

app = Flask(__name__)

DATABASE = 'estoque.db'

def get_db_connection():
    conn = sqlite3.connect(DATABASE)
    conn.row_factory = sqlite3.Row
    return conn

@app.route('/')
def index():
    return send_from_directory('.', 'index.html')

@app.route('/style.css')
def style():
    return send_from_directory('.', 'style.css')

@app.route('/script.js')
def script():
    return send_from_directory('.', 'script.js')

@app.route('/produtos', methods=['GET'])
def listar_produtos():
    conn = get_db_connection()
    produtos = conn.execute('SELECT * FROM produtos').fetchall()
    conn.close()
    return jsonify([dict(p) for p in produtos])

@app.route('/produtos', methods=['POST'])
def adicionar_produtos():
    data = request.get_json()
    nome = data['nome']
    quantidade = data['quantidade']
    tipo = data['tipo']
    agora = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    conn = get_db_connection()
    conn.execute(
        'INSERT INTO produtos (nome, quantidade, tipo, criado_em, atualizado_em) VALUES (?, ?, ?, ?, ?)',
        (nome, quantidade, tipo, agora, agora)
    )
    conn.commit()
    conn.close()
    return jsonify({'status': 'ok'})

@app.route('/produtos/<int:produto_id>/quantidade', methods=['PUT'])
def atualizar_quantidade(produto_id):
    data = request.get_json()
    adicionar = data['quantidade']
    agora = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    conn = get_db_connection()
    conn.execute(
        'UPDATE produtos SET quantidade = quantidade + ?, atualizado_em = ? WHERE id = ?',
        (adicionar, agora, produto_id)
    )
    conn.commit()
    conn.close()
    return jsonify({'status': 'ok'})

@app.route('/produtos/<int:produto_id>', methods=['DELETE'])
def deletar_produtos(produto_id):
    conn = get_db_connection()
    conn.execute('DELETE FROM produtos WHERE id = ?', (produto_id,))
    conn.commit()
    conn.close()
    return jsonify({'status': 'ok'})

if __name__ == '__main__':
    app.run(debug=True)



# Register
@app.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Usuário ou senha incorretos.'}), 400


    password_hash = generate_password_hash(password)
    criado_em = datetime.now().strftime("%d/%m/%Y %H:%M:%S")

    try:
        conn = get_db_connection()
        conn.execute(
            'INSERT INTO users (username, password_hash, criado_em) VALUES (?, ?, ?)',
            (username, password_hash, criado_em)
        )
        conn.commit()
        conn.close()
        return jsonify({'status': 'Usuário criado com sucesso!'})
    except sqlite3.IntegrityError:
        return jsonify({'error': 'Usuário já existente.'}), 400


# Login
@app.route('/login', methods=['POST'])
def login ():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'error': 'Usuário ou senha incorretos.'}), 400

    conn = get_db_connection()
    user = conn.execute('SELECT * FROM users WHERE username = ?', (username,)).fetchone()
    conn.close()

    if user and check_password_hash(user['password_hash'], password):
        return jsonify({'status': 'ok'})
    else:
        return jsonify({'error': 'Usuário ou senhas incorretos.'}), 401



