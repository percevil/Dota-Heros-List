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



    // FILTERS
    
  filtersDiv.addEventListener('change', event => {
    // CHECKBOXES
    const selectedCheckboxes = [
      ...document.querySelectorAll('#attack-type input:checked'),
    ].map(checkbox => checkbox.id);
    // listening for a checkbox on the input attack-type tab

    const selectedAttackTypes = [
      ...document.querySelectorAll('#attack-type input:checked'),
    ].map(checkbox => checkbox.id);
    console.log(selectedAttackTypes);
    // listening for which type checkbox input was checked

    const selectedPrimaryAttributes = [
      ...document.querySelectorAll('#primary-attribute input:checked'),
    ].map(checkbox => checkbox.id);
    // get the selected primary attributes

    const selectedRoles = [
      ...document.querySelectorAll('#role input:checked'),
    ].map(checkbox => checkbox.id);
    // Listen for

  

    // attackType filter 12.37 (OLD)
    // const filtered = heroes
    // .filter(hero => {
    //   const attackType = hero.attack_type.toLowerCase();
    //   // changing cases so input matches selection
    //   return selectedAttackTypes.includes(attackType);
    //   // if hero attack type is found, it will be included
    // });

    // attackType filter 12.38. (NEW) Use this filter to match the other 2 filters
    const filtered = heroes
      .filter(hero => {
        if (selectedAttackTypes.length === 0) return true;
        const attackType = hero.attack_type.toLowerCase();
        return selectedAttackTypes.includes(attackType);
      })
      // Primary attribute filter
      .filter(hero => {
        if (selectedPrimaryAttributes.length === 0) return true;
        return selectedPrimaryAttributes.includes(hero.primary_attr);
        // Checks if primary attribute was selected by user
      });

      .filter(hero => {
        if (selectedRoles.length === 0) return true
        const heroRoles = hero.roles.map(role => role.toLowerCase())
        return selectedRoles.some(role => {
          return heroRoles.includes(role)
        })
      })


    // Diplaying new info from inputs
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
      // creating the new li elements and updating the DOM list after filtering from input
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
