const cardOverlay = document.getElementById('cardOverlay');
const filterButtons = document.querySelectorAll('.filter-buttons button');
const imagesGrid = document.getElementById('imagesGrid');

// Filtros extras
const filtrosExtras = ['Eletrônicos', 'Instrumentos', 'Games', 'Brinquedos'];
const extraFilterOverlay = document.getElementById('extraFilterOverlay');
const extraFilterButtons = document.getElementById('extraFilterButtons');

// Dicionário com imagens por categoria
const imagensPorCategoria = {
  'Livros': ['livro1.png', 'livro2.png', 'livro3.png', 'livro4.png', 'livro5.png', 'livro6.png'],
  'Roupas': ['roupa1.png', 'roupa2.png', 'roupa3.png', 'roupa4.png', 'roupa5.png', 'roupa6.png'],
  'Tênis': ['tenis1.png', 'tenis2.png', 'tenis3.png', 'tenis4.png', 'tenis5.png', 'tenis6.png'],
  'Acessórios': ['Acessórios1.png', 'Acessórios2.png', 'Acessórios3.png', 'Acessórios4.png', 'Acessórios5.png', 'Acessórios6.png'],
  'Cartão': ['Cartão1.png', 'Cartão2.png', 'Cartão3.png', 'Cartão4.png', 'Cartão5.png', 'Cartão6.png'],
  'Celular': ['Celular1.png', 'Celular2.png', 'Celular3.png', 'Celular4.png', 'Celular5.png', 'Celular6.png'],
  'Notebook': ['Notebook1.png', 'Notebook2.png', 'Notebook3.png', 'Notebook4.png', 'Notebook5.png', 'Notebook6.png'],
  'Eletrônicos': ['Eletrônicos1.png', 'Eletrônicos2.png'],
  'Instrumentos': ['Instrumentos1.png', 'Instrumentos2.png'],
  'Games': ['Games1.png', 'Games2.png'],
  'Brinquedos': ['Brinquedos1.png', 'Brinquedos2.png']
};

// Abertura dos cards principais
filterButtons.forEach(button => {
  const categoria = button.textContent.trim();

  // Se for "+ Outros", abre outro card
  if (categoria === '+ Outros') return;

  button.addEventListener('click', () => {
    const imagens = imagensPorCategoria[categoria];
    if (imagens) {
      imagesGrid.innerHTML = imagens.map(src => `<img src="${src}" alt="${categoria}">`).join('');
    } else {
      imagesGrid.innerHTML = `<p>Nenhuma imagem encontrada para esta categoria.</p>`;
    }

    cardOverlay.classList.remove('hidden');
  });
});

// Botão "+ Outros" abre o overlay de filtros extras
document.getElementById('outrosBtn').addEventListener('click', () => {
  extraFilterButtons.innerHTML = filtrosExtras.map(filtro =>
    `<button>${filtro}</button>`
  ).join('');

  extraFilterOverlay.classList.remove('hidden');
});

// Clique nos botões dentro do card de filtros extras
extraFilterButtons.addEventListener('click', (event) => {
  if (event.target.tagName === 'BUTTON') {
    const categoria = event.target.textContent.trim();
    const imagens = imagensPorCategoria[categoria];

    if (imagens) {
      imagesGrid.innerHTML = imagens.map(src => `<img src="${src}" alt="${categoria}">`).join('');
    } else {
      imagesGrid.innerHTML = `<p>Nenhuma imagem encontrada para esta categoria.</p>`;
    }

    extraFilterOverlay.classList.add('hidden'); // Fecha filtros extras
    cardOverlay.classList.remove('hidden');     // Abre card com imagens
  }
});

// Fechar cards
function fecharCard() {
  cardOverlay.classList.add('hidden');
  imagesGrid.innerHTML = '';
}

function fecharExtraCard() {
  extraFilterOverlay.classList.add('hidden');
}