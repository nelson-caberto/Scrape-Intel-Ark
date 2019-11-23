
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
    d3.json('/fields').then(insertFormCheckboxOptions);
}

function updateTable() {
    let tableHeader = d3.select('#tableHeader').html('');

    checkboxFields.forEach(f => {
        if (document.getElementById(f).checked) {
            tableHeader.append('th').text(f);
        }
    });

    let tableBody = d3.select('#tableBody').html('');

    tableData.forEach(row => {
        let tr = tableBody.append('tr');

        checkboxFields.forEach(f => {
            if (document.getElementById(f).checked) {
                tr.append('td').text(row[f]);
            }
        });
    });
}

function saveTableData(data) {
    tableData = data;
}

function getTableData() {
    d3.json('/data').then(saveTableData);
}

