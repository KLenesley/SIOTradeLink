console.log("Extension crée par Lenesley Kylian un élève de SIO au lycée NDLP");

// Fonction pour insérer le bouton
function addRedirectionButton() {
  // Supprime l'ancien bouton (si présent)
  const oldButton = document.getElementById('redirect-button');
  if (oldButton) oldButton.remove();

  // Vérifie si l'URL contient un ID d'instrument
  const match = window.location.pathname.match(/\/instrument\/([^\/]+)\/information/);

  if (match) {
    const id = match[1]; // Extrait l'ID (exemple : US00724F1012)
    console.log("ID détecté :", id);

    // Crée un bouton pour la redirection
    const button = document.createElement('button');
    button.id = 'redirect-button';
    button.textContent = 'Voir sur Boursorama';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '1000';
    button.style.padding = '10px 20px';
    button.style.backgroundColor = '#ff0000';
    button.style.color = 'white';
    button.style.border = 'none';
    button.style.borderRadius = '5px';
    button.style.cursor = 'pointer';

    // Effet de survol : changer la couleur lors du survol
    button.addEventListener('mouseover', () => {
      button.style.backgroundColor = '#B22222'; // Change la couleur au survol
    });

    button.addEventListener('mouseout', () => {
      button.style.backgroundColor = '#ff0000'; // Restaure la couleur d'origine
    });

    button.addEventListener('click', () => {
      const url = `https://www.boursorama.com/cours/${id}`;
      console.log("Redirection vers :", url);
      window.open(url, '_blank'); // Ouvre le lien dans un nouvel onglet
    });

    // Ajoute le bouton à la page
    document.body.appendChild(button);
    console.log("Bouton ajouté !");
  } else {
    console.log("Aucun ID trouvé dans l'URL.");
  }
}

// Fonction pour surveiller les changements d'URL
function observeUrlChanges() {
  let lastUrl = window.location.href;

  const observer = new MutationObserver(() => {
    const currentUrl = window.location.href;
    if (currentUrl !== lastUrl) {
      console.log("URL modifiée :", currentUrl);
      lastUrl = currentUrl;
      addRedirectionButton(); // Réexécute la logique d'injection du bouton
    }
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

// Lance l'observation des changements d'URL
observeUrlChanges();

// Ajoute initialement le bouton uniquement si l'ID est présent
addRedirectionButton();
