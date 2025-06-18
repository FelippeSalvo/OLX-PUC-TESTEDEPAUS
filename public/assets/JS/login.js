 
function carregarUsuarios() {
    return JSON.parse(localStorage.getItem('usuarios')) || [];
}

 
function salvarUsuarios(usuarios) {
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

 
function exibirErro(elemento, mensagem) {
    elemento.textContent = mensagem;
    elemento.style.display = "block";
}

 
function limparErro(elemento) {
    elemento.textContent = "";
    elemento.style.display = "none";
}

 
function emailValido(email) {
    return email.endsWith("@sga.pucminas.br");
}

 
const botaoCadastro = document.getElementById('botaoCadastro');
if (botaoCadastro) {
    const erroDiv = document.getElementById('cadastroErro');

    botaoCadastro.addEventListener('click', () => {
        limparErro(erroDiv);

        const nome = document.getElementById('usuario').value.trim();
        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const confirmarSenha = document.getElementById('confirmarSenha').value.trim();
        const tipoConta = document.getElementById('tipoConta').value;
 
        if (!nome || !email || !senha || !confirmarSenha || !tipoConta) {
            exibirErro(erroDiv, "Preencha todos os campos.");
            return;
        }

        if (!emailValido(email)) {
            exibirErro(erroDiv, "Use um email institucional (@sga.pucminas.br).");
            return;
        }

        if (senha !== confirmarSenha) {
            exibirErro(erroDiv, "As senhas não coincidem.");
            return;
        }

        const usuarios = carregarUsuarios();

        const emailExiste = usuarios.some(u => u.email === email);
        const nomeExiste = usuarios.some(u => u.nomeUsuario === nome);

        if (emailExiste) {
            exibirErro(erroDiv, "Este email já está cadastrado.");
            return;
        }

        if (nomeExiste) {
            exibirErro(erroDiv, "Este nome de usuário já está cadastrado.");
            return;
        }

        const novoUsuario = {
            id: Date.now(),
            nomeUsuario: nome,
            email,
            senha,
            tipoConta
        };

        usuarios.push(novoUsuario);
        salvarUsuarios(usuarios);

        window.location.href = "index.html";
    });
}

const botaoLogin = document.getElementById('botaoLogin');
if (botaoLogin) {
    const erroDiv = document.getElementById('loginErro');

    botaoLogin.addEventListener('click', () => {
        limparErro(erroDiv);

        const email = document.getElementById('email').value.trim();
        const senha = document.getElementById('senha').value.trim();
        const tipoConta = document.getElementById('tipoContaLogin').value;
 
        if (!email || !senha || !tipoConta) {
            exibirErro(erroDiv, "Preencha todos os campos.");
            return;
        }

        if (!emailValido(email)) {
            exibirErro(erroDiv, "Use um email institucional (@sga.pucminas.br).");
            return;
        }

        const usuarios = carregarUsuarios();

        const usuario = usuarios.find(
            u => u.email === email && u.senha === senha && u.tipoConta === tipoConta
        );

        if (usuario) {
            alert(`Bem-vindo, ${usuario.nomeUsuario}!`);
            window.location.href = "index.html";
        } else {
            exibirErro(erroDiv, "Email, senha ou tipo de conta incorretos.");
        }
    });
}
