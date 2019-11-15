
var checkboxFields;
var tableData;

function insertFormCheckboxOptions(data) {
    checkboxFields = data;

    let tableColumns = d3.select('#tableColumns');
    tableColumns.html('');

    data.forEach(row => {
        tableColumns
            .append('input')
            .attr('type','checkbox')
            .attr('class','form-check-input')
            .attr('id',row)
            .attr('onchange','updateTable()');
        tableColumns
            .append('label')
            .attr('class','form-check-label')
            .attr('for',row)
            .text(row);
        tableColumns.append('br');
    });
}

function updateFormCheckbox() {
    checkboxFields = d3.json('/fields').then(insertFormCheckboxOptions);
}

var meh;
function updateTable() {
    let tableHeader = d3.select('#tableHeader');
    tableHeader.html('');

    checkboxFields.forEach(f => {
        if (document.getElementById(f).checked) {
            tableHeader.append('th').text(f);
        }
    });

    // let tableBody = d3.select('#tableBody');
    // tableBody.html('');

    // tableData.forEach(row => {
    //     meh = row;
    //     let tr = tableBody.append('tr');

    //     Object.keys(row).forEach(data => {
    //         // tr.append('td').text(row[data]);
    //         console.log(row[data])
    //     });
    // });
}

function saveTableData(data) {
    tableData = data;
}

function getTableData() {
    d3.json('/data').then(saveTableData);
}

updateFormCheckbox();
getTableData();