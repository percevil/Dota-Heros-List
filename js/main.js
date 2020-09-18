const dotaApi = 'https://api.opendota.com/api';
const heroesList = document.querySelector('.heroes-list');
const filtersDiv = document.querySelector('.filters');

zlFetch(`${dotaApi}/heroStats`).then(response => {
  const heroes = response.body;
  heroes.forEach(hero => {
    const li = document.createElement('li');
    li.classList.add('hero');
    li.innerHTML = `
        <a href="#">
          <span class="hero__name"> ${hero.localized_name}  </span>
          <img src="https://api.opendota.com${hero.img}" alt="${hero.localized_name} image">
        </a>
      `;
    heroesList.appendChild(li);
    //   .then(response => console.log(response.body))
    //   .catch(error => console.log(error));
  });
});

filtersDiv.addEventListener('change', event => {
  const attackTypeDiv = document.querySelector('#attack-type');
  const selectedCheckboxes = [
    ...attackTypeDiv.querySelectorAll('input:checked'),
  ].map(checkbox => checkbox.id);
  console.log(selectedCheckboxes);
  const filtered = heroes.filter(hero => {
    const attackType = hero.attack_type.toLowerCase();
    return selectedAttackTypes.includes(attackType);
  });

  heroesList.innerHTML = '';
  filtered.forEach(hero => {
    const li = document.createElement('li');
    li.classList.add('hero');
    li.innerHTML = `
      <a href="#">
        <span class="hero__name"> ${hero.localized_name} </span>
        <img src="https://api.opendota.com${hero.img}" alt="${hero.localized_name} image">
      </a>
    `;
    heroesList.appendChild(li);
  });
});
