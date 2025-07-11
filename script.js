let entradaData = {};
let sequencial = 1;
function goToEntrada() {
  hideAll();
  document.getElementById('entrada-screen').classList.remove('hidden');
}
function goToSaida() {
  hideAll();
  document.getElementById('saida-screen').classList.remove('hidden');
  const qr = new Html5Qrcode("reader");
  qr.start(
    { facingMode: "environment" },
    { fps: 10, qrbox: 250 },
    qrCodeMessage => {
      qr.stop();
      processQRCode(qrCodeMessage);
    },
    error => {}
  );
}
function registrarEntrada() {
  const nome = document.getElementById('nomeCliente').value.trim();
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const entrada = new Date();
  if (!nome || !placa || !whatsapp) {
    alert("Preencha todos os campos.");
    return;
  }
  entradaData = { nome, placa, whatsapp, entrada, ticketId: sequencial++ };
  const hora = entrada.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const data = entrada.toLocaleDateString();
  const msg = `MotoPark Express\n----------------------\nCliente: ${nome}\nPlaca: ${placa}\nEntrada: ${hora} - ${data}\nTíquete Nº: ${entradaData.ticketId}`;
  document.getElementById('ticket-info').textContent = msg;
  document.getElementById('btnEnviarWhatsApp').onclick = function() {
    const url = "https://wa.me/" + whatsapp.replace(/\D/g, '') + "?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
  };
  hideAll();
  document.getElementById('ticket-screen').classList.remove('hidden');
}
function processQRCode(data) {
  if (!entradaData.entrada) {
    alert("Nenhum registro de entrada encontrado.");
    return;
  }
  const saida = new Date();
  const diffMs = saida - entradaData.entrada;
  const minutos = Math.ceil(diffMs / 60000);
  const horas = Math.floor(minutos / 60);
  const minRest = minutos % 60;
  const tempoTotal = `${horas}h ${minRest}min`;
  const valor = 5.00;
  const msg = `MotoPark Express\n----------------------\nCliente: ${entradaData.nome}\nPlaca: ${entradaData.placa}\nEntrada: ${entradaData.entrada.toLocaleTimeString()}\nSaída: ${saida.toLocaleTimeString()}\nTempo: ${tempoTotal}\nValor: R$ ${valor.toFixed(2)}\nTíquete Nº: ${entradaData.ticketId}`;
  document.getElementById('ticket-info').textContent = msg;
  document.getElementById('btnEnviarWhatsApp').onclick = function() {
    const url = "https://wa.me/" + entradaData.whatsapp.replace(/\D/g, '') + "?text=" + encodeURIComponent(msg);
    window.open(url, '_blank');
  };
  hideAll();
  document.getElementById('ticket-screen').classList.remove('hidden');
}
function voltarMenu() {
  hideAll();
  document.getElementById('main-menu').classList.remove('hidden');
}
function hideAll() {
  ['main-menu', 'entrada-screen', 'saida-screen', 'ticket-screen'].forEach(id => {
    document.getElementById(id).classList.add('hidden');
  });
}