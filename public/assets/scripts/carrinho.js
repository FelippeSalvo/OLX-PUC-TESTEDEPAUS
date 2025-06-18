// Dados do carrinho
let carrinhoData = {
  "carrinho": [
    {
      "id": 1,
      "nome": "Livro de Direito",
      "descricao": "Cor: Azul | Tipo: Penal",
      "preco": 50.00,
      "quantidade": 1,
      "imagem": "/public/assets/img/livrodireito.png",
      "favorito": false
    },
    {
      "id": 2,
      "nome": "Mochila",
      "descricao": "Cor: Preta | Tamanho: M",
      "preco": 69.99,
      "quantidade": 1,
      "imagem": "/public/assets/img/mochila.png",
      "favorito": false
    },
    {
      "id": 3,
      "nome": "Moletom Vermelho",
      "descricao": "Cor: Vermelho | Tamanho: M",
      "preco": 72.00,
      "quantidade": 1,
      "imagem": "/public/assets/img/moletom.webp",
      "favorito": false
    }
  ],
  "resumoPedido": {
    "subtotal": 191.99,
    "taxaServico": 10.00,
    "total": 201.99
  },
  "vendedor": {
    "nome": "Iguinho Job",
    "membroDesde": 2025,
    "avaliacao": 4.8,
    "curso": "ADS",
    "contato": "31 8819-8824",
    "imagem": "/public/assets/img/cachorro.jpg"
  }
};

// Função p/ atualizar carrinho
function atualizarCarrinho() {
  const carrinhoContainer = document.querySelector('.card-body');
  const resumoContainer = document.querySelector('.sumario-lista');
  const vendedorContainer = document.querySelector('.info-vendedor');
  
  // Limpa todo o carrinho do safado
  carrinhoContainer.innerHTML = `
    <div class="card-top py-3">
      <div class="d-flex justify-content-between align-items-center">
        <h5 class="mb-0 fw-bold"><i class="fas fa-shopping-cart me-2"></i>Meu Carrinho</h5>
        <span>${carrinhoData.carrinho.length} itens</span>
      </div>
    </div>
  `;
  
  // Adiciona os itens do carrinho
  carrinhoData.carrinho.forEach(item => {
    const itemHTML = `
      <div class="row mb-4 align-items-center produtos py-3" data-id="${item.id}">
        <div class="col-md-2">
          <img src="${item.imagem}" class="img-fluid rounded-3" alt="${item.nome}" />
        </div>
        <div class="col-md-5">
          <h6 class="mb-1 fw-bold">${item.nome}</h6>
          <p class="mb-2 text-muted small">${item.descricao}</p>
          <div class="d-flex">
            <button class="btn btn-sm btn-outline-danger me-2 btn-remover">
              <i class="fas fa-trash-alt me-1"></i> Remover
            </button>
            <button class="btn btn-sm btn-outline-secondary btn-favorito ${item.favorito ? 'active' : ''}">
              <i class="fas fa-heart me-1"></i> ${item.favorito ? 'Favoritado' : 'Favorito'}
            </button>
          </div>
        </div>
        <div class="col-md-5">
          <div class="d-flex align-items-center justify-content-between">
            <div class="quantity-controls d-flex align-items-center">
              <button class="btn btn-outline-primary px-3 btn-diminuir">
                <i class="quantidade fas fa-minus"></i>
              </button>
              <input type="number" class="form-control text-center mx-2 quantidade-input" value="${item.quantidade}" min="1" style="width: 60px;">
              <button class="btn btn-outline-primary px-3 btn-aumentar">
                <i class="quantidade fas fa-plus"></i>
              </button>
            </div>
            <div class="preco fs-5">
              <strong>R$ ${(item.preco * item.quantidade).toFixed(2)}</strong>
            </div>
          </div>
        </div>
      </div>
      <hr>
    `;
    carrinhoContainer.innerHTML += itemHTML;
  });
  
  // Botões de ação
  carrinhoContainer.innerHTML += `
    <div class="d-flex justify-content-between mt-4 px-3 pb-3">
      <a href="" class="text-decoration-none">
        <button class="btn-voltar px-4">
            <i class="fas fa-arrow-left me-2"></i>Continuar Comprando
         </button>
      </a>
      <button class="btn btn-danger btn-limpar px-4">
        <i class="fas fa-trash-alt me-2"></i>Limpar Carrinho
      </button>
    </div>
  `;
  
  // Atualiza resumo do pedido
  calcularResumo();
  resumoContainer.innerHTML = `
    <li class="list-group-item d-flex justify-content-between align-items-center border-0 py-3">
      <span class="text-muted">Subtotal (${carrinhoData.carrinho.length} itens)</span>
      <span>R$ ${carrinhoData.resumoPedido.subtotal.toFixed(2)}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center border-0 py-3">
      <span class="text-muted">Taxa de serviço</span>
      <span>+ R$ ${carrinhoData.resumoPedido.taxaServico.toFixed(2)}</span>
    </li>
    <li class="list-group-item d-flex justify-content-between align-items-center py-3 total-item">
      <strong class="fs-5">Total</strong>
      <strong class="preco2 fs-5">R$ ${carrinhoData.resumoPedido.total.toFixed(2)}</strong>
    </li>
  `;
  
  // informações do vendedor
  vendedorContainer.innerHTML = `
    <h6 class="fw-bold"><i class="fas fa-store me-2"></i>Informações do Vendedor</h6>
    <div class="d-flex align-items-center mb-3">
      <img src="${carrinhoData.vendedor.imagem}" class="rounded-circle me-3" alt="Vendedor">
      <div>
        <h6 class="mb-0 fw-bold">${carrinhoData.vendedor.nome}</h6>
        <span class="text-muted small">Membro desde ${carrinhoData.vendedor.membroDesde}</span>
      </div>
    </div>
    <div class="d-flex justify-content-between mb-2 small vendedor-stats">
      <span class="text-muted">Avaliação:</span>
      <span class="fw-bold">${carrinhoData.vendedor.avaliacao} <i class="fas fa-star text-warning"></i></span>
    </div>
    <div class="d-flex justify-content-between mb-2 small vendedor-stats">
      <span class="text-muted">Curso:</span>
      <span class="fw-bold">${carrinhoData.vendedor.curso}</span>
    </div>
    <div class="d-flex justify-content-between mb-3 small vendedor-stats">
      <span class="text-muted">Contato:</span>
      <span class="fw-bold">${carrinhoData.vendedor.contato}</span>
    </div>
  `;
    // Adiciona eventos aos botões
  adicionarEventos();
}

