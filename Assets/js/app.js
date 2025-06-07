document.addEventListener("DOMContentLoaded", () => {
  let anuncios = [];
  let currentPage = 1;
  const itemsPerPage = 9;
  let currentCategoria = "Todos";

  const adsGrid = document.querySelector(".ads-grid");
  const pagination = document.querySelector(".pagination");
  const filterButtons = document.querySelectorAll(".filters button");

  fetch("data/anuncios.json")
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
          <button class="btn-card">Ver mais</button>
        </div>
      `;
      adsGrid.appendChild(card);
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

  let slideIndex = 0;
  const slides = document.querySelectorAll(".carousel-container .carousel-image");
  const prevBtn = document.querySelector(".arrow:first-of-type");
  const nextBtn = document.querySelector(".arrow:last-of-type");

  function showSlide(index) {
    slides.forEach((img, i) => {
      img.style.display = i === index ? "block" : "none";
    });
  }

  function nextSlide() {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  }

  function prevSlide() {
    slideIndex = (slideIndex - 1 + slides.length) % slides.length;
    showSlide(slideIndex);
  }

  showSlide(slideIndex);
  setInterval(nextSlide, 4000);
  nextBtn.addEventListener("click", nextSlide);
  prevBtn.addEventListener("click", prevSlide);
});
