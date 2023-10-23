/* Recebe o elemento main para testes */
const main = document.querySelector("main");

/* Muda a visibilidade de um elemento de acordo com a altura da DOM */
document.addEventListener("scroll", () => {
	document.querySelectorAll(".about--text").forEach((elm) => {
		const rect = elm.getBoundingClientRect();
		/* fazendo responsividade */
		if (rect.bottom <= window.innerHeight) {
			elm.classList.add("visible");
			if (main.clientWidth <= 900) {
				elm.style.minWidth = "85%";
				elm.style.maxWidth = "85%";
			} else {
				elm.style.minWidth = "50%";
				elm.style.maxWidth = "50%";
			}
		} else {
			if (elm.classList.contains("visible")) {
				elm.classList.remove("visible");
			}
			elm.style.minWidth = "100%";
		}
	});

    /* Efeito de sticky no cabeçalho */
	const header = document.querySelector("header");
	if (window.scrollY > 50) {
		header.classList.remove("sticky");
	} else {
		header.classList.add("sticky");
	}
});
