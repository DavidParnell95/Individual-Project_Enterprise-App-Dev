const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

//toggle UI elemnts
loggedInLinks.forEach(item => item.style.display = 'block');
loggedOutLinks.forEach(item => item.style.display = 'none');