let entrada, saida;

document.getElementById('parkingForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  const contato = document.getElementById('contato').value.trim();

  if (!placa || !contato) return alert("Preencha todos os campos");

  entrada = new Date();
  document.getElementById('saidaSection').classList.remove('hidden');
  document.getElementById('parkingForm').classList.add('hidden');
});

document.getElementById('saidaBtn').addEventListener('click', function() {
  saida = new Date();
  const placa = document.getElementById('placa').value.trim().toUpperCase();
  const contato = document.getElementById('contato').value.trim();
  const diffMs = saida - entrada;
  const diffMin = Math.ceil(diffMs / 60000);

  const entradaStr = entrada.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const saidaStr = saida.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const ticketMsg = `MotoPark Express\n\nPlaca: ${placa}\nEntrada: ${entradaStr}\nSaída: ${saidaStr}\nTempo total: ${diffMin} min\nContato: ${contato}`;

  document.getElementById('ticket').textContent = ticketMsg;
  document.getElementById('ticket').classList.remove('hidden');
  document.getElementById('buttons').classList.remove('hidden');

  const whatsappURL = "https://wa.me/" + contato.replace(/\D/g, '') + "?text=" + encodeURIComponent(ticketMsg);
  document.getElementById('whatsappBtn').href = whatsappURL;
});

document.getElementById('resetBtn').addEventListener('click', function() {
  window.location.reload();
});