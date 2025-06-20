document.addEventListener("DOMContentLoaded", async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const produtoId = urlParams.get("id") || "1";

  const res = await fetch("db/produto.json");
  const produto = await res.json();

  const mainImage = document.getElementById("mainImage");
  const thumbnailsContainer = document.getElementById("miniaturas");

  const tituloProduto = document.getElementById("titulo");
  const descricaoProduto = document.getElementById("descricao");
  const precoProduto = document.getElementById("preco");

  const categoria = document.getElementById("categoria");
  const condicao = document.getElementById("condicao");
  const ano = document.getElementById("ano");
  const localizacao = document.getElementById("localizacao");

  const nomeVendedor = document.getElementById("nomeVendedor");
  const fotoVendedor = document.getElementById("fotoVendedor");
  const telefone = document.getElementById("telefone");
  const curso = document.getElementById("curso");
  const avaliacaoContainer = document.getElementById("avaliacao");
  const membroDesdeSmall = document.querySelector(".vendedor-card small.text-muted");

  tituloProduto.textContent = produto.titulo;
  descricaoProduto.textContent = produto.descricao;
  precoProduto.textContent = `R$ ${produto.preco.toFixed(2)}`;
  categoria.textContent = produto.categoria;
  condicao.textContent = produto.condicao;
  ano.textContent = produto.ano;
  localizacao.textContent = produto.localizacao;

  nomeVendedor.textContent = produto.vendedor.nome;
  fotoVendedor.src = produto.vendedor.foto;
  fotoVendedor.alt = `Foto do vendedor ${produto.vendedor.nome}`;
  curso.textContent = produto.vendedor.curso;
  telefone.textContent = produto.vendedor.contato.telefone;
  membroDesdeSmall.textContent = `Membro desde ${produto.vendedor.membroDesde}`;

  const estrelasCheias = Math.floor(produto.vendedor.avaliacao);
  const estrelaMeia = produto.vendedor.avaliacao % 1 >= 0.5;
  avaliacaoContainer.innerHTML = "";

  for (let i = 0; i < estrelasCheias; i++) {
    avaliacaoContainer.innerHTML += `<i class="bi bi-star-fill text-warning"></i>`;
  }
  if (estrelaMeia) {
    avaliacaoContainer.innerHTML += `<i class="bi bi-star-half text-warning"></i>`;
  }
  for (let i = estrelasCheias + (estrelaMeia ? 1 : 0); i < 5; i++) {
    avaliacaoContainer.innerHTML += `<i class="bi bi-star text-warning"></i>`;
  }

  if (produto.imagens && produto.imagens.length > 0) {
    mainImage.src = produto.imagens[0];

    produto.imagens.forEach((src, index) => {
      const img = document.createElement("img");
      img.src = src;
      img.alt = `Miniatura ${index + 1}`;
      img.className = "img-thumbnail thumb-img";
      if (index === 0) img.classList.add("active-thumb");

      img.addEventListener("click", () => {
        mainImage.src = src;
        document.querySelectorAll(".thumb-img").forEach(i => i.classList.remove("active-thumb"));
        img.classList.add("active-thumb");
      });

      thumbnailsContainer.appendChild(img);
    });
  }

  

  document.getElementById("btnCarrinho").addEventListener("click", () => {
    const carrinho = JSON.parse(localStorage.getItem("carrinho") || "[]");
    carrinho.push(produto);
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    alert("Produto adicionado ao carrinho!");
  });

  document.getElementById("btnComprar").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Em breve Comprar Agora");
  });

  document.getElementById("btnChat").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Em breve Chat com o Vendedor");
  });

  document.getElementById("btnVerVendedor").addEventListener("click", (e) => {
    e.preventDefault();
    alert("Em breve Ver Perfil do Vendedor");
  });
});

