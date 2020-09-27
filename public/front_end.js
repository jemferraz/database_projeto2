//Javascript linked to the frontpage, with the callback functions

const el = document.querySelector('#occupation');

//Callback to filter page
function filter_by_occupation() {
  const occupation = el.value;
  const body = {occupation : occupation };
  console.log(`This is the occupation in the filter_by_occupation: ${occupation}`);

  fetch(`http://localhost:3000/?occupation=${occupation}`, {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    //body: JSON.stringify(body),
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => console.log(error));
};

/*
function filter_by_occupation() {
  const occupation = el.value;
  const body = {occupation : occupation };
  console.log(`This is the occupation in the filter_by_occupation: ${occupation}`);

  fetch('http://localhost:3000/filter_by_occupation', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    body: JSON.stringify(body),
  })
  .then(response => {
    console.log(response);
  })
  .catch(error => console.log(error));
};
*/