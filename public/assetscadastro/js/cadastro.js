document.addEventListener('DOMContentLoaded', () => {
  const steps = document.querySelectorAll('.form-step');
  const form = document.getElementById("multiStepForm");
  const categoryButtons = document.querySelectorAll(".category-buttons .btn");
  const studentCardInput = document.getElementById("carteira");
  const progressBar = document.getElementById("progressBar");
  let currentStep = 0;

  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.toggle('d-none', i !== index);
    });
    updateProgressBar(index);
  }

  function updateProgressBar(index) {
    if (progressBar) {
      const percent = ((index + 1) / steps.length) * 100;
      progressBar.style.width = percent + "%";
    }
  }

  function validateCurrentStep() {
    const fields = steps[currentStep].querySelectorAll('[required]');
    let valid = true;

    fields.forEach(field => {
      if (!field.value.trim()) {
        field.classList.add('is-invalid');
        valid = false;
      } else {
        field.classList.remove('is-invalid');
      }
    });

    return valid;
  }

  function handleNextStep() {
    if (validateCurrentStep() && currentStep < steps.length - 1) {
      currentStep++;
      showStep(currentStep);
    }
  }

  function handlePrevStep() {
    if (currentStep > 0) {
      currentStep--;
      showStep(currentStep);
    }
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    const price = document.getElementById("preco")?.value;
    if (price < 0) {
      alert("O preço não pode ser negativo.");
      return;
    }

    const formData = new FormData(form);
    const formJson = {};

    formData.forEach((value, key) => {
      if (value instanceof File) {
        formJson[key] = value.name;
      } else {
        formJson[key] = value;
      }
    });

    const selectedCategory = document.querySelector(".category-buttons .btn.active");
    if (selectedCategory) {
      formJson["categoria"] = selectedCategory.dataset.value || selectedCategory.innerText;
    }

    formJson["dataPublicacao"] = new Date().toISOString();

    console.log("📦 Dados cadastrados:", formJson);

    const cadastros = JSON.parse(localStorage.getItem("cadastros")) || [];
    cadastros.push(formJson);
    localStorage.setItem("cadastros", JSON.stringify(cadastros));

    const submitBtn = form.querySelector("button[type='submit']");
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Publicando...`;

    setTimeout(() => {
      alert("Produto publicado com sucesso!");
      submitBtn.innerHTML = "Publicar Anúncio";
      submitBtn.disabled = false;
      form.reset();
      currentStep = 0;
      showStep(currentStep);
    }, 2000);
  }

  function handleStudentCardUpload(event) {
    const parent = event.target.parentNode;
    const existingPreview = parent.querySelector("img");
    if (existingPreview) existingPreview.remove();

    if (event.target.files.length > 0) {
      const preview = document.createElement("img");
      preview.src = URL.createObjectURL(event.target.files[0]);
      preview.style.maxWidth = "150px";
      preview.classList.add("mt-2");
      parent.appendChild(preview);
    }
  }

  function handleCategoryButtonClick(clickedButton) {
    categoryButtons.forEach(btn => btn.classList.remove("active"));
    clickedButton.classList.add("active");
  }

  showStep(currentStep);

  document.querySelectorAll('.next-step').forEach(btn => btn.addEventListener('click', handleNextStep));
  document.querySelectorAll('.prev-step').forEach(btn => btn.addEventListener('click', handlePrevStep));
  form.addEventListener("submit", handleFormSubmit);

  if (studentCardInput) {
    studentCardInput.addEventListener("change", handleStudentCardUpload);
  }

  categoryButtons.forEach(btn => {
    btn.addEventListener("click", () => handleCategoryButtonClick(btn));
  });
});
