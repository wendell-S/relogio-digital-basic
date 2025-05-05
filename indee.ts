interface HTMLElement {
    textContent: string | null;
  }
  
  const horasElement = document.getElementById('horas') as HTMLElement | null;
  const minutosElement = document.getElementById('minutos') as HTMLElement | null;
  const segundosElement = document.getElementById('segundos') as HTMLElement | null;
  
  function atualizarRelogio(): void {
    const dateToday: Date = new Date();
    let hr: number | string = dateToday.getHours();
    let min: number | string = dateToday.getMinutes();
    let s: number | string = dateToday.getSeconds();
  
    if (hr < 10) {
      hr = '0' + hr;
    }
  
    if (min < 10) {
      min = '0' + min;
    }
  
    if (s < 10) {
      s = '0' + s;
    }
  
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
  
  // Garante que os elementos HTML existam antes de iniciar o intervalo
  if (horasElement && minutosElement && segundosElement) {
    setInterval(atualizarRelogio, 1000);
  } else {
    console.error("Um ou mais elementos do relógio não foram encontrados no DOM.");
  }