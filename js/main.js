const heroesList = document.querySelector('.heroes-list');
const filtersDiv = document.querySelector('.filters');

const dotaApi = 'https://api.opendota.com/api';

// zlFetch(`${dotaApi}/heroStats`)
//   .then(response => console.log(response.body))
//   .catch(error => console.log(error));
// Total list fetch call

zlFetch(`${dotaApi}/heroStats`).then(response => {
  const heroes = response.body;
  heroes.forEach(hero => {
    const li = document.createElement('li');
    li.classList.add('hero');
    li.innerHTML = `
    <a href="#">
    <span class="hero__name"> ${hero.localized_name} </span>
    <img src="https://api.opendota.com${hero.img}" alt="${hero.localized_name} image">
  </a> `;
    // looping through the hero list to build the li dynamically
    heroesList.appendChild(li);
  });

  filtersDiv.addEventListener('change', event => {
    const selectedCheckboxes = [
      ...document.querySelectorAll('#attack-type input:checked'),
    ].map(checkbox => checkbox.id);
    // listening for a checkbox on the input attack-type tab

    const selectedAttackTypes = [
      ...document.querySelectorAll('#attack-type input:checked'),
    ].map(checkbox => checkbox.id);
    console.log(selectedAttackTypes);
    // listening for which type checkbox input was checked

    const filtered = heroes.filter(hero => {
      const attackType = hero.attack_type.toLowerCase();
      // changing cases so input matches selection
      return selectedAttackTypes.includes(attackType);
      // if hero attack type is found, it will be included
    });

    heroesList.innerHTML = '';
    // remove the current list of heroes by setting .heroes-list's innerHTML to ''
    filtered.forEach(hero => {
      const li = document.createElement('li');
      li.classList.add('hero');
      li.innerHTML = `
      <a href="#">
        <span class="hero__name"> ${hero.localized_name} </span>
        <img src="https://api.opendota.com${hero.img}" alt="${hero.localized_name} image">
      </a> `;
      // creating the new li elements and updating the DOM list
      heroesList.appendChild(li);
      // displaying the new list

      const filtered = heroes.filter(hero => {
        if (selectedAttackTypes.length === 0) return true;
        const attackType = hero.attack_type.toLowerCase();
        return selectedAttackTypes.includes(attackType);
        // displays full list when no input boxes are checked
      });
    });
  });
});
