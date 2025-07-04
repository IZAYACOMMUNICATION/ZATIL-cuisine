// Données des recettes (simuleraient normalement une API ou base de données)
const recipes = [
    {
        id: 1,
        title: "Pâtes Carbonara",
        image: "images/pasta.jpg",
        time: "30 min",
        difficulty: "Moyen",
        description: "Un classique italien crémeux et savoureux.",
        ingredients: [
            "400g de spaghetti",
            "200g de pancetta ou lardons",
            "3 œufs",
            "50g de parmesan râpé",
            "Poivre noir"
        ],
        instructions: [
            "Cuire les pâtes al dente.",
            "Faire revenir la pancetta.",
            "Battre les œufs avec le parmesan.",
            "Mélanger le tout hors du feu."
        ]
    },
    {
        id: 2,
        title: "Salade César",
        image: "images/salad.jpg",
        time: "15 min",
        difficulty: "Facile",
        description: "Une salade fraîche et croquante.",
        ingredients: [
            "1 laitue romaine",
            "50g de parmesan",
            "1 œuf",
            "1 gousse d'ail",
            "Croûtons"
        ],
        instructions: [
            "Laver et couper la laitue.",
            "Préparer la sauce avec l'œuf et l'ail.",
            "Ajouter les croûtons et le parmesan."
        ]
    },
    {
        id: 3,
        title: "Tarte aux Pommes",
        image: "images/pie.jpg",
        time: "60 min",
        difficulty: "Difficile",
        description: "Un dessert traditionnel français.",
        ingredients: [
            "1 pâte brisée",
            "6 pommes",
            "100g de sucre",
            "1 œuf",
            "Cannelle"
        ],
        instructions: [
            "Étaler la pâte dans un moule.",
            "Éplucher et couper les pommes.",
            "Disposer les pommes sur la pâte.",
            "Saupoudrer de sucre et cannelle.",
            "Cuire 40 minutes à 180°C."
        ]
    }
];

// Afficher les recettes sur la page d'accueil
function displayRecipes(recipesToDisplay = recipes) {
    const container = document.getElementById('recipes-container');
    container.innerHTML = '';
    
    recipesToDisplay.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
            <div class="recipe-header">
            <img src="${recipe.image}" alt="${recipe.title}" class="recipe-img">
            <div class="recipe-info">
                <h3>${recipe.title}</h3>
                <p><strong>Temps:</strong> ${recipe.time} | <strong>Difficulté:</strong> ${recipe.difficulty}</p>
                <p>${recipe.description}</p>
                <a href="recette.html?id=${recipe.id}" class="view-recipe">Voir la recette</a>
            </div>
        `;
        container.appendChild(recipeCard);
    });
}

// Recherche de recettes
document.getElementById('search-btn').addEventListener('click', () => {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const filteredRecipes = recipes.filter(recipe => 
        recipe.title.toLowerCase().includes(searchTerm) || 
        recipe.description.toLowerCase().includes(searchTerm)
    );
    displayRecipes(filteredRecipes);
});

// Au chargement de la page
document.addEventListener('DOMContentLoaded', () => {
    // Page d'accueil
    if (document.getElementById('recipes-container')) {
        displayRecipes();
    }
    
    // Page de recette
    if (document.querySelector('.recipe-content')) {
        loadRecipe();
    }
});

// Charger une recette spécifique
function loadRecipe() {
    const urlParams = new URLSearchParams(window.location.search);
    const recipeId = parseInt(urlParams.get('id'));
    const recipe = recipes.find(r => r.id === recipeId);
    
    if (recipe) {
        document.title = `${recipe.title} | Mon Livre de Recettes`;
        
        const recipeHeader = document.querySelector('.recipe-header');
        recipeHeader.innerHTML = `
            <h2>${recipe.title}</h2>
            <img src="${recipe.image}" alt="${recipe.title}">
            <p><strong>Temps:</strong> ${recipe.time} | <strong>Difficulté:</strong> ${recipe.difficulty}</p>
        `;
        
        const ingredientsList = recipe.ingredients.map(ing => `<li>${ing}</li>`).join('');
        const instructionsList = recipe.instructions.map((inst, i) => `<li>${inst}</li>`).join('');
        
        document.querySelector('.ingredients').innerHTML = `
            <h3>Ingrédients</h3>
            <ul>${ingredientsList}</ul>
        `;
        
        document.querySelector('.instructions').innerHTML = `
            <h3>Instructions</h3>
            <ol>${instructionsList}</ol>
        `;
    } else {
        document.querySelector('.recipe-content').innerHTML = `
            <div class="error">
                <h3>Recette non trouvée</h3>
                <p>La recette que vous cherchez n'existe pas ou a été supprimée.</p>
                <a href="index.html">Retour à l'accueil</a>
            </div>
        `;
    }
}