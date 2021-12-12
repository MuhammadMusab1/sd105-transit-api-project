const form = document.querySelector('form');


//https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=portage&usage=long

function handleSubmit(e) {
  e.preventDefault()
  const input = document.querySelector('input');
  if (input.value !== '') {
    console.log(input.value)
    input.value = '';
  } else {
    return;
  }

}






form.addEventListener('submit', handleSubmit)
