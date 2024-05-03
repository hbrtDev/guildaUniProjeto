/*  Transição do GPT */
document.addEventListener("DOMContentLoaded", function () {
	const startButton = document.querySelector(".startBtt");
	const introContainer = document.querySelector(".intro--container");
	const appConfiguration = document.querySelector(".app--configuration");

	startButton.addEventListener("click", function (e) {
		e.preventDefault();

		appConfiguration.classList.remove('hidden')

		// Animação para rolar suavemente até o elemento de configuração do aplicativo
		smoothScrollToElement(appConfiguration);

		// Desabilita o botão enquanto a transição está ocorrendo para evitar múltiplos cliques
		startButton.disabled = true;

		// Animação para ocultar a introdução
		introContainer.style.transition = "opacity 0.5s ease-in-out"; // Configura a transição de opacidade
		introContainer.style.opacity = "0"; // Define a opacidade para 0

		// Após um pequeno intervalo, oculta a introdução e mostra a configuração do aplicativo
		setTimeout(function () {
			introContainer.style.display = "none"; // Oculta a introdução completamente
			introContainer.style.opacity = "1"; // Redefine a opacidade (para futuras exibições)
			appConfiguration.style.display = "block"; // Mostra a configuração do aplicativo
			appConfiguration.style.opacity = "1"; // Define a opacidade para 1
			startButton.disabled = false; // Habilita novamente o botão após a transição
		}, 500); // Tempo correspondente à duração da transição de opacidade
	});

	function smoothScrollToElement(element) {
		const targetPosition = element.getBoundingClientRect().top + window.scrollY;
		const startPosition = window.scrollY;
		const distance = targetPosition - startPosition;
		const duration = 800; // Duração da animação em milissegundos
		let start = null;

		function step(timestamp) {
			if (!start) start = timestamp;
			const progress = timestamp - start;
			window.scrollTo(
				0,
				easeInOutCubic(progress, startPosition, distance, duration)
			);
			if (progress < duration) {
				window.requestAnimationFrame(step);
			}
		}

		window.requestAnimationFrame(step);
	}

	function easeInOutCubic(t, b, c, d) {
		// Função de interpolação para animação suave
		t /= d / 2;
		if (t < 1) return (c / 2) * t * t * t + b;
		t -= 2;
		return (c / 2) * (t * t * t + 2) + b;
	}
});

/* Adicionando a opção de adicionar o jogador */
document.querySelector(".add--player").addEventListener("click", (e) => {
	e.preventDefault();

	/* Onde será adicionado o divElm*/
	let parentDiv = document.querySelector(".players--carousel");

	/* Div que vai ter os elementos de adicionar player */
	let divElm = document.createElement("div");
	divElm.setAttribute("class", "adding--player");

	/* Elementos de Adicionar player */
	// Criando input de nome
	let inputName = document.createElement("input");
	inputName.setAttribute("type", "text");
	inputName.setAttribute("class", "playerName");
	inputName.setAttribute("placeholder", "Insira o nome");
	inputName.setAttribute("autocomplete", "given-name");

	// Criando input de URL de Img
	let inputUrl = document.createElement("input");
	inputUrl.setAttribute("type", "text");
	inputUrl.setAttribute("class", "playerName");
	inputUrl.setAttribute("placeholder", "URL da imagem");

	// Criando input_iniciativa
	let input_iniciativa = document.createElement("input");
	input_iniciativa.setAttribute("type", "number");
	input_iniciativa.setAttribute("min", "0");
	input_iniciativa.setAttribute("placeholder", "Valor da Iniciativa");

	/* Criando o botão de adicionar jogador */
	let btnElm = document.createElement("button");
	btnElm.setAttribute("class", "confirm--player");
	btnElm.textContent = "Adicionar Jogador";

	// Adicionando os elementos à divElm
	divElm.appendChild(inputName);
	divElm.appendChild(inputUrl);
	divElm.appendChild(input_iniciativa);
	divElm.appendChild(btnElm);

	// Adicionando a divElm ao parentDiv
	parentDiv.appendChild(divElm);

	addNewPlayers();
});

// Função para gerar um ID único
function generateUniqueID() {
	const playerDivs = document.querySelectorAll(".players--carousel .player");
	const existingIDs = Array.from(playerDivs).map((div) => div.id);

	let newID = "p1"; // ID inicial padrão

	// Verifica se os IDs existentes já incluem o ID atual; se sim, incrementa o número
	for (let i = 1; i <= playerDivs.length + 1; i++) {
		const potentialID = "p" + i;
		if (!existingIDs.includes(potentialID)) {
			newID = potentialID;
			break;
		}
	}

	return newID;
}

