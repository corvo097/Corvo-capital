// Base de dados com a Julia e outros nomes fictícios para simulação
const clientsData = [
    {
        query: "julia stefane de jesus almeida",
        fullName: "Julia Stefane de Jesus Almeida",
        cpf: "188.553.377-26",
        pendencia: "Empréstimo Anterior - R$ 1.300,00 (Pendente)"
    },
    {
        query: "carlos eduardo silva",
        fullName: "Carlos Eduardo Silva",
        cpf: "123.456.789-00",
        pendencia: "Sem pendências ativas"
    },
    {
        query: "marina souza costa",
        fullName: "Marina Souza Costa",
        cpf: "987.654.321-11",
        pendencia: "Empréstimo Anterior - R$ 850,00 (Pendente)"
    },
    {
        query: "lucas almeida oliveira",
        fullName: "Lucas Almeida Oliveira",
        cpf: "456.789.123-22",
        pendencia: "Sem pendências ativas"
    }
];

const clientNameInput = document.getElementById('clientNameInput');
const searchBtn = document.getElementById('searchBtn');
const searchCard = document.querySelector('.search-card');
const loadingSection = document.getElementById('loadingSection');
const resultSection = document.getElementById('resultSection');

const resName = document.getElementById('resName');
const resCpf = document.getElementById('resCpf');
const resPendencia = document.getElementById('resPendencia');
const proofFile = document.getElementById('proofFile');
const uploadText = document.getElementById('uploadText');
const acceptTerms = document.getElementById('acceptTerms');
const whatsappBtn = document.getElementById('whatsappBtn');

let currentClient = null;

searchBtn.addEventListener('click', executeSearch);
clientNameInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') executeSearch();
});

function executeSearch() {
    const rawQuery = clientNameInput.value.trim().toLowerCase();
    
    // Remove pontuação do CPF caso o usuário digite com pontos/traço
    const cleanQuery = rawQuery.replace(/[^\w\s]/gi, '');

    const found = clientsData.find(c => {
        const cleanClientName = c.query.toLowerCase();
        const cleanClientCpf = c.cpf.replace(/[^\w\s]/gi, '');
        return cleanClientName.includes(cleanQuery) || cleanClientCpf.includes(cleanQuery);
    });

    if (!found || rawQuery === "") {
        alert("Nenhum registro localizado com os dados informados. Verifique o nome completo ou CPF.");
        return;
    }

    currentClient = found;

    // Esconde a busca e mostra a animação tecnológica de varredura de dados
    searchCard.classList.add('hidden');
    loadingSection.classList.remove('hidden');

    // Simulação visual de alta tecnologia (etapas de escaneamento)
    const step1 = document.getElementById('step1');
    const step2 = document.getElementById('step2');
    const step3 = document.getElementById('step3');

    setTimeout(() => {
        step1.classList.add('done');
        step1.textContent = '✔ Conexão segura estabelecida com o servidor.';
        step2.classList.add('active');
    }, 800);

    setTimeout(() => {
        step2.classList.remove('active');
        step2.classList.add('done');
        step2.textContent = '✔ Bureau consultado: Titular localizado com sucesso.';
        step3.classList.add('active');
    }, 1600);

    setTimeout(() => {
        step3.classList.remove('active');
        step3.classList.add('done');
        step3.textContent = '✔ Parâmetros de crédito e pendências mapeados.';
    }, 2400);

    // Revela o resultado final após a animação
    setTimeout(() => {
        loadingSection.classList.add('hidden');
        
        resName.textContent = found.fullName;
        resCpf.textContent = found.cpf;
        resPendencia.textContent = found.pendencia;
        
        resultSection.classList.remove('hidden');
        lucide.createIcons(); // Recarrega os ícones na nova seção exibida
    }, 3100);
}

// Manipulação do upload do arquivo
proofFile.addEventListener('change', () => {
    if (proofFile.files.length > 0) {
        const fileName = proofFile.files[0].name;
        uploadText.textContent = `Arquivo Anexado: ${fileName}`;
        uploadText.style.color = 'var(--accent)';
    }
    validateForm();
});

acceptTerms.addEventListener('change', validateForm);

function validateForm() {
    const hasFile = proofFile.files.length > 0;
    const isChecked = acceptTerms.checked;

    if (hasFile && isChecked) {
        whatsappBtn.classList.remove('btn-disabled');
        whatsappBtn.removeAttribute('disabled');
    } else {
        whatsappBtn.classList.add('btn-disabled');
        whatsappBtn.setAttribute('disabled', 'true');
    }
}

// Envio para o WhatsApp com formatação profissional
whatsappBtn.addEventListener('click', () => {
    if (!whatsappBtn.hasAttribute('disabled') && currentClient) {
        const clienteNome = currentClient.fullName;
        const clienteCpf = currentClient.cpf;
        
        // Substitua pelo seu número de WhatsApp real (com DDI e DDD, ex: 5527999999999)
        const seuNumeroWhatsApp = "5527999999999"; 
        
        const mensagem = `*PORTAL CORVO CAPITAL - SOLICITAÇÃO DE CRÉDITO*\n\n` +
                         `• *Titular:* ${clienteNome}\n` +
                         `• *CPF:* ${clienteCpf}\n` +
                         `• *Status:* Comprovante de pendência anexado e termos aceitos.\n\n` +
                         `Solicito a análise e liberação oficial do crédito no valor de *R$ 14.000,00* (Plano: 17x de R$ 1.400,00).`;
        
        const encodedMessage = encodeURIComponent(mensagem);
        const url = `https://api.whatsapp.com/send?phone=${seuNumeroWhatsApp}&text=${encodedMessage}`;
        
        window.open(url, '_blank');
    }
});
