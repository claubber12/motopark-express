document.getElementById("entradaForm").addEventListener("submit", function(e) {
  e.preventDefault();
  const nome = document.getElementById("nome").value;
  const placa = document.getElementById("placa").value;
  const whats = document.getElementById("whats").value;
  const horario = new Date().toLocaleString();
  const recibo = `
    <div class="recibo-box">
      <h2>Tíquete de Entrada</h2>
      <p><strong>Nome:</strong> ${nome}</p>
      <p><strong>Placa:</strong> ${placa}</p>
      <p><strong>WhatsApp:</strong> ${whats}</p>
      <p><strong>Horário:</strong> ${horario}</p>
    </div>
  `;
  document.getElementById("recibo").innerHTML = recibo;
});