// script.js

document.getElementById('btnExibirDados').addEventListener('click', exibirDados);
document.getElementById('btnAnalisarTransacoes').addEventListener('click', analisarTransacoes);
document.getElementById('btnEstatisticas').addEventListener('click', exibirEstatisticas);
document.getElementById('btnDetalhesTransacoes').addEventListener('click', exibirDetalhesTransacoes);
document.getElementById('btnDetalhesPorOrgao').addEventListener('click', exibirDetalhesPorOrgao);
document.getElementById('btnAnalisarPorPeriodo').addEventListener('click', analisarPorPeriodo);
document.getElementById('btnTratamentoErros').addEventListener('click', tratarErros);
document.getElementById('btnSair').addEventListener('click', () => {
    document.getElementById('resultados').innerText = 'Sessão encerrada.';
});

const dados = [
    {"orgao":"MEC","data":"01/01/2024","valor":500.00,"status":"sucesso"},
    {"orgao":"Ministério da Saúde","data":"03/01/2024","valor":750.00,"status":"sucesso"},
    {"orgao":"MEC","data":"05/01/2024","valor":1000.00,"status":"falha","motivo":"falta de documentação"},
    {"orgao":"Ministério da Educação","data":"08/01/2024","valor":600.00,"status":"sucesso"},
    {"orgao":"Ministério da Saúde","data":"10/01/2024","valor":900.00,"status":"sucesso"},
    {"orgao":"Ministério da Educação","data":"12/01/2024","valor":300.00,"status":"falha","motivo":"dados inválidos"},
    {"orgao":"Ministério da Saúde","data":"15/01/2024","valor":1200.00,"status":"sucesso"},
    {"orgao":"MEC","data":"17/01/2024","valor":800.00,"status":"sucesso"},
    {"orgao":"Ministério da Educação","data":"20/01/2024","valor":400.00,"status":"sucesso"},
    {"orgao":"MEC","data":"22/01/2024","valor":1100.00,"status":"falha","motivo":"falta de verba"}
];

function exibirDados() {
    const totalRepasses = dados.length;
    const valorTotalRepasses = dados.reduce((sum, d) => sum + d.valor, 0);
    const totalSucesso = dados.filter(d => d.status === 'sucesso').length;
    const totalFalha = dados.filter(d => d.status === 'falha').length;

    document.getElementById('resultados').innerText = `
        Total de repasses processados: ${totalRepasses}
        Valor total dos repasses: R$ ${valorTotalRepasses.toFixed(2)}
        Total de repasses bem-sucedidos: ${totalSucesso}
        Total de repasses com falha: ${totalFalha}
    `;

    // Criação do gráfico
    const ctx = document.getElementById('graficoRepasses').getContext('2d');
    const grafico = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Sucesso', 'Falha'],
            datasets: [{
                label: 'Quantidade de Repasses',
                data: [totalSucesso, totalFalha],
                backgroundColor: ['#4caf50', '#f44336'],
                borderColor: ['#388e3c', '#d32f2f'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

function analisarTransacoes() {
    const sucesso = dados.filter(d => d.status === 'sucesso');
    const falha = dados.filter(d => d.status === 'falha');

    const resumoSucesso = `
        Quantidade total de repasses bem-sucedidos: ${sucesso.length}
        Valor total de repasses bem-sucedidos: R$ ${sucesso.reduce((sum, d) => sum + d.valor, 0).toFixed(2)}
    `;

    const resumoFalha = `
        Quantidade total de repasses com falha: ${falha.length}
        Valor total de repasses com falha: R$ ${falha.reduce((sum, d) => sum + d.valor, 0).toFixed(2)}
    `;

    document.getElementById('resultados').innerText = `Análise de Transações:
    ${resumoSucesso}
    ${resumoFalha}
    `;
}

function exibirEstatisticas() {
    const totalRepasses = dados.length;
    const valorTotalRepasses = dados.reduce((sum, d) => sum + d.valor, 0);
    const mediaRepasses = valorTotalRepasses / totalRepasses;
    const valorMaximo = Math.max(...dados.map(d => d.valor));
    const valorMinimo = Math.min(...dados.map(d => d.valor));

    document.getElementById('resultados').innerText = `
        Total de repasses: ${totalRepasses}
        Valor total dos repasses: R$ ${valorTotalRepasses.toFixed(2)}
        Valor médio dos repasses: R$ ${mediaRepasses.toFixed(2)}
        Valor máximo de repasse: R$ ${valorMaximo.toFixed(2)}
        Valor mínimo de repasse: R$ ${valorMinimo.toFixed(2)}
    `;
}

function exibirDetalhesTransacoes() {
    let detalhes = 'Detalhes das Transações:\n';
    dados.forEach(d => {
        detalhes += `
            Órgão: ${d.orgao}
            Data: ${d.data}
            Valor: R$ ${d.valor.toFixed(2)}
            Status: ${d.status}
            ${d.motivo ? `Motivo: ${d.motivo}` : ''}
            -------------------------
        `;
    });
    document.getElementById('resultados').innerText = detalhes;
}

function exibirDetalhesPorOrgao() {
    const orgao = prompt("Digite o órgão para exibir os detalhes dos repasses:");
    const transacoes = dados.filter(d => d.orgao === orgao);

    if (transacoes.length > 0) {
        let detalhes = `Detalhes dos repasses do órgão ${orgao}:\n`;
        transacoes.forEach(d => {
            detalhes += `
                Data: ${d.data}
                Valor: R$ ${d.valor.toFixed(2)}
                Status: ${d.status}
                ${d.motivo ? `Motivo: ${d.motivo}` : ''}
                -------------------------
            `;
        });
        document.getElementById('resultados').innerText = detalhes;
    } else {
        document.getElementById('resultados').innerText = `Nenhum repasse encontrado para o órgão ${orgao}.`;
    }
}

function analisarPorPeriodo() {
    const dataInicio = prompt("Digite a data de início (formato: DD/MM/AAAA):");
    const dataFim = prompt("Digite a data de fim (formato: DD/MM/AAAA):");

    const inicio = new Date(dataInicio.split('/').reverse().join('-'));
    const fim = new Date(dataFim.split('/').reverse().join('-'));

    const transacoesPeriodo = dados.filter(d => {
        const data = new Date(d.data.split('/').reverse().join('-'));
        return data >= inicio && data <= fim;
    });

    if (transacoesPeriodo.length > 0) {
        let detalhes = `Detalhes dos repasses de ${dataInicio} a ${dataFim}:\n`;
        transacoesPeriodo.forEach(d => {
            detalhes += `
                Órgão: ${d.orgao}
                Data: ${d.data}
                Valor: R$ ${d.valor.toFixed(2)}
                Status: ${d.status}
                ${d.motivo ? `Motivo: ${d.motivo}` : ''}
                -------------------------
            `;
        });
        document.getElementById('resultados').innerText = detalhes;
    } else {
        document.getElementById('resultados').innerText = `Nenhum repasse encontrado no período de ${dataInicio} a ${dataFim}.`;
    }
}

function tratarErros() {
    const erros = dados.filter(d => d.status === 'falha');

    if (erros.length > 0) {
        let detalhes = 'Detalhes dos repasses com falha:\n';
        erros.forEach(d => {
            detalhes += `
                Órgão: ${d.orgao}
                Data: ${d.data}
                Valor: R$ ${d.valor.toFixed(2)}
                Motivo: ${d.motivo}
                -------------------------
            `;
        });
        document.getElementById('resultados').innerText = detalhes;
    } else {
        document.getElementById('resultados').innerText = 'Nenhum repasse com falha encontrado.';
    }
}
