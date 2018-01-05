//form submit listener
document.getElementById('myForm').addEventListener('submit', saveBookmark);

//save the bookmark
function saveBookmark(e) {
    //get the form values
    var siteName =document.getElementById('siteName').value;
    var siteURL =document.getElementById('siteURL').value;

    if (!validateForm(siteName, siteURL)){
        return false;
    }
    
    var bookmark = {
        name: siteName,
        url: siteURL
    }
    
    //Local storage test - run to make sure storing.
    //localStorage.setItem('test', 'Hello World');
    //console.log(localStorage.getItem)('test');
    //localStorage.removeItem('test');
    //console.log(localStorage.getItem('test'));
    
    if(localStorage.getItem('bookmarks') === null){
        //initiate array
        var bookmarks =[];
        //add to array
        bookmarks.push(bookmark);
        //set to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        //get bookmarks from the localstorage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        //add bookmark to array
        bookmarks.push(bookmark);
        //reset back to localstorage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    }
    
    
    //clear form
    document.getElementById('myForm').reset();
    
    //re-fetch bookmarks
    fetchBookmarks();
    
    
    //prevent form submitting
    e.preventDefault();
    
}

//Delete stored bookmark function from array
function deleteBookmark(url){
    //Get bookmarks from local storage
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //Loop through bookmarks
    for(var i=0;i<bookmarks.length;i++){
        if(bookmarks[i].url === url){
            //Remove
            bookmarks.splice(i, 1);
        }
        
    }
    
    //reset back to localstorage
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    
    //re-fetch bookmarks
    fetchBookmarks();
    
}




function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    
    var bookmarksResults = document.getElementById('bookmarksResults');
    
    bookmarksResults.innerHTML = '';
    for (var i = 0; i< bookmarks.length; i++){
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;
        
        bookmarksResults.innerHTML += '<div class="well">'+
                                      '<h3>'+name+
                                      ' <a class="btn btn-default" target="_blank" href="'+url+'">Take Me There</a> '+
                                      ' <a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Get Rid!</a>'
                                      '</h3>'+
                                      '</div>';
    }
}



function validateForm(siteName, siteURL){
    if(!siteName || !siteURL){
        alert('Please fill in the form');
        return false;
    }
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);
    
    if(!siteURL.match(regex)){
        alert('Please use a valid URL');
        return false;
    }
    
    return true;
}
