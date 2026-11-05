
function alternarTelaAuth(tipo) {
    if (tipo === 'cadastro') {
        document.getElementById('loginFormContainer').style.display = 'none';
        document.getElementById('cadastroFormContainer').style.display = 'block';
    } else {
        document.getElementById('cadastroFormContainer').style.display = 'none';
        document.getElementById('loginFormContainer').style.display = 'block';
    }
}


function fazerLogin(event) {
    event.preventDefault();
    window.location.href = '../inicio/home.html';
}

function fazerLogout() {
    window.location.href = '../login/login.html';
}


function executarSimulacao(event) {
    event.preventDefault();

    const empresa = document.getElementById('simEmpresa').value;
    const tipoFrota = document.getElementById('simTipoFrota').value;
    const qtd = document.getElementById('simQtdVeiculos').value;
    const orcamento = document.getElementById('simOrcamento').value;


    localStorage.setItem('empresa', empresa);
    mostrarLinkPainel();

    const box = document.getElementById('resultadoSimulacao');
    box.style.display = 'block';
    box.innerHTML = `
        <h3>Relatório de Simulação: ${empresa}</h3>
        <p><strong>Segmento:</strong> ${tipoFrota}</p>
        <p><strong>Ativos Alocados:</strong> ${qtd} veículos</p>
        <p><strong>Expectativa de Investimento:</strong> ${orcamento}</p>
        <p style="margin-top: 10px; color: #2e9e5b;">Status: Parâmetros validados com sucesso. Nossa equipe técnica emitirá a proposta comercial detalhada.</p>
        <p style="margin-top: 10px;"><strong>Empresa cadastrada! O Painel de Controle foi liberado.</strong></p>
        <a href="../painel/controle.html" class="btn-acao btn-destaque">Ir para o Painel</a>
    `;
}


function mostrarLinkPainel() {
    var link = document.getElementById('linkPainel');
    if (link && localStorage.getItem('empresa')) {
        link.style.display = 'inline';
    }
}

mostrarLinkPainel();
