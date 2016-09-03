// This function active the search button
function myFunction() {

    var ID = document.getElementById("searchInput").value;
    document.getElementById("searchInput").value = "";
    ID = 'https://api.github.com/users/' + ID;
    var repo = ID + '/repos';
    gitUser(ID);
    gitRepo(repo);
}

//This function make an AJAX call for user data and introduce it in the HTML
//If the user doesn't exist, there is an error message
    function gitUser(ID){

    var request = new XMLHttpRequest();

    request.onreadystatechange = function() {

    if (request.readyState == 4 ) {

    var jsonObj = JSON.parse(request.responseText);
        
        if (jsonObj.login != undefined){
        document.getElementById("search").innerHTML = 
        
        "<img id=\"photo\" src="+ jsonObj.avatar_url +">"+
        "<div id=\"userName\">" + "@" + jsonObj.login + "</div>" + 
        "<div id=\"fullName\">" + jsonObj.name + "</div>" +
        "<div id=\"bio\">" + "Bio: " + jsonObj.bio + "</div>" +
        "<br>" +
        "<div id=\"title\">" + "Repositories" + "</div>" +
        "<br>"
    }
    else{
        document.getElementById("search").innerHTML = 
        "<div id=\"error\">" + "Does not exist" + "</div>";
    }
    }
}
    request.open('get', ID, true);
    request.send();
}

//This function makes another AJAX call to show all the repositories
    function gitRepo(repo){

    var repoRequest = new XMLHttpRequest();

    repoRequest.onreadystatechange = function() {

    if (repoRequest.readyState == 4 ) {

    var repoObj = JSON.parse(repoRequest.responseText);
        var text = "";
        var i;
        for (var i = 0; i < repoObj.length; i++) {
        text += repoObj[i].name + "<br>" + "<br>";
        }
       document.getElementById("repo").innerHTML = 
       "<div id=\"repositories\">" + text +"</div>";
    
}
}
    repoRequest.open('get', repo, true);
    repoRequest.send();
}