const form = document.querySelector('form');


//https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=portage&usage=long

function handleSubmit(e) {
  e.preventDefault()
  const input = document.querySelector('input');
  if (input.value !== '') {
    getStreets(input.value)
    input.value = '';
  } else {
    return;
  }
}

function getStreets(streetName) {
  return fetch(`https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=${streetName}&usage=long`)
  .then(response => response.json())
  .then(data => console.log(data.streets))
}






form.addEventListener('submit', handleSubmit)
