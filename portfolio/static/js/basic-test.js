// Teste básico - SEM módulos ES6
console.log('🎯 TESTE BÁSICO: Carregando JavaScript simples...');

document.addEventListener('DOMContentLoaded', function() {
    console.log('📋 DOM carregado - iniciando testes básicos');
    
    // Teste 1: Verificar elementos básicos
    const body = document.body;
    console.log('✅ Body encontrado:', body ? 'SIM' : 'NÃO');
    
    // Teste 2: Certificações toggle (funcionalidade que deveria funcionar)
    setupCertificationsToggleSimple();
    
    // Teste 3: Teste de clique simples
    testBasicClick();
    
    console.log('🎉 Testes básicos concluídos');
});

function setupCertificationsToggleSimple() {
    console.log('🔧 Configurando toggle de certificações (versão simples)...');
    
    const button = document.getElementById('viewAllCertificationsBtn');
    console.log('🔍 Botão encontrado:', button ? 'SIM' : 'NÃO');
    
    if (button) {
        button.addEventListener('click', function() {
            console.log('🖱️ Botão clicado!');
            
            const hiddenCards = document.querySelectorAll('.certification-card.hidden-by-default');
            console.log('📦 Cards ocultos encontrados:', hiddenCards.length);
            
            let isShowing = false;
            hiddenCards.forEach(card => {
                if (card.style.display === 'none' || !card.style.display) {
                    card.style.display = 'block';
                    isShowing = true;
                } else {
                    card.style.display = 'none';
                    isShowing = false;
                }
            });
            
            const buttonText = document.getElementById('viewAllCertificationsText');
            if (buttonText) {
                buttonText.textContent = isShowing ? 'Show Less' : 'View All Certificates';
                console.log('✅ Texto do botão atualizado para:', buttonText.textContent);
            }
        });
        
        // Inicializar - esconder cards extras
        const hiddenCards = document.querySelectorAll('.certification-card.hidden-by-default');
        hiddenCards.forEach(card => {
            card.style.display = 'none';
        });
        
        console.log('✅ Toggle de certificações configurado com sucesso');
    } else {
        console.log('❌ Botão de certificações não encontrado');
    }
}

function testBasicClick() {
    console.log('🖱️ Testando sistema de cliques básico...');
    
    // Adicionar um evento de teste a todos os project cards
    const projectCards = document.querySelectorAll('.project-card');
    console.log('📊 Project cards encontrados:', projectCards.length);
    
    projectCards.forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`🎯 Project card ${index + 1} clicado!`);
        });
    });
}

// Função global para teste manual
window.testFunction = function() {
    console.log('🧪 Função de teste global funcionando!');
    alert('JavaScript está funcionando!');
};

console.log('📝 basic-test.js carregado com sucesso');