const books = {
  prince: {
    title: "O Pequeno Príncipe", author: "Antoine de Saint-Exupéry", category: "Aventura · Literatura clássica",
    pages: "96", year: "1943", cover: "cover-prince",
    description: "O livro O Pequeno Príncipe, escrito por Antoine de Saint-Exupéry em 1943, conta a história de um piloto de avião que sofre uma pane e cai no deserto do Saara. Lá, ele conhece um menino loiro e misterioso vindo de um pequeno asteroide, o B-612."
  },
  nights: {
    title: "Noites brancas", author: "Fiódor Dostoiévski", category: "Romance · Literatura clássica",
    pages: "120", year: "1848", cover: "cover-nights",
    description: "Uma narrativa clássica sobre um jovem solitário que conhece uma moça durante as noites de São Petersburgo. Em poucos encontros, os dois compartilham sonhos, esperanças e sentimentos."
  },
  metamorphosis: {
    title: "Metamorfose", author: "Franz Kafka", category: "Literatura clássica",
    pages: "96", year: "1915", cover: "cover-metamorphosis",
    description: "A obra acompanha Gregor Samsa, que desperta transformado em uma criatura inesperada e precisa lidar com as mudanças em sua vida e nas relações com sua família."
  },
  harry: {
    title: "Harry Potter: e o Cálice de Fogo", author: "J. K. Rowling", category: "Aventura · Fantasia",
    pages: "480", year: "2000", cover: "cover-harry",
    description: "No quarto ano em Hogwarts, Harry é envolvido no Torneio Tribruxo, uma competição mágica que traz desafios inesperados e acontecimentos que mudarão o mundo bruxo."
  },
  friends: {
    title: "Como fazer amigos e influenciar pessoas", author: "Dale Carnegie", category: "Desenvolvimento pessoal",
    pages: "288", year: "1936", cover: "cover-friends",
    description: "Um livro de desenvolvimento pessoal que apresenta princípios para melhorar a comunicação, construir relações positivas e compreender melhor as pessoas."
  }
};

const searchInput = document.getElementById("searchInput");
const bookCards = [...document.querySelectorAll(".book-card")];
const emptyState = document.getElementById("emptyState");
const bookModal = document.getElementById("bookModal");
const successModal = document.getElementById("successModal");
let selectedBook = books.prince;

searchInput.addEventListener("input", () => {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  let visible = 0;
  bookCards.forEach(card => {
    const haystack = `${card.dataset.title} ${card.dataset.author} ${card.dataset.category}`.toLocaleLowerCase("pt-BR");
    const match = haystack.includes(query);
    card.hidden = !match;
    if (match) visible++;
  });
  emptyState.hidden = visible !== 0;
});

function openBook(key) {
  const book = books[key];
  if (!book) return;
  selectedBook = book;
  document.getElementById("modalTitle").textContent = book.title;
  document.getElementById("modalAuthor").textContent = `Por: ${book.author}`;
  document.getElementById("modalCategory").textContent = book.category;
  document.getElementById("modalDescription").textContent = book.description;
  document.getElementById("modalPages").textContent = book.pages;
  document.getElementById("modalYear").textContent = book.year;
  const cover = document.getElementById("modalCover");
  cover.className = `modal-book-cover cover ${book.cover}`;
  if (key === "prince") cover.innerHTML = '<span class="cover-stars">✦ &nbsp; · &nbsp; ✧</span><span class="cover-planet">🪐</span><strong>O Pequeno<br>Príncipe</strong><small>ANTOINE DE SAINT-EXUPÉRY</small>';
  if (key === "nights") cover.innerHTML = '<span class="cover-moon">☾</span><strong>Noites<br>brancas</strong><small>FIÓDOR DOSTOIÉVSKI</small>';
  if (key === "metamorphosis") cover.innerHTML = '<span class="cover-line"></span><strong>METAMORFOSE</strong><small>FRANZ KAFKA</small>';
  if (key === "harry") cover.innerHTML = '<span class="cover-light">✦</span><strong>HARRY POTTER<br><small>E O CÁLICE DE FOGO</small></strong><span class="cover-cup">♜</span>';
  if (key === "friends") cover.innerHTML = '<span class="cover-sun">◉</span><strong>Como fazer<br>amigos e influenciar<br>pessoas</strong><small>DALE CARNEGIE</small>';
  bookModal.hidden = false;
  document.body.style.overflow = "hidden";
}
function closeBook() { bookModal.hidden = true; document.body.style.overflow = ""; }
document.querySelectorAll("[data-book]").forEach(button => button.addEventListener("click", () => openBook(button.dataset.book)));
document.getElementById("closeModal").addEventListener("click", closeBook);
bookModal.addEventListener("click", e => { if (e.target === bookModal) closeBook(); });

document.getElementById("borrowButton").addEventListener("click", () => {
  closeBook();
  document.getElementById("receiptTitle").textContent = selectedBook.title;
  document.getElementById("receiptAuthor").textContent = selectedBook.author;
  document.getElementById("receiptDate").textContent = new Date().toLocaleString("pt-BR", { dateStyle: "short", timeStyle: "short" });
  successModal.hidden = false;
  document.body.style.overflow = "hidden";
});
function closeSuccess() { successModal.hidden = true; document.body.style.overflow = ""; }
document.getElementById("closeSuccess").addEventListener("click", closeSuccess);
document.getElementById("continueButton").addEventListener("click", closeSuccess);
successModal.addEventListener("click", e => { if (e.target === successModal) closeSuccess(); });
document.getElementById("receiptButton").addEventListener("click", () => {
  const receipt = `COMPROVANTE DE EMPRÉSTIMO\\n\\nLivro: ${selectedBook.title}\\nAutor: ${selectedBook.author}\\nData: ${document.getElementById("receiptDate").textContent}\\nLeitor: Você\\n\\nAproveite sua leitura e cuide bem do livro!`;
  const blob = new Blob([receipt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url; link.download = "comprovante-emprestimo.txt"; link.click();
  URL.revokeObjectURL(url);
});
document.getElementById("loansButton").addEventListener("click", () => alert("Aqui aparecerão todos os seus empréstimos."));
document.getElementById("loginLink").addEventListener("click", e => { e.preventDefault(); alert("A tela de login pode ser conectada ao seu sistema."); });
document.getElementById("signupLink").addEventListener("click", e => { e.preventDefault(); alert("A tela de criação de conta pode ser conectada ao seu sistema."); });
document.addEventListener("keydown", e => { if (e.key === "Escape") { closeBook(); closeSuccess(); } });
