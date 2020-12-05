
var data = (function () {
	var key = 'MODEL';
	return {
		getTasks: getTasks1,
		setTasks: setTasks1
	};

	function getTasks1() {
		var value = localStorage.getItem(key);
		if (!value) return null;
		return JSON.parse(value);
	};

	function setTasks1(value) {
		!value && (value = {});
		localStorage.setItem(key, JSON.stringify(value));
	};
}());

function addItem() {
	var value = document.getElementById("text").value;
	if (!value) return;
	tasks.push({
		title: value,
		condition: false
	});
	showPerfect();
}

function deleteTask(task) {
	tasks.splice(tasks.indexOf(task), 1);
	showPerfect();
}

function itsDone(task) {
	task.condition = !task.condition;
	showPerfect();
}
var filter = 0;

function getFilteredNotes() {
	if (filter == 1) {
		return tasks.filter(function (task) {
			return !task.condition;
		});
	}
	if (filter == 2) return tasks.filter(function (task) {
		return task.condition;
	});
	return tasks;
}

function setFilter(value) {
	filter = value;
	showPerfect();
}

function geting() {
	var result = data.getTasks() || {
		tasks: [],
		filter: 0
	};
	tasks = result.tasks;
	filter = result.filter;
	showPerfect();
}

function showPerfect() {
	show();
	data.setTasks({
		tasks: tasks,
		filter: filter
	});
}

function Upload() {
	var myData = data.getTasks();
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			alert('upload done successfully.');
		}
	}
	xhttp.open('POST', "write", true);
	xhttp.setRequestHeader('Content-Type', 'application/json');
	xhttp.send(JSON.stringify(myData));
}

function Download() {
	var xhttp = new XMLHttpRequest();
	xhttp.open('GET', "read", true);
	xhttp.onreadystatechange = function () {
		if (xhttp.readyState == 4 && xhttp.status == 200) {
			var myData = xhttp.responseText;
			data.setTasks(JSON.parse(myData));
			geting();
		}
	};
	xhttp.send();
}
geting();