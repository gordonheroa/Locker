var FormElement = document.getElementsByTagName("form")[0];
var fields = FormElement.querySelectorAll("textarea");
fields.forEach(function(item) {
            var formTitle = item.closest("div[role='listitem']").querySelector("div[role='heading']").firstChild.textContent;
    if (formTitle.trim() == "This form is locked. Enter your name to confirm.") {
	item.selected = true;
	setTimeout( () => {
            item.disabled=true;
        }, 50 );
    }
});