//get list from document
const reviewList = document.querySelector('.games');

console.log(reviewList);

//set up list
const setupReviews = (data) =>{

    console.log(data);

    if(data.length){
        console.log(data.length);

        let html = '';

        data.forEach(doc =>{
            const review = doc.data();
            const li = `
            <li class="coll-container">
                <div class="collapsible-header">
                    ${review.title}  
                    <p style="float:right">${review.date}</p>
                </div>

                <div class="collapsible-body">
                    <p>${review.about}</p>
                    <br>
                    <p>Score:   ${review.score}</p>
                </div>
            </li>
            `;

            html += li;
        });

        if(reviewList)
        {
            reviewList.innerHTML = html;
        }
    }

    else{
        if(reviewList)
        {
            reviewList.innerHTML = '<h5 class="center-align">Could not get reviews</h5>'
        }
    }
};

document.addEventListener('DOMContentLoaded', function(){
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
});