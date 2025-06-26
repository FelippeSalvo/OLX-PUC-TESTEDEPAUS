document.addEventListener("DOMContentLoaded", () => {
  // ----------------------------
  // CARROSSEL AUTOMÁTICO
  // ----------------------------
  const carouselContainer = document.querySelector(".carousel-container");
  const images = document.querySelectorAll(".carousel-image");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");
  
  // Cria os indicadores (dots)
  const indicatorsContainer = document.createElement("div");
  indicatorsContainer.classList.add("carousel-indicators");
  
  images.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.dataset.index = index;
    indicatorsContainer.appendChild(dot);
  });
  
  carouselContainer.appendChild(indicatorsContainer);
  const dots = document.querySelectorAll(".dot");
  
  let currentIndex = 0;
  let intervalId = null;
  const slideInterval = 5000; // 5 segundos
  
  // Mostra o slide atual
  function showSlide(index) {
    // Esconde todas as imagens e remove a classe active
    images.forEach(img => {
      img.classList.remove("active");
      img.style.opacity = 0;
    });
    
    // Remove a classe active de todos os dots
    dots.forEach(dot => dot.classList.remove("active"));
    
    // Mostra a imagem atual e ativa o dot correspondente
    images[index].classList.add("active");
    images[index].style.opacity = 1;
    dots[index].classList.add("active");
    
    currentIndex = index;
  }
  
  // Avança para o próximo slide
  function nextSlide() {
    const newIndex = (currentIndex + 1) % images.length;
    showSlide(newIndex);
  }
  
  // Volta para o slide anterior
  function prevSlide() {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    showSlide(newIndex);
  }
  
  // Inicia o carrossel automático
  function startCarousel() {
    intervalId = setInterval(nextSlide, slideInterval);
  }
  
  // Para o carrossel automático (quando o usuário interage)
  function stopCarousel() {
    clearInterval(intervalId);
  }
  
  // Event listeners
  prevBtn.addEventListener("click", () => {
    stopCarousel();
    prevSlide();
    startCarousel();
  });
  
  nextBtn.addEventListener("click", () => {
    stopCarousel();
    nextSlide();
    startCarousel();
  });
  
  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      stopCarousel();
      const dotIndex = parseInt(dot.dataset.index);
      showSlide(dotIndex);
      startCarousel();
    });
  });
  
  // Pausa o carrossel quando o mouse está sobre ele
  carouselContainer.addEventListener("mouseenter", stopCarousel);
  
  // Retoma o carrossel quando o mouse sai
  carouselContainer.addEventListener("mouseleave", startCarousel);
  
  // Inicia o carrossel
  showSlide(0);
  startCarousel();

  // ----------------------------
  // CÓDIGO DOS ANÚNCIOS (mantido do original)
  // ----------------------------
  let anuncios = [];
  let currentPage = 1;
  const itemsPerPage = 9;
  let currentCategoria = "Todos";

  const adsGrid = document.querySelector(".ads-grid");
  const pagination = document.querySelector(".pagination");
  const filterButtons = document.querySelectorAll(".filters button");

  fetch("db/anuncios.json")
    .then(response => response.json())
    .then(data => {
      anuncios = data;
      renderPage(currentPage);
    })
    .catch(err => console.error("Erro ao carregar anúncios:", err));

  function getAnunciosFiltrados() {
    if (currentCategoria === "Todos") return anuncios;
    return anuncios.filter(anuncio => anuncio.categoria === currentCategoria);
  }
  
// Ligando o ver mais com a minha pagina de detalhes
  function renderPage(page) {
  adsGrid.innerHTML = "";
  const filtrados = getAnunciosFiltrados();
  const start = (page - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  const items = filtrados.slice(start, end);

  items.forEach(anuncio => {
    const card = document.createElement("div");
    card.classList.add("ad-card");

    card.innerHTML = `
      <img src="${anuncio.imagem}" alt="${anuncio.titulo}" class="image-placeholder">
      <div class="ad-info">
        <h3><i class="fas fa-tag"></i> ${anuncio.titulo}</h3>
        <p>${anuncio.descricao}</p>
        <span class="price">${anuncio.preco}</span>
        <button class="btn-card" data-id="${anuncio.id}">Ver mais</button>
      </div>
    `;
    adsGrid.appendChild(card);
  });

  const verMaisButtons = document.querySelectorAll(".btn-card");
  verMaisButtons.forEach(button => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-id");
      window.location.href = `detalhes.html?id=${id}`;
    });
  });


  const totalPages = Math.ceil(filtrados.length / itemsPerPage);
  pagination.innerHTML = "";
  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.textContent = i;
    btn.setAttribute("data-page", i);
    if (i === page) btn.classList.add("active");
    pagination.appendChild(btn);
  }
}


  pagination.addEventListener("click", (e) => {
    const button = e.target.closest("button[data-page]");
    if (button) {
      const selectedPage = parseInt(button.getAttribute("data-page"));
      currentPage = selectedPage;
      renderPage(currentPage);
    }
  });

  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      currentCategoria = button.textContent;
      currentPage = 1;
      renderPage(currentPage);

      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
    });
  });
});