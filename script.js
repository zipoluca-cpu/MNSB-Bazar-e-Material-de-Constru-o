/* =====================================
   MNSB - BAZAR E MATERIAL DE CONSTRUCAO
   Funcionalidades do site
   ===================================== */

// WhatsApp cadastrado para a loja.
// Confirme o número antes de publicar.
const whatsappMNSB = "5521964883188";

// Atualiza o ano do rodapé.
document.getElementById("anoAtual").textContent =
    new Date().getFullYear();

// -------------------------------------
// MENU PARA CELULAR
// -------------------------------------

const menuToggle = document.getElementById("menuToggle");
const menuPrincipal = document.getElementById("menuPrincipal");

menuToggle.addEventListener("click", () => {
    const aberto = menuPrincipal.classList.toggle("aberto");

    menuToggle.setAttribute("aria-expanded", String(aberto));
    menuToggle.setAttribute(
        "aria-label",
        aberto ? "Fechar menu" : "Abrir menu"
    );

    menuToggle.textContent = aberto ? "✕" : "☰";
});

// Fecha o menu após clicar em uma opção.
menuPrincipal.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
        menuPrincipal.classList.remove("aberto");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Abrir menu");
        menuToggle.textContent = "☰";
    });
});

// -------------------------------------
// PESQUISA DE PRODUTOS
// -------------------------------------

const buscaProduto = document.getElementById("buscaProduto");
const listaProdutos = document.getElementById("listaProdutos");
const produtos = Array.from(
    listaProdutos.querySelectorAll(".produto")
);
const semResultados = document.getElementById("semResultados");
const limparBusca = document.getElementById("limparBusca");

function pesquisarProdutos() {
    const termo = buscaProduto.value
        .trim()
        .toLocaleLowerCase("pt-BR");

    let quantidadeEncontrada = 0;

    produtos.forEach((produto) => {
        const nome = produto.dataset.nome
            .toLocaleLowerCase("pt-BR");

        const titulo = produto.querySelector("h3").textContent
            .toLocaleLowerCase("pt-BR");

        const encontrado =
            nome.includes(termo) || titulo.includes(termo);

        produto.hidden = !encontrado;

        if (encontrado) {
            quantidadeEncontrada++;
        }
    });

    semResultados.hidden = quantidadeEncontrada > 0;
}

buscaProduto.addEventListener("input", pesquisarProdutos);

limparBusca.addEventListener("click", () => {
    buscaProduto.value = "";
    pesquisarProdutos();
    buscaProduto.focus();
});

// -------------------------------------
// ABRIR WHATSAPP COM UMA CATEGORIA
// -------------------------------------

function abrirWhatsApp(mensagem) {
    const endereco =
        `https://wa.me/${whatsappMNSB}?text=${encodeURIComponent(mensagem)}`;

    window.open(endereco, "_blank", "noopener,noreferrer");
}

document.querySelectorAll("[data-categoria]").forEach((botao) => {
    botao.addEventListener("click", () => {
        const categoria = botao.dataset.categoria;

        const mensagem =
            `Olá! Encontrei o site da MNSB Bazar e Material de Construção.\n\n` +
            `Gostaria de consultar os produtos da categoria: ${categoria}.\n` +
            `Poderiam informar os produtos disponíveis e os preços?`;

        abrirWhatsApp(mensagem);
    });
});

// -------------------------------------
// CONSULTAR UM PRODUTO
// -------------------------------------

document.querySelectorAll("[data-produto]").forEach((botao) => {
    botao.addEventListener("click", () => {
        const produto = botao.dataset.produto;
        const campoProduto = document.getElementById("produtoCliente");

        campoProduto.value = produto;

        document.getElementById("orcamento").scrollIntoView({
            behavior: "smooth"
        });

        campoProduto.focus({ preventScroll: true });
    });
});

// -------------------------------------
// FORMULÁRIO DE ORÇAMENTO
// -------------------------------------

const formOrcamento = document.getElementById("formOrcamento");

formOrcamento.addEventListener("submit", (evento) => {
    evento.preventDefault();

    const nome = document.getElementById("nomeCliente")
        .value.trim();

    const produto = document.getElementById("produtoCliente")
        .value.trim();

    const quantidade = document.getElementById("quantidade")
        .value.trim();

    const detalhes = document.getElementById("detalhes")
        .value.trim();

    if (!nome || !produto || !quantidade) {
        alert("Preencha seu nome, o produto e a quantidade.");
        return;
    }

    let mensagem =
        `Olá, MNSB Bazar e Material de Construção!\n\n` +
        `Gostaria de solicitar um orçamento.\n\n` +
        `Nome: ${nome}\n` +
        `Produto: ${produto}\n` +
        `Quantidade aproximada: ${quantidade}`;

    if (detalhes) {
        mensagem += `\nDetalhes: ${detalhes}`;
    }

    mensagem +=
        "\n\nPoderiam informar o preço e a disponibilidade?";

    abrirWhatsApp(mensagem);
});
