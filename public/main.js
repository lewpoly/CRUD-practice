const update = document.querySelector('#update-button');
const deleteButton = document.querySelector('#delete-button');
const messageDiv = document.querySelector('#message');

// eslint-disable-next-line no-unused-vars
update.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'put',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Happy',
      quote:
        'Golf requires goofy pants and a fat ass. You should talk to my neighbor the accountant. Probably a great golfer, huge ass.',
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      window.location.reload(true);
    });
});

deleteButton.addEventListener('click', (_) => {
  fetch('/quotes', {
    method: 'delete',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Shooter McGavin', 
    }),
  })
    .then((res) => {
      if (res.ok) return res.json();
    })
    .then((response) => {
      if (response === 'No quote to delete') {
        messageDiv.textContent = 'No Shooter McGavin quote to delete';
      } else {
        window.location.reload(true);
      }
    })
    .catch(console.error);
});
