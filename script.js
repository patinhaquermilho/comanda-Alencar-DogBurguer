let comanda = {};

function adicionar(item) {
  if (!comanda[item]) {
    comanda[item] = 0;
  }
  comanda[item]++;
  atualizarLista();
}

function remover(item) {
  if (comanda[item]) {
    comanda[item]--;
    if (comanda[item] === 0) {
      delete comanda[item];
    }
  }
  atualizarLista();
}

function atualizarLista() {
  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  for (let item in comanda) {
    const li = document.createElement("li");
    li.textContent = `${item} x${comanda[item]}`;
    lista.appendChild(li);
  }
}

function enviarPedido() {
  const mesa = document.getElementById("mesa").value;

  if (!mesa || Object.keys(comanda).length === 0) {
    alert("Informe a mesa e os itens!");
    return;
  }

  let conteudo = `
    <h2>Pedido - Mesa ${mesa}</h2>
    <ul>
  `;

  for (let item in comanda) {
    conteudo += `<li>${item} x${comanda[item]}</li>`;
  }

  conteudo += `
    </ul>
    <p>--------------------</p>
    <p>${new Date().toLocaleString()}</p>
  `;

  const win = window.open("", "PRINT", "width=400,height=600");
  win.document.write(`
    <html>
      <head>
        <title>Comanda</title>
      </head>
      <body>
        ${conteudo}
        <script>
          window.print();
        </script>
      </body>
    </html>
  `);

  win.document.close();

  comanda = {};
  atualizarLista();
}