const form = document.querySelector('form');
const search = document.querySelector('input');
const place = document.querySelector('#place');
const forecast = document.querySelector('#forecast');

form.addEventListener('submit', function (e) {
    place.textContent = 'Loading...';
    forecast.textContent = '';
    e.preventDefault();
    fetch(`/weather?address=${search.value}`)
        .then(res => res.json()
            .then(data => {
                if (data.error) {
                    place.textContent = data.error;
                } else {
                    place.textContent = data.location;
                    forecast.textContent = data.forecast;
                }
            })
        )
        .catch(err => console.log(err));
});