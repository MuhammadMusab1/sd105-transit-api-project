const form = document.querySelector('form');
const streetList = document.querySelector('.streets');
const tableBody = document.querySelector('tbody');
const streetDisplay = document.getElementById('street-name');


//https://api.winnipegtransit.com/v3/streets.json?api-key=J5UJHy5yUpory_fpvpUv&name=portage&usage=long
//https://api.winnipegtransit.com/v3/stops.json?api-key=J5UJHy5yUpory_fpvpUv&street=2716
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
        streetDisplay.innerHTML = ''
        tableBody.innerHTML = ''
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
    getStopsForStreet(streetKey)
    tableBody.innerHTML = '';
    streetDisplay.innerHTML = '';
  }
}

function getStopsForStreet(streetKey) {
  return fetch(` https://api.winnipegtransit.com/v3/stops.json?api-key=J5UJHy5yUpory_fpvpUv&street=${streetKey}`)
  .then(response => response.json())
  .then(data => data.stops)
  .then(stopsArray => {
    const schedule = [];
    stopsArray.forEach(stop => {
      schedule.push(findStopSchedule(stop.key))
    });
    Promise.all(schedule).then(scheduleArray => scheduleArray.forEach(schedule => {
      schedule['route-schedules'].forEach((route, index) => {
        insertTableRowHTML(createScheduleObj(schedule, index))
      })
    }))
  })
}

function findStopSchedule(stopKey) {
  return fetch(`https://api.winnipegtransit.com/v3/stops/${stopKey}/schedule.json?api-key=J5UJHy5yUpory_fpvpUv`)
  .then(response => response.json())
  .then(data => data['stop-schedule'])
}

function createScheduleObj(schedule, index) {
  return {
    stopName : schedule.stop.name,
    crossStreet : schedule.stop['cross-street'].name,
    direction : schedule.stop.direction,
    busNum : schedule['route-schedules'][index].route.number,
    time : schedule['route-schedules'][index]['scheduled-stops'][0].times.departure.estimated,
    streetName : schedule.stop.street.name
  }
}

function insertTableRowHTML(scheduleObj) {
  const {stopName, crossStreet, direction, busNum, time, streetName} = scheduleObj;
  streetDisplay.innerHTML = `Displaying results for ${streetName}`
  tableBody.insertAdjacentHTML('beforeend', 
  `<tr>
    <td>${stopName}</td>
    <td>${crossStreet}</td>
    <td>${direction}</td>
    <td>${busNum}</td>
    <td>${getTime(time)}</td>
  </tr>`
  )
}

function getTime(dateString) {
  const date = new Date(dateString);
  return date.toLocaleString('en-CA', {hour12 : true, hour: 'numeric', minute: '2-digit'})
}


form.addEventListener('submit', handleSubmit);
streetList.addEventListener('click', handleClick)
