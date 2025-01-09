document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value.trim().toLowerCase();
    if (!searchInput) {
        alert('Please enter a Pokémon name or ID.');
        return;
    }

    // Show loading spinner
    document.getElementById('loading-spinner').classList.add('visible');

    fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${searchInput}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Pokémon not found');
            }
            return response.json();
        })
        .then(data => {
            displayPokemonInfo(data);
        })
        .catch(error => {
            alert(error.message);
            clearPokemonInfo();
        })
        .finally(() => {
            // Hide loading spinner
            document.getElementById('loading-spinner').classList.remove('visible');
        });
});

function displayPokemonInfo(pokemon) {
    //  info card
    document.getElementById('pokemon-info').classList.add('visible');

    // Display Pokémon details
    document.getElementById('pokemon-name').textContent = pokemon.name.toUpperCase();
    document.getElementById('pokemon-id').textContent = `#${pokemon.id}`;
    document.getElementById('weight').textContent = pokemon.weight;
    document.getElementById('height').textContent = pokemon.height;

    // Display  types
    const typesContainer = document.getElementById('types');
    typesContainer.innerHTML = '';
    pokemon.types.forEach(type => {
        const typeElement = document.createElement('span');
        typeElement.textContent = type.type.name.toUpperCase();
        typeElement.classList.add(type.type.name.toLowerCase()); // Add class for styling
        typesContainer.appendChild(typeElement);
    });

    // Display  stats
    document.getElementById('hp').textContent = pokemon.stats[0].base_stat;
    document.getElementById('attack').textContent = pokemon.stats[1].base_stat;
    document.getElementById('defense').textContent = pokemon.stats[2].base_stat;
    document.getElementById('special-attack').textContent = pokemon.stats[3].base_stat;
    document.getElementById('special-defense').textContent = pokemon.stats[4].base_stat;
    document.getElementById('speed').textContent = pokemon.stats[5].base_stat;

    // Display  sprite
    const spriteContainer = document.getElementById('sprite-container');
    spriteContainer.innerHTML = '';
    const spriteImg = document.createElement('img');
    spriteImg.id = 'sprite';
    spriteImg.src = pokemon.sprites.front_default;
    spriteContainer.appendChild(spriteImg);
}

function clearPokemonInfo() {
    // Hide  info card
    document.getElementById('pokemon-info').classList.remove('visible');

    // Clear all fields
    document.getElementById('pokemon-name').textContent = '';
    document.getElementById('pokemon-id').textContent = '';
    document.getElementById('weight').textContent = '';
    document.getElementById('height').textContent = '';
    document.getElementById('types').innerHTML = '';
    document.getElementById('hp').textContent = '';
    document.getElementById('attack').textContent = '';
    document.getElementById('defense').textContent = '';
    document.getElementById('special-attack').textContent = '';
    document.getElementById('special-defense').textContent = '';
    document.getElementById('speed').textContent = '';
    document.getElementById('sprite-container').innerHTML = '';
}