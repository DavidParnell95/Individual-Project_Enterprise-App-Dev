/****** Modal Initialization ******
 * This Script initializes modal components
 * and collapsible items
*/

// setup materialize components
document.addEventListener('DOMContentLoaded', function() {

    //Modals
    var modals = document.querySelectorAll('.modal');
    M.Modal.init(modals);
  
    //Collapsible
    var items = document.querySelectorAll('.collapsible');
    M.Collapsible.init(items);
  
  });
  