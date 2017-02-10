
// change if hosts md files someplace else :
var blogRoot = "https://trochr.github.io/blog/posts/";

function mdToHtml(text) {
  var converter = new showdown.Converter();
  return converter.makeHtml(text);
}

function loadDoc(myurl,cb) {
    var xmlhttp;
    if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                cb(xmlhttp.responseText);
            }
        }

        xmlhttp.open("GET", myurl, true);
        xmlhttp.send();
        return xmlhttp.onreadystatechange();
}


function renderPost(p) {
  document.getElementById("article").innerHTML = mdToHtml(p);
}

function showLayout(raw){
  posts=raw.split('\n');
	// keep only uncommented Markdown files
	posts=posts.filter(function(a){return a.match(/^[^#].*\.md$/) != null;})
  showList(posts);
  showPost(getQueryVariable("a"));
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split('&');
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split('=');
        if (decodeURIComponent(pair[0]) == variable) {
            return decodeURIComponent(pair[1]);
        }
    }
    console.log('Query variable %s not found', variable);
}

function showList(posts){

  posts.forEach(function(e,i,n){
    var li = document.createElement('li');
    li.setAttribute('class','none');
    document.getElementById("articles").appendChild(li);
    li.innerHTML=li.innerHTML + "<a href=?a="+i+">"+e+"</a>";
  });
}

function showPost(post){
	loadDoc(blogRoot+posts[post], renderPost);
}

function init() {
//	var posts=getPosts();
loadDoc(blogRoot+"list.txt", showLayout);
}


window.onload = init;
