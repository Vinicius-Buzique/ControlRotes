
var ENDERECO_EMPRESA = 'Avenida Paulista, 1000 - Bela Vista, São Paulo - SP, 01310-100';

function carregarMapa() {
    var consulta = encodeURIComponent(ENDERECO_EMPRESA);

    document.getElementById('enderecoTexto').textContent = ENDERECO_EMPRESA;
    document.getElementById('mapaEmpresa').src = 'https://www.google.com/maps?q=' + consulta + '&output=embed';
    document.getElementById('linkMaps').href = 'https://www.google.com/maps/search/?api=1&query=' + consulta;
    document.getElementById('linkRota').href = 'https://www.google.com/maps/dir/?api=1&destination=' + consulta;
}

carregarMapa();
