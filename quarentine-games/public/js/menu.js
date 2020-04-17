const loggedOutLinks = document.querySelectorAll('.logged-out');
const loggedInLinks = document.querySelectorAll('.logged-in');

const adminItems = document.querySelectorAll('.admin');

const setupUI = (user) => {
    if(user)
    {
        //if the user is an admin
        if(user.admin)
        {
            //Show admin ui elements
            adminItems.forEach(item => item.style.display = 'block');
        }
        
        //toggle UI elemnts
        loggedInLinks.forEach(item => item.style.display = 'block');
        loggedOutLinks.forEach(item => item.style.display = 'none');
    }

    else
    {
        //toggle UI elemnts
        loggedInLinks.forEach(item => item.style.display = 'none');
        loggedOutLinks.forEach(item => item.style.display = 'block');
        //adminItems.forEach(item => item.style.display = 'none');

    }
}