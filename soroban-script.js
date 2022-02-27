/**
 * File soroban-script.js.
 *
 * @since Twenty Twenty-One 1.0
 *
 * Required to do awesome soroban stuff.
 */

/**
 * Toggle an attribute's value
 *
 * @since Twenty Twenty-One 1.0
 *
 * @param {Element} el - The element.
 * @param {boolean} withListeners - Whether we want to add/remove listeners or not.
 */

const  _NUM_ROWS_PER_PROBLEM = 10;
const  _NUM_PROBLEMS_PER_SET = 10;

function addSorobanRow(table, numProblems, difficulty) {
    var row = table.insertRow(-1)
    for (var i = 0; i < numProblems; i++) {
	var randomNumber = generateNumber(difficulty);
	cell = row.insertCell(-1);
	cell.innerHTML = `${randomNumber}`
	
    }
}

function getSelectedDifficulty() {
    var problemDivs = document.getElementsByClassName("diff-btn");
    for(div of problemDivs) {
	if (div.classList.contains("selected")) {
	    return div.innerHTML;
	}
    }
    return "medium";
}

function generateNumber(diff) {
    if (diff == "beginner") {
	return Math.floor(Math.random() * 4) + 1
    } else if (diff == "easy") {
	return Math.floor(Math.random() * 9) + 1
    } else if (diff == "medium") {
	return Math.floor(Math.random() * 89) + 10
    } else if (diff == "hard") {
	return Math.floor(Math.random() * 899) + 100
    } else if (diff == "insane") {
	return Math.floor(Math.random() * 8999) + 1000
    }
    return Math.floor(Math.random() * 89) + 10
}

function addSorobanProblemTable(elem) {
    var table = document.createElement('table');
    table.id = "soroban-table";
    elem.appendChild(table);
}

function addTotalsRow(table) {
    var footer = table.createTFoot();
    var totalRow = footer.insertRow(-1);
    var colTotals = [];

    // start at the non-header row.
    for (var i = 1, row; row = table.rows[i]; i++) {
	for (var j = 0, col; col = row.cells[j]; j++) {
	    var value = parseInt(col.innerHTML);
	    if (colTotals.length > j) {
		colTotals[j] += value;
	    } else {
		colTotals.push(value);
	    }
	}
    }
    for (var i = 0, tot; tot = colTotals[i]; i++) {
	var cell = totalRow.insertCell(-1);
	cell.innerHTML = tot;
    }
}

// TODO: Make this per difficulty
function getNumProblems() {
    return _NUM_PROBLEMS_PER_SET;
}
function getNumRowsPerProblem() {
    var diff = getSelectedDifficulty();
    if (diff == "beginner" || diff == "easy") {
	return 5;
    }
    return _NUM_ROWS_PER_PROBLEM;
}


function createHeader(table) {
    var header = table.createTHead();
    var headerRow = header.insertRow();
    for (var i = 0; i < getNumProblems(); i++) {
	var cell = headerRow.insertCell();
	cell.innerHTML = "#" + (i + 1);
    }
}

function addSorobanProblem(elem) {
    var problemTable = document.getElementById("soroban-table");
    createHeader(problemTable);
    var tbody = problemTable.createTBody();
    
    const numRowsPerProblem = getNumRowsPerProblem()
    var total = 0;
    const difficulty = getSelectedDifficulty();
    for (var i = 0; i < numRowsPerProblem; i++) {
	//total += randomNumber;
	addSorobanRow(tbody, getNumProblems(), difficulty)
    }
    addTotalsRow(problemTable);
}

function clearSorobanProblem() {
    var problemTable = document.getElementById("soroban-table");
    problemTable.removeChild(problemTable.getElementsByTagName("thead")[0]);
    problemTable.removeChild(problemTable.getElementsByTagName("tbody")[0]);
    problemTable.removeChild(problemTable.getElementsByTagName("tfoot")[0]);
}

function clearDifficultySelection() {
    var problemDivs = document.getElementsByClassName("diff-btn");
    for(div of problemDivs) {
	div.classList.remove("selected");
    }
}

function getContentEntry() {
    return document.getElementsByClassName("entry-content")[0];
}

function addDifficultyButton(elem, diff) {
    const buttonDiv = document.createElement('div');
    buttonDiv.addEventListener("click", function() {
	clearDifficultySelection();
	this.classList.add("selected");
    });
    buttonDiv.innerHTML = diff
    buttonDiv.style.hover = "center";
    buttonDiv.style.textAlign = "center";
    buttonDiv.style.width = "90px";
    buttonDiv.style.border = "3px solid";
    //buttonDiv.style.borderColor = "#2196F3";
    buttonDiv.style.color = "black";
    buttonDiv.style.borderRadius = "5px";
    buttonDiv.className = "diff-btn";
    elem.appendChild(buttonDiv);
    
}

function addDifficultySelector(elem) {
    const diffHolderDiv = document.createElement('div');
    const labelDiv = document.createElement('div');
    labelDiv.innerHTML = "Difficulty: ";
    labelDiv.style.display = "inline-block";
    labelDiv.style.paddingRight = "5px";
    diffHolderDiv.appendChild(labelDiv);
    diffs = [ "beginner", "easy", "medium", "hard", "insane"];
    for (var i = 0; i < diffs.length; i++) {
	var diff = diffs[i];
	addDifficultyButton(diffHolderDiv, diff);
    }
    elem.appendChild(diffHolderDiv);
}

function addSorobanRegenerator(elem) {
    const buttonDiv = document.createElement('div');
    buttonDiv.addEventListener("click", function() {
	clearSorobanProblem();
	addSorobanProblem(getContentEntry());
    });
    buttonDiv.innerHTML = 'Regenerate Problem.'
    buttonDiv.style.hover = "center";
    buttonDiv.style.textAlign = "center";
    buttonDiv.style.width = "300px";
    buttonDiv.style.border = "3px solid";
    buttonDiv.style.borderColor = "#2196F3";
    //buttonDiv.style.color = "#2196F3";
    buttonDiv.style.borderRadius = "5px";
    buttonDiv.className = "regen-btn";
    elem.appendChild(buttonDiv);
}

function addBasicCss(css) {
    //var css = '.regen-btn:hover{ background: #2196F3; color: white }';
    var style = document.createElement('style');

    if (style.styleSheet) {
	style.styleSheet.cssText = css;
    } else {
	style.appendChild(document.createTextNode(css));
    }

    document.getElementsByTagName('head')[0].appendChild(style);
}

function loadSoroban() {

    addBasicCss('.regen-btn:hover{ background: #2196F3; color: white }');
    addBasicCss('.diff-btn:hover, .diff-btn.selected{ background: #e7e7e7; }');
    addBasicCss('.diff-btn {display: inline-block; margin-right: 5px}');
    addBasicCss('#soroban-table {border-collapse: collapse }');
    //addBasicCss('#soroban-table td {border: none; width: 1px; white-space: nowrap}');
    addBasicCss('#soroban-table td {border: none; width: 1px; white-space: nowrap; padding-right: 7px; padding-left: 7px; padding-top: 1px; padding-bottom: 1px}');
    addBasicCss('#soroban-table tfoot {border-top-style: solid; text-align: left}');
    addBasicCss('#soroban-table thead {border-bottom-style: solid; text-align: left}');
    
    cDiv = getContentEntry();
    addDifficultySelector(cDiv);
    addSorobanRegenerator(cDiv);
    addSorobanProblemTable(cDiv);
    addSorobanProblem(cDiv);
}

if (window.location.href.endsWith("soroban/") || window.location.href.endsWith("soroban")) {
    loadSoroban()
}


