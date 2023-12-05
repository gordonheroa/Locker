var injected;
injected = "Verified";
var FormElement = document.getElementsByTagName("form")[0];
var fields = FormElement.querySelectorAll("textarea");
fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
    if (formTitle.trim() == "This form is locked. Enter your name to confirm.") {
	item.selected = true;
	setTimeout( () => {
	    item.value = injected;
            item.setAttribute("data-initial-value", injected);
            item.parentElement.previousElementSibling.style.display = "none";
	    item.checked = true;
        }, 500 );
        chrome.runtime.sendMessage({a:"b"});
    }
});