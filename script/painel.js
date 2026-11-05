
var empresa = localStorage.getItem('empresa');

if (!empresa) {
    alert('Cadastre sua empresa no Simulador para liberar o painel.');
    window.location.href = '../simulacao/simulacao.html';
}

document.getElementById('nomeEmpresa').textContent = empresa;


var veiculos = JSON.parse(localStorage.getItem('veiculos') || '[]');

function salvar() {
    localStorage.setItem('veiculos', JSON.stringify(veiculos));
    mostrarPainel();
}

var NOMES_TIPO = {
    CARRO: 'Carro',
    UTILITARIO: 'Utilitário',
    VAN: 'Van',
    CAMINHAO: 'Caminhão',
    MOTO: 'Moto'
};

var NOMES_COMBUSTIVEL = {
    GASOLINA: 'Gasolina',
    ETANOL: 'Etanol',
    FLEX: 'Flex',
    DIESEL: 'Diesel',
    GNV: 'GNV',
    ELETRICO: 'Elétrico'
};


var SUGESTAO_POR_TIPO = {
    CARRO:      { combustivel: 'FLEX',   tanque: 50,  consumo: 12 },
    UTILITARIO: { combustivel: 'FLEX',   tanque: 55,  consumo: 10 },
    VAN:        { combustivel: 'DIESEL', tanque: 80,  consumo: 9 },
    CAMINHAO:   { combustivel: 'DIESEL', tanque: 300, consumo: 3.5 },
    MOTO:       { combustivel: 'GASOLINA', tanque: 15, consumo: 30 }
};

function aoMudarTipo() {
    var sug = SUGESTAO_POR_TIPO[document.getElementById('veiTipo').value];
    if (!sug) return;

    document.getElementById('veiCombustivel').value = sug.combustivel;
    document.getElementById('veiTanque').value = sug.tanque;
    document.getElementById('veiConsumo').value = sug.consumo;
    atualizarPrevia();
}

function calcularAutonomia(tanque, consumo, nivel) {
    return tanque * (nivel / 100) * consumo;
}

function atualizarPrevia() {
    var tanque = parseFloat(document.getElementById('veiTanque').value);
    var consumo = parseFloat(document.getElementById('veiConsumo').value);
    var nivel = parseInt(document.getElementById('veiNivel').value, 10);

    document.getElementById('veiNivelTxt').textContent = nivel + '%';

    var previa = document.getElementById('veiPrevia');
    if (!tanque || !consumo) {
        previa.textContent = 'Preencha tanque e consumo para ver a autonomia estimada.';
        return;
    }

    var litros = tanque * nivel / 100;
    var autonomia = calcularAutonomia(tanque, consumo, nivel);
    previa.textContent = 'Combustível atual: ' + litros.toFixed(1) + ' L  |  Autonomia estimada: ' +
        autonomia.toFixed(0) + ' km  |  Autonomia com tanque cheio: ' + (tanque * consumo).toFixed(0) + ' km';
}

function cadastrarVeiculo(event) {
    event.preventDefault();

    veiculos.push({
        tipo: document.getElementById('veiTipo').value,
        placa: document.getElementById('veiPlaca').value.toUpperCase(),
        marca: document.getElementById('veiMarca').value,
        modelo: document.getElementById('veiModelo').value,
        ano: parseInt(document.getElementById('veiAno').value, 10),
        km: parseFloat(document.getElementById('veiKm').value),
        combustivel: document.getElementById('veiCombustivel').value,
        tanque: parseFloat(document.getElementById('veiTanque').value),
        consumo: parseFloat(document.getElementById('veiConsumo').value),
        nivel: parseInt(document.getElementById('veiNivel').value, 10),
        camera: false
    });

    event.target.reset();
    atualizarPrevia();
    salvar();
}

function alternarCamera(i) {
    veiculos[i].camera = !veiculos[i].camera;
    salvar();
}

function removerVeiculo(i) {
    veiculos.splice(i, 1);
    salvar();
}

function mostrarPainel() {
    var linhas = '';
    var cameras = 0;
    var litrosTotal = 0;
    var somaAutonomia = 0;
    var comAutonomia = 0;

    for (var i = 0; i < veiculos.length; i++) {
        var v = veiculos[i];
        if (v.camera) cameras++;

        var temCombustivel = v.tanque && v.consumo;
        var autonomia = temCombustivel ? calcularAutonomia(v.tanque, v.consumo, v.nivel) : null;

        if (temCombustivel) {
            litrosTotal += v.tanque * v.nivel / 100;
            somaAutonomia += autonomia;
            comAutonomia++;
        }

        var classeNivel = v.nivel <= 20 ? 'baixo' : (v.nivel <= 50 ? 'medio' : 'alto');

        var tr = document.createElement('tr');
        tr.innerHTML =
            '<td></td>' +
            '<td><strong></strong></td>' +
            '<td></td>' +
            '<td></td>' +
            '<td>' + (temCombustivel
                ? '<div class="barra"><div class="barra-nivel ' + classeNivel + '" style="width:' + v.nivel + '%"></div></div>' +
                  '<small>' + v.nivel + '% (' + (v.tanque * v.nivel / 100).toFixed(0) + ' de ' + v.tanque + ' L)</small>'
                : '-') + '</td>' +
            '<td>' + (temCombustivel ? autonomia.toFixed(0) + ' km' : '-') + '</td>' +
            '<td><span class="tag ' + (v.camera ? 'on' : 'off') + '">' + (v.camera ? 'ON' : 'OFF') + '</span></td>' +
            '<td>' +
                '<button class="acao" onclick="alternarCamera(' + i + ')">' + (v.camera ? 'Desligar' : 'Ligar') + ' câmera</button> ' +
                '<button class="acao remover" onclick="removerVeiculo(' + i + ')">Remover</button>' +
            '</td>';
        tr.children[0].textContent = NOMES_TIPO[v.tipo] || '-';
        tr.children[1].firstChild.textContent = v.placa;
        tr.children[2].textContent = ((v.marca ? v.marca + ' ' : '') + v.modelo) + (v.ano ? ' (' + v.ano + ')' : '');
        tr.children[3].textContent = NOMES_COMBUSTIVEL[v.combustivel] || '-';
        linhas += tr.outerHTML;
    }

    if (veiculos.length === 0) {
        linhas = '<tr><td colspan="8">Nenhum veículo cadastrado.</td></tr>';
    }

    document.getElementById('tabelaVeiculos').innerHTML = linhas;
    document.getElementById('totalVeiculos').textContent = veiculos.length;
    document.getElementById('totalCameras').textContent = cameras;
    document.getElementById('totalTanque').textContent = litrosTotal.toFixed(0) + ' L';
    document.getElementById('autonomiaMedia').textContent =
        (comAutonomia ? (somaAutonomia / comAutonomia).toFixed(0) : 0) + ' km';
}

mostrarPainel();
