-- Estrutura da base de dados para o Ecossistema Afrokódico

-- Tabela para guardar informações básicas sobre as províncias
CREATE TABLE provincias (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255) NOT NULL,
    lat DECIMAL(10, 8),
    lng DECIMAL(11, 8)
);

-- Tabela para armazenar dados de previsão e observações climáticas
CREATE TABLE previsao_clima (
    id INT PRIMARY KEY AUTO_INCREMENT,
    provincia_id INT,
    data_previsao DATE NOT NULL,
    precipitacao_mm DECIMAL(5, 2),
    temperatura_min DECIMAL(4, 2),
    temperatura_max DECIMAL(4, 2),
    humidade DECIMAL(5, 2),
    evento_clima VARCHAR(255),
    FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

-- Tabela para conter o conteúdo dos guias agrícolas
CREATE TABLE guias_agricolas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    titulo VARCHAR(255) NOT NULL,
    provincia_id INT,
    conteudo_html TEXT,
    data_criacao TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (provincia_id) REFERENCES provincias(id)
);

-- Tabela para armazenar as mensagens do formulário de contacto
CREATE TABLE contacto (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(255),
    email VARCHAR(255) NOT NULL,
    mensagem TEXT,
    data_envio TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserindo algumas províncias para teste
INSERT INTO provincias (nome, lat, lng) VALUES ('Huambo', -12.7752, 15.7392);
INSERT INTO provincias (nome, lat, lng) VALUES ('Bié', -12.164, 17.5501);
INSERT INTO provincias (nome, lat, lng) VALUES ('Uíge', -7.6083, 15.0667);

-- Inserindo um guia de exemplo
INSERT INTO guias_agricolas (titulo, provincia_id, conteudo_html) VALUES
('Guia Agro-Huambo', 1, '<p>O clima do Huambo exige foco em técnicas de conservação do solo devido às altas chuvas no pico. Recomendamos...</p>');