/* Transforma os dados da ficha de jogador em uma carta de jogador */
function addNewPlayers() {
	// Seleciona todos os botões "Adicionar Jogador"
	const addButtons = document.querySelectorAll(".confirm--player");

	// Adiciona um ouvinte de evento para o clique em cada botão "Adicionar Jogador"
	addButtons.forEach((button) => {
		button.addEventListener("click", function () {
			// Obtém os valores dos campos de entrada dentro da div "adding--player" correspondente
			const addingPlayerDiv = button.closest(".adding--player");
			const playerName = addingPlayerDiv
				.querySelector('.playerName[placeholder="Insira o nome"]')
				.value.trim();
			const imageUrl = addingPlayerDiv
				.querySelector('.playerName[placeholder="URL da imagem"]')
				.value.trim();
			const initiativeValue = addingPlayerDiv
				.querySelector('[placeholder="Valor da Iniciativa"]')
				.value.trim();

			// Verifica se algum dos campos está vazio
			if (playerName === "" || imageUrl === "" || initiativeValue === "") {
				alert(
					"Por favor, preencha todos os campos antes de adicionar o jogador."
				);
				return; // Aborta a operação se algum campo estiver vazio
			}

			// Cria a div do jogador
			const playerDiv = document.createElement("div");
			playerDiv.classList.add("player");

			// Obtém um ID único para a div do jogador
			const playerId = generateUniqueID();
			playerDiv.id = playerId;

			// Adiciona o nome do jogador em negrito à div do jogador
			const playerNameElement = document.createElement("b");
			playerNameElement.textContent = playerName;
			playerDiv.appendChild(playerNameElement);

			// Adiciona a imagem do jogador à div do jogador
			const imgLabelDiv = document.createElement("div");
			imgLabelDiv.classList.add("imgLabel");
			const playerImage = document.createElement("img");
			playerImage.src = imageUrl;
			playerImage.alt = ""; // ou adicione um texto alternativo apropriado
			imgLabelDiv.appendChild(playerImage);
			playerDiv.appendChild(imgLabelDiv);

			// Adiciona o valor da iniciativa à div do jogador
			const initiativeValueElement = document.createElement("span");
			initiativeValueElement.classList.add("vlr_iniciativa");
			initiativeValueElement.textContent = initiativeValue;
			playerDiv.appendChild(initiativeValueElement);

			// Adiciona o texto "Iniciativa" à div do jogador
			const initiativeTextElement = document.createElement("p");
			initiativeTextElement.textContent = "Iniciativa";
			playerDiv.appendChild(initiativeTextElement);

			// Adiciona a div do jogador à div "adding--player" correspondente
			addingPlayerDiv.parentElement.appendChild(playerDiv);

			// Remove a div de criação de jogador
			addingPlayerDiv.remove();
		});
	});
}

/* Evento de deletar jogador */
document.querySelector(".remove--btn").addEventListener("click", (e) => {
	e.preventDefault();

	/* Remover o Hidden */
	document.querySelector(".deletePlayer--container").classList.remove("hidden");

	/* Função de remover jogador */
	document.querySelector(".delete--player").addEventListener("click", (e) => {
		e.preventDefault();
		removePlayer();
	});
});

function removePlayer() {
	/* Nome do jogador */
	let playerName = document.querySelector(".delPlayer--input").value.trim();

	/* Player Carousel - onde fica os jogadores */
	let playerCarousel = document.querySelector(".players--carousel");

	/* Removendo o jogador */
	playerCarousel.childNodes.forEach((elm) => {
		if (elm.tagName === "DIV" && elm.classList.contains("player")) {
			if (elm.children[0].textContent.trim() === playerName) {
				// Adiciona a classe de animação de fade out
				elm.classList.add("explode-out");

				// Remove o jogador após a animação
				setTimeout(() => {
					playerCarousel.removeChild(elm);
				}, 500); // Tempo de duração da animação em milissegundos
			}
		}
	});

	/* Escondendo o menu de deletar */
	document.querySelector(".deletePlayer--container").classList.add("hidden");
}

/* Organizar jogadores */
document.querySelector(".organize--btn").addEventListener("click", (e) => {
    e.preventDefault();

    // Seleciona o carrossel de jogadores
    const playerCarousel = document.querySelector(".players--carousel");

    // Obtém todos os jogadores
    const players = Array.from(playerCarousel.querySelectorAll(".player"));

    // Adiciona a classe de animação de chacoalhar
    players.forEach(player => player.classList.add("shake-animation"));

    // Remove os jogadores do carrossel após a animação
    setTimeout(() => {
        players.forEach(player => playerCarousel.removeChild(player));

        // Ordena os jogadores com base nas iniciativas (em ordem crescente)
        players.sort((a, b) => {
            const initA = parseInt(a.querySelector(".vlr_iniciativa").textContent);
            const initB = parseInt(b.querySelector(".vlr_iniciativa").textContent);
            return initA - initB; // Ordem crescente
        });

        // Adiciona os jogadores ordenados de volta ao carrossel
        players.forEach(player => {
            player.classList.remove("shake-animation");
            playerCarousel.appendChild(player);
        });
    }, 200); // Aguarda 500ms para a animação de chacoalhar

});
