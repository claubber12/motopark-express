
window.onload = () => {
  const qrContainer = document.getElementById("qrcode");
  qrContainer.innerHTML = "";
  new QRCode(qrContainer, "placaABC1234_ticket1");
};