// Função para calcular o pedido
function calcularResumo() {
  let subtotal = 0;
  
  carrinhoData.carrinho.forEach(item => {
    subtotal += item.preco * item.quantidade;
  });
  
  carrinhoData.resumoPedido.subtotal = subtotal;
  carrinhoData.resumoPedido.total = subtotal + carrinhoData.resumoPedido.taxaServico;
}

// Função para adicionar eventos aos elementos
function adicionarEventos() {
  // Botão limpar carrinho
  document.querySelector('.btn-limpar')?.addEventListener('click', limparCarrinho);
  
  // Botões de remover item
  document.querySelectorAll('.btn-remover').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = parseInt(this.closest('.produtos').getAttribute('data-id'));
      removerItem(itemId);
    });
  });
  
  // Botões de favoritar
  document.querySelectorAll('.btn-favorito').forEach(btn => {
    btn.addEventListener('click', function() {
      const itemId = parseInt(this.closest('.produtos').getAttribute('data-id'));
      toggleFavorito(itemId);
    });
  });
  
  // Botões de aumentar quantidade
  document.querySelectorAll('.btn-aumentar').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.previousElementSibling;
      input.stepUp();
      atualizarQuantidade(input);
    });
  });
  
  // Botões de diminuir quantidade
  document.querySelectorAll('.btn-diminuir').forEach(btn => {
    btn.addEventListener('click', function() {
      const input = this.nextElementSibling;
      input.stepDown();
      atualizarQuantidade(input);
    });
  });
  
  // quantidade p/ mudanças manuais
  document.querySelectorAll('.quantidade-input').forEach(input => {
    input.addEventListener('change', function() {
      atualizarQuantidade(this);
    });
  });
}

// Função para limpar o carrinho
function limparCarrinho() {
  if (confirm('Tem certeza que deseja limpar todo o carrinho?')) {
    carrinhoData.carrinho = [];
    calcularResumo();
    atualizarCarrinho();
  }
}

// Função para remover um item
function removerItem(id) {
  if (confirm('Remover este item do carrinho?')) {
    carrinhoData.carrinho = carrinhoData.carrinho.filter(item => item.id !== id);
    calcularResumo();
    atualizarCarrinho();
  }
}

// Função para favoritar/desfavoritar
function toggleFavorito(id) {
  const item = carrinhoData.carrinho.find(item => item.id === id);
  if (item) {
    item.favorito = !item.favorito;
    atualizarCarrinho();
  }
}

// Função para atualizar a quantidade
function atualizarQuantidade(input) {
  const itemId = parseInt(input.closest('.produtos').getAttribute('data-id'));
  const novaQuantidade = parseInt(input.value);
  
  const item = carrinhoData.carrinho.find(item => item.id === itemId);
  if (item) {
    item.quantidade = novaQuantidade;
    calcularResumo();
    atualizarCarrinho();
  }
}

// Inicializa o carrinho quando a página carrega
document.addEventListener('DOMContentLoaded', function() {
  atualizarCarrinho();
});

// Pagamento
document.querySelector('.btn-checkout').addEventListener('click', function() {
  alert('Redirecionando para o pagamento...');
});