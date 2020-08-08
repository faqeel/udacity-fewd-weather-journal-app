// Personal API Key for OpenWeatherMap API
const API_KEY = '3dc260aee8c5feef678bcec0c1ac44e2';

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', generate);

/* Function called by event listener */
function generate(event) {
  event.preventDefault();
  document.getElementById('zip').classList.remove('field__invalid');
  const zip = document.getElementById('zip').value.trim();
  const url = `http://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${API_KEY}`;
  get(url)
    .then((data) => {
      if (data.cod === 200) {
        const date = getDate();
        const temp = data.main.temp;
        const feelings = document.getElementById('feelings').value.trim();
        post('/add', { date, temp, feelings });
        resetForm();
      } else {
        document.getElementById('zip').classList.add('field__invalid');
      }
    })
    .then(updateData);
}

/* Function to GET Web API Data*/
const get = async (url = '') => {
  const req = await fetch(url);
  try {
    const data = await req.json();
    return data;
  } catch (error) {
    console.log('error: ', error);
  }
};

/* Function to POST data */
const post = async (url = '', data = {}) => {
  const res = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  }).catch((error) => console.log('error: ', error));
};

/* Function to GET Project Data */
const updateData = async () => {
  const data = await get('/all');
  document.getElementById('date').innerHTML = data.date ? data.date : '-';
  document.getElementById('temp').innerHTML = data.temp ? data.temp : '-';
  document.getElementById('content').innerHTML = data.feelings ? data.feelings : '-';
};

updateData();

/* Helper Functions */
const getDate = () => {
  const date = new Date();
  return date.getMonth() + '.' + date.getDate() + '.' + date.getFullYear();
};

const resetForm = () => document.querySelector('.form').reset();
