


function insertFormCheckboxOptions(data) {
    let tableColumns = d3.select('#tableColumns');
    data.forEach(row => {
        tableColumns
            .append('input')
            .attr('type','checkbox')
            .attr('class','form-check-input')
            .attr('id',row);
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
    // return columns;
}

updateFormCheckbox();