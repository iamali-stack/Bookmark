// DOM Elements
var BookmarkName = document.getElementById("BookmarkName");
var WebsiteUrl = document.getElementById("WebsiteUrl");
var addBookmarkBtn = document.getElementById("addBookmark");

// Bookmark storage
var bookmarksContainer = [];


// Load bookmarks from local storage

if (localStorage.getItem('bookmarks') != null) {
    bookmarksContainer = JSON.parse(localStorage.getItem('bookmarks'));
    displayBookmarks();
}

// Add new bookmark

function addBookmark() {
    var name = BookmarkName.value;
    var url = WebsiteUrl.value;


// Validation
if (name.length === 0 && url.length === 0) {
    document.getElementById('customAlert').style.display = 'flex';
    document.getElementById('Sitenamealert').style.display = 'flex';
    document.getElementById('SiteUrlalert').style.display = 'flex';
    return;
}
if (url.length < 3) {
    document.getElementById('customAlert').style.display = 'flex';
    document.getElementById('SiteUrlalert').style.display = 'flex';
    document.getElementById('Sitenamealert').style.display = 'none';

    return;
}

if (name.length < 3) {
    document.getElementById('customAlert').style.display = 'flex';
    document.getElementById('Sitenamealert').style.display = 'flex';
    document.getElementById('SiteUrlalert').style.display = 'none';


    return;
}

    var bookmark = {
        name: name,
        url: url
    };

    bookmarksContainer.push(bookmark);

    displayBookmarks();
    saveToLocalStorage();
    clearForm();

    console.log('bookmark'); 
}
    
// Display bookmarks
 
function displayBookmarks(bookmarks = bookmarksContainer) {
    var cartona = ``;
    for (var i = 0; i < bookmarksContainer.length; i++) {
        cartona += `
        <tr>
            <td>${bookmarksContainer[i].name}</td>
            <td>${bookmarksContainer[i].url}</td>
            <td><button onclick="Visit('${bookmarksContainer[i].url}')" class="btn btn-primary btn-sm">Visit</button></td>
            <td><button onclick="deleteBookmark(${i})" class="btn btn-danger btn-sm">Delete</button></td>
        </tr>`;
    }
    document.getElementById("tableBody").innerHTML = cartona;
}

// Clear input fields
function clearForm() {
    BookmarkName.value = '';
    WebsiteUrl.value = '';
}

// Save to Local Storage
function saveToLocalStorage() {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarksContainer));
}

// delete bookmark
function deleteBookmark(index) {
    bookmarksContainer.splice(index, 1);
    saveToLocalStorage();
    displayBookmarks();
}

// Visit bookmark URL

function Visit(url) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
        url = url; // URL is already valid, no changes needed
        
    } else {
        url = 'http://' + url;
    }
    window.open(url, '_blank');
    console.log('Visit', url);
}

// Validate inputs

function validateAllInputs(elem) {
    var regex = {
        BookmarkName: /^[A-Z][a-z]{3,10}$/, // Matches names starting with an uppercase letter and 4-6 characters long
        WebsiteUrl: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([\/\w .-]*)*\/?$/ // Matches valid URLs
       
    };
    if
        (elem.id == "BookmarkName") {
            if (regex.BookmarkName.test(elem.value)) {
                elem.classList.remove("is-invalid");
                elem.classList.add("is-valid");
                return true;
            } else {
                elem.classList.add("is-invalid");
               
                return false;
            }
        }
        
    else if (elem.id == "WebsiteUrl") {
        if (regex.WebsiteUrl.test(elem.value)) {
            elem.classList.remove("is-invalid");
            elem.classList.add("is-valid");
            
            return true;
        } else {
            elem.classList.add("is-invalid");

            return false;
        }
    }
    else {
        elem.classList.add("is-invalid");
        return false;
    }
}
// Close alert

function closeAlert() {
    document.getElementById('customAlert').style.display = 'none';
}

