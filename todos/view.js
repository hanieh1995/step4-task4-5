var mytext = document.getElementById("text");
var ul = document.getElementById("list");
var insert = document.getElementById("insert");

insert.onclick = function() { 
    addItem();
    mytext.value = '';
}

function createLi(task) {
    var li = document.createElement('li');
    var editinput = document.createElement("input");
    editinput.type = "text";
    editinput.value = task.title;
    editinput.readOnly = true;
    editinput.className = "editinputstyle";
    li.appendChild(editinput);
    ul.appendChild(li);

    var span = document.createElement("span");
    var close = document.createTextNode("\u00D7");
    span.className = "close";

    span.appendChild(close);
    li.appendChild(span);

    var span1 = document.createElement("span");
    var checked = document.createTextNode("\u2713");
    span1.className = "checked";

    span1.appendChild(checked);
    li.appendChild(span1);

    var span2 = document.createElement("span");
    var edit = document.createTextNode("edit");
    span2.className = "edit";

    span2.appendChild(edit);
    li.appendChild(span2);

    span1.onclick = function() {
        itsDone(task);
    }
    if (task.condition) {
        editinput.style.backgroundColor = "#afa";
    } else {
        editinput.style.backgroundColor = "white";
    }

    span.onclick = function() {
        deleteTask(task);
    }
    span2.onclick = function() {
        if (editinput.readOnly == true) {
            editinput.readOnly = false;
			
            editinput.style.borderColor = "lightblue";
            span2.style.fontWeight = "bold";
            span2.style.fontSize = "15px";

        } else {
			
			task.title=editinput.value;
            editinput.readOnly = true;
			showPerfect();
            editinput.style.borderColor = "lightgray";
            span2.style.fontWeight = "normal";
            span2.style.fontSize = "12px";
        }
    }
}

function show() {

    ul.innerHTML = "";
    var visibleNotes = getFilteredNotes();
    for (var i in visibleNotes)
        createLi(visibleNotes[i]);

    document.getElementById("f0").classList.remove("selected-filter");
    document.getElementById("f1").classList.remove("selected-filter");
    document.getElementById("f2").classList.remove("selected-filter");
    document.getElementById("f" + filter).classList.add("selected-filter");
}