// Wait until the document is fully loaded
document.addEventListener("DOMContentLoaded", function () {
    // Initialize the Tableau extension
    tableau.extensions.initializeAsync().then(() => {
        // Add event listener to the button
        document.getElementById("fetchDataButton").addEventListener("click", fetchData);
    });
});

// Function to fetch data from the active worksheet
function fetchData() {
    let dashboard = tableau.extensions.dashboardContent.dashboard;

    // Get the first worksheet in the dashboard (or adjust for a specific sheet)
    let worksheet = dashboard.worksheets[0];

    // Fetch the underlying data
    worksheet.getUnderlyingDataAsync().then(dataTable => {
        let csvData = convertToCSV(dataTable);
        
        // Display the data in the extension UI (for testing)
        document.getElementById("output").innerText = csvData;
    });
}

// Convert data table to CSV-like format
function convertToCSV(dataTable) {
    let csv = [];
    const columns = dataTable.columns.map(col => col.fieldName);
    csv.push(columns.join(','));

    dataTable.data.forEach(row => {
        csv.push(row.join(','));
    });

    return csv.join("\n");
}
