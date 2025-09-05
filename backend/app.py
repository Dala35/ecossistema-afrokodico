from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Permite que o frontend acesse a API

# Dados mock (simulados) para demonstração.
# Estes dados viriam do banco de dados na implementação final.
dados_previsao = {
    "periodo": "Julho 2025 - Julho 2026",
    "pontos_chave": [
        {"fase": "Cacimbo (Jul-Set)", "descricao": "Estação seca rigorosa. Preparar reservas hídricas."},
        {"fase": "Início das Chuvas (Out-Nov)", "descricao": "Monitorar de perto o real início. Risco de falsos inícios."},
        {"fase": "Pico das Chuvas (Dez-Mar)", "descricao": "Alta intensidade de precipitação, especialmente no Norte e Interior."},
    ]
}

guias_mock = [
    {"id": "guia-huambo", "titulo": "Guia Agro-Huambo", "provincia": "Huambo", "thumbnail": "/assets/placeholder.png"},
    {"id": "guia-bie", "titulo": "Guia Agro-Bié", "provincia": "Bié", "thumbnail": "/assets/placeholder.png"},
    {"id": "guia-uige", "titulo": "Guia Agro-Uíge", "provincia": "Uíge", "thumbnail": "/assets/placeholder.png"}
]

# Endpoint para a previsão climática geral
@app.route('/api/clima/previsao', methods=['GET'])
def get_previsao():
    return jsonify({"status": "success", "data": dados_previsao})

# Endpoint para listar todos os guias
@app.route('/api/guias', methods=['GET'])
def get_guias():
    return jsonify({"status": "success", "data": guias_mock})

# Endpoint para obter um guia específico (semelhante ao que virá do banco de dados)
@app.route('/api/guias/<string:guia_id>', methods=['GET'])
def get_guia(guia_id):
    for guia in guias_mock:
        if guia['id'] == guia_id:
            return jsonify({"status": "success", "data": guia})
    return jsonify({"status": "error", "mensagem": "Guia não encontrado"}), 404

# Endpoint para submissões de contacto
@app.route('/api/contacto', methods=['POST'])
def enviar_contacto():
    data = request.json
    nome = data.get('nome')
    email = data.get('email')
    mensagem = data.get('mensagem')

    # A lógica para salvar no banco de dados viria aqui
    print(f"Nova mensagem recebida de: {nome}, Email: {email}")
    print(f"Mensagem: {mensagem}")

    return jsonify({"status": "success", "mensagem": "A sua mensagem foi enviada com sucesso!"})

if __name__ == '__main__':
    # O seu IP local, pode ser diferente dependendo da sua rede.
    # Pode usar 0.0.0.0 para acesso público se o seu firewall permitir.
    app.run(host='127.0.0.1', port=5000, debug=True)


