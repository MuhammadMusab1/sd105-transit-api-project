const form = document.querySelector('form');
const streetList = document.querySelector('.streets');


//https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=portage&usage=long

function handleSubmit(e) {
  e.preventDefault()
  const input = document.querySelector('input');
  if (input.value !== '') {
    getStreets(input.value).then(streetArray => {
      if (streetArray.length === 0) {
        streetList.innerHTML = '';
        const errorDIV = document.createElement('DIV');
        errorDIV.innerHTML = 'no results were found';
        streetList.appendChild(errorDIV);
        return;
      } else {
        renderStreetList(streetArray)
      }
    });
    input.value = '';
  } else {
    return;
  }
}

function getStreets(streetName) {
  return fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=${streetName}&usage=long`)
  .then(response => response.json())
  .then(data => data.streets)
}

function renderStreetList(streetArray) {
  streetList.innerHTML = '';
  streetArray.forEach(street => {
    streetList.insertAdjacentHTML('beforeend', 
    `<a href="#" data-street-key=${street.key}>${street.name}</a>`
    )
  });
}

function handleClick(e) {
  if (e.target.nodeName === 'A') {
    const streetKey = e.target.dataset.streetKey
    console.log(streetKey)
  }
}




form.addEventListener('submit', handleSubmit);
streetList.addEventListener('click', handleClick)
