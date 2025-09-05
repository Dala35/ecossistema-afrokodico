// =========================================
// 1. Configuração da API
// =========================================
// URL base da nossa API. Quando o servidor Python estiver a correr,
// este será o endereço local. Quando o projeto for para produção,
// este URL deverá ser alterado para o endereço do servidor online.
const API_URL = 'http://127.0.0.1:5000';

// =========================================
// 2. Funções para carregar dados da API
// =========================================

/**
 * Carrega a previsão climática da API e atualiza a seção 'clima'.
 */
async function loadClimateData() {
    try {
        const response = await fetch(`${API_URL}/api/clima/previsao`);
        const data = await response.json();

        if (data.status === 'success') {
            const pontosChaveList = document.querySelector('.climate-overview ul');
            // Limpa a lista existente antes de adicionar novos itens
            pontosChaveList.innerHTML = ''; 
            
            data.data.pontos_chave.forEach(ponto => {
                const li = document.createElement('li');
                const strong = document.createElement('strong');
                strong.className = 'highlight-text';
                strong.textContent = ponto.fase + ':';
                
                li.appendChild(strong);
                li.appendChild(document.createTextNode(` ${ponto.descricao}`));
                pontosChaveList.appendChild(li);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar dados climáticos:', error);
        // Pode adicionar uma mensagem de erro na página aqui
    }
}

/**
 * Carrega os guias agrícolas da API e cria os cartões dinamicamente.
 */
async function loadAgriculturalGuides() {
    try {
        const response = await fetch(`${API_URL}/api/guias`);
        const data = await response.json();

        if (data.status === 'success') {
            const guideGrid = document.querySelector('.guide-grid');
            guideGrid.innerHTML = ''; // Limpa o grid
            
            data.data.forEach(guia => {
                const guideCard = document.createElement('div');
                guideCard.className = 'guide-card';

                const img = document.createElement('img');
                img.src = `https://via.placeholder.com/150/FFA500/FFFFFF?text=${encodeURIComponent(guia.titulo)}`;
                img.alt = guia.titulo;

                const p = document.createElement('p');
                p.textContent = guia.titulo;

                guideCard.appendChild(img);
                guideCard.appendChild(p);
                guideGrid.appendChild(guideCard);
            });
        }
    } catch (error) {
        console.error('Erro ao carregar guias agrícolas:', error);
        // Mensagem de erro
    }
}

// =========================================
// 3. Funções para o formulário de contacto
// =========================================
const contactForm = document.querySelector('.section-contacto form');

if (contactForm) {
    contactForm.addEventListener('submit', async (event) => {
        event.preventDefault(); // Impede o envio padrão do formulário

        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const mensagem = document.getElementById('mensagem').value;

        try {
            const response = await fetch(`${API_URL}/api/contacto`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nome, email, mensagem })
            });

            const data = await response.json();

            if (data.status === 'success') {
                alert(data.mensagem);
                contactForm.reset(); // Limpa o formulário
            } else {
                alert('Erro ao enviar a mensagem. Por favor, tente novamente.');
            }
        } catch (error) {
            console.error('Erro ao enviar o formulário:', error);
            alert('Erro de conexão. Verifique se o servidor está a funcionar.');
        }
    });
}

// =========================================
// 4. Executar as funções ao carregar a página
// =========================================
document.addEventListener('DOMContentLoaded', () => {
    loadClimateData();
    loadAgriculturalGuides();
});


