const form = document.querySelector('form');
const streetList = document.querySelector('.streets')
streetList.innerHTML = '';


//https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=portage&usage=long

function handleSubmit(e) {
  e.preventDefault()
  const input = document.querySelector('input');
  if (input.value !== '') {
    getStreets(input.value).then(streetArray => {
      if (streetArray.length === 0) {
        const errorDIV = document.createElement('DIV');
        errorDIV.innerHTML = 'no results were found';
        streetList.appendChild(errorDIV);
        return;
      } else {
        console.log(streetArray)
      }
    })
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






form.addEventListener('submit', handleSubmit)
