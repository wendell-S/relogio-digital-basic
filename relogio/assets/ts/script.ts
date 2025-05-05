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

// Inicialização
if (horasElement && minutosElement && segundosElement && themeSwitcher && bodyElement && relogioElement && relogioDivs) {
    setInterval(atualizarRelogio, 1000);
    themeSwitcher.addEventListener('click', toggleTheme);
    carregarTema(); // Carregar o tema ao carregar a página
} else {
    console.error("Um ou mais elementos do DOM não foram encontrados.");
}