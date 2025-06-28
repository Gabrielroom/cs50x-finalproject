let currentPage = 1;
const itemsPerPage = 10;

function openAddProductModal () {
    populateSelect();
    document.getElementById("add-product-modal").classList.remove("hidden");
}


function openAddQuantityModal () {
    populateSelect();
    document.getElementById("add-quantity-modal").classList.remove("hidden");
}

function closeModal(id) {
    document.getElementById(id).classList.add("hidden");
}

// Add new product
async function addProduct() {
    const name = document.getElementById("new-name").value;
    const qty = parseInt(document.getElementById("new-qty").value);
    const type = document.getElementById("new-type").value;

    if (!name || isNaN(qty) || !type) {
        alert("Preencha todos os campos.");
        return;
    }


    await fetch("/produtos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome: name, quantidade: qty, tipo: type })
    });

    closeModal("add-product-modal");
    renderTable();
}

// Add QTY per Product
async function addQuantity() {
    const select = document.getElementById("product-select");
    const qty = parseInt(document.getElementById("add-qty").value);

    if (isNaN(qty)) {
        alert("Quantidade inválida!");
        return;
    }

    const productId = select.value;

    await fetch(`/produtos/${productId}/quantidade`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ quantidade: qty })
    });

    closeModal("add-quantity-modal");
    renderTable();
}

// Delete Product
async function deleteProduct(id) {
    if (!confirm("Tem certeza que deseja excluir este produto?")) return;

    await fetch(`/produtos/${id}`, {
        method: "DELETE"
    });

    renderTable();
    populateSelect();
}

// Render Table
async function renderTable() {
    const tbody = document.getElementById("product-table");
    const pagination = document.getElementById("pagination");
    tbody.innerHTML = "";

    const res = await fetch("/produtos");
    const products = await res.json();

    const totalPages = Math.ceil(products.length / itemsPerPage);
    if (currentPage > totalPages) currentPage = totalPages || 1;
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    products.slice(start, end).forEach((p) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td data-label="Nome">${p.nome}</td>
            <td data-label="Quantidade">${p.quantidade}</td>
            <td data-label="Tipo">${p.tipo}</td>
            <td data-label="Cadastro em">${p.criado_em}</td>
            <td data-label="Última atualização">${p.atualizado_em}</td>
            <td><button class="delete-btn" onclick="deleteProduct(${p.id})">🗑️</button></td>
        `;
        tbody.appendChild(row);
    });

    pagination.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.textContent = i;
        if (i === currentPage) btn.classList.add("active");
        btn.onclick = () => {
            currentPage = i;
            renderTable();
        };
        pagination.appendChild(btn);
    }
}

async function populateSelect() {
    const select = document.getElementById("product-select");
    select.innerHTML = "";

    const res = await fetch("/produtos");
    const products = await res.json();

    products.forEach((p) => {
        const opt = document.createElement("option");
        opt.textContent = p.nome;
        opt.value = p.id;
        select.appendChild(opt);
    });
}


async function login() {
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value;

    if (!username || !password) {
        alert("Preencha usuário e senha.");
        return;
    }

    const res = await fetch("/login", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    if (res.ok) {
        document.getElementById("login-screen").classList.add("hidden");
        document.getElementById("main-screen").classList.remove("hidden");
        renderTable();
        populateSelect();
    } else {
        const data = await res.json();
        alert(data.error || "Erro ao logar.");
    }
}

function openRegister() {
    document.getElementById("login-screen").classList.add("hidden");
    document.getElementById("register-screen").classList.remove("hidden");
}

function closeRegister () {
    document.getElementById("register-screen").classList.add("hidden");
    document.getElementById("login-screen").classList.remove("hidden");
}


async function register () {
    const username = document.getElementById("reg-username").value.trim();
    const password = document.getElementById("reg-password").value;

    if (!username || !password) {
        alert("Preencha usuário e senha para se registrar.");
        return;
    }

    const res = await fetch("/register", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({username, password})
    });

    const data = await res.json();

    if (res.ok) {
        alert("Usuário registrado com sucesso! Faça login.");
        closeRegister();
    } else {
        alert(data.error || "Erro ao registrar.");
    }
}
