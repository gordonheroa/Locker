var injected;
injected = "Enter name here";
var FormElement = document.getElementsByTagName("form")[0];
var fields = FormElement.querySelectorAll("textarea");
fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
    if (formTitle.trim() == "This form is locked. Enter your name to confirm.") {
	item.selected = true;
	setTimeout( () => {
	    item.checked = true;
        }, 500 );
        chrome.runtime.sendMessage({a:"b"});
    }
});