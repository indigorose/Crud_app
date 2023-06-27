const update = document.querySelector('#update-button');
update.addEventListener('click', (_) => {
	// WE are going to add our PUT request here
	fetch('/quotes', {
		method: 'put',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			name: 'Darth Vader',
			quote: 'I find your lack of faith disturbing',
		}),
	});
});
