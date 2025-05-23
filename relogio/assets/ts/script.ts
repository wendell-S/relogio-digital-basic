interface HTMLElement {
    textContent: string | null;
    classList: DOMTokenList;
}

const horasElement = document.getElementById('horas') as HTMLElement | null;
const minutosElement = document.getElementById('minutos') as HTMLElement | null;
const segundosElement = document.getElementById('segundos') as HTMLElement | null;
const themeSwitcher = document.getElementById('themeSwitcher') as HTMLButtonElement | null;
const bodyElement = document.body as HTMLElement;
const relogioElement = document.querySelector('.relogio') as HTMLElement | null;
const relogioDivs = document.querySelectorAll('.relogio div') as NodeListOf<HTMLElement>;
const mensagemElement = document.getElementById('mensagem') as HTMLElement | null;
const resetThemeButton = document.createElement('button');
resetThemeButton.id = 'resetTheme';
resetThemeButton.textContent = 'Redefinir Tema';
resetThemeButton.style.position = 'absolute';
resetThemeButton.style.top = '60px';
resetThemeButton.style.right = '20px';
resetThemeButton.style.padding = '10px 15px';
resetThemeButton.style.border = 'none';
resetThemeButton.style.borderRadius = '5px';
resetThemeButton.style.backgroundColor = '#333';
resetThemeButton.style.color = '#fff';
resetThemeButton.style.cursor = 'pointer';
resetThemeButton.style.fontSize = '16px';
resetThemeButton.style.transition = 'background-color 0.3s ease';
resetThemeButton.addEventListener('mouseover', () => {
    resetThemeButton.style.backgroundColor = '#555';
});
resetThemeButton.addEventListener('mouseout', () => {
    resetThemeButton.style.backgroundColor = '#333';
});
resetThemeButton.addEventListener('click', () => {
    bodyElement.classList.remove('light-theme');
    relogioElement?.classList.remove('light-theme');
    relogioDivs.forEach(div => div.classList.remove('light-theme'));
    salvarTema();
});

// Adiciona o botão ao body
document.body.appendChild(resetThemeButton);

let formato24h = true; // Define o formato inicial como 24h

const formatoButton = document.createElement('button');
formatoButton.id = 'formatoButton';
formatoButton.textContent = 'Alternar para 12h';
formatoButton.style.position = 'absolute';
formatoButton.style.top = '100px';
formatoButton.style.right = '20px';
formatoButton.style.padding = '10px 15px';
formatoButton.style.border = 'none';
formatoButton.style.borderRadius = '5px';
formatoButton.style.backgroundColor = '#333';
formatoButton.style.color = '#fff';
formatoButton.style.cursor = 'pointer';
formatoButton.style.fontSize = '16px';
formatoButton.style.transition = 'background-color 0.3s ease';
formatoButton.addEventListener('mouseover', () => {
    formatoButton.style.backgroundColor = '#555';
});
formatoButton.addEventListener('mouseout', () => {
    formatoButton.style.backgroundColor = '#333';
});
formatoButton.addEventListener('click', () => {
    formato24h = !formato24h;
    formatoButton.textContent = formato24h ? 'Alternar para 12h' : 'Alternar para 24h';
    atualizarRelogio();
});

// Adiciona o botão ao body
document.body.appendChild(formatoButton);

function atualizarRelogio(): void {
    const dateToday: Date = new Date();
    let hr: number | string = dateToday.getHours();
    let min: number | string = dateToday.getMinutes();
    let s: number | string = dateToday.getSeconds();

    hr = hr < 10 ? '0' + hr : hr;
    min = min < 10 ? '0' + min : min;
    s = s < 10 ? '0' + s : s;

    if (horasElement) {
        horasElement.textContent = hr.toString();
    }
    if (minutosElement) {
        minutosElement.textContent = min.toString();
    }
    if (segundosElement) {
        segundosElement.textContent = s.toString();
    }
}

// Adiciona animação ao relógio
if (relogioElement) {
    relogioElement.style.transition = 'transform 0.5s ease';
    setInterval(() => {
        relogioElement.style.transform = 'scale(1.05)';
        setTimeout(() => {
            relogioElement.style.transform = 'scale(1)';
        }, 250);
    }, 1000);
}

function toggleTheme(): void {
    bodyElement.classList.toggle('light-theme');
    relogioElement?.classList.toggle('light-theme');
    relogioDivs.forEach(div => {
        div.classList.toggle('light-theme');
    });
    salvarTema();
}

function carregarTema(): void {
    const temaSalvo = localStorage.getItem('theme');
    if (temaSalvo === 'light') {
        bodyElement.classList.add('light-theme');
        relogioElement?.classList.add('light-theme');
        relogioDivs.forEach(div => div.classList.add('light-theme'));
    }
}

function salvarTema(): void {
    localStorage.setItem('theme', bodyElement.classList.contains('light-theme') ? 'light' : 'dark');
}

function exibirMensagem(): void {
    const dateToday: Date = new Date();
    const hr: number = dateToday.getHours();
    let mensagem: string;

    if (hr >= 5 && hr < 12) {
        mensagem = 'Bom dia!';
    } else if (hr >= 12 && hr < 18) {
        mensagem = 'Boa tarde!';
    } else {
        mensagem = 'Boa noite!';
    }

    if (mensagemElement) {
        mensagemElement.textContent = mensagem;
    }
}

// Inicialização
if (horasElement && minutosElement && segundosElement && themeSwitcher && bodyElement && relogioElement && relogioDivs) {
    setInterval(atualizarRelogio, 1000); // Atualiza o relógio a cada segundo
    themeSwitcher.addEventListener('click', toggleTheme);
    carregarTema(); // Carregar o tema ao carregar a página
    exibirMensagem(); // Exibir mensagem de boas-vindas
} else {
    console.error("Um ou mais elementos do DOM não foram encontrados.");
}