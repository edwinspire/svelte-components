import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
// Rename import to avoid confusion with luxon DateTime
import { DateTime as DateTimeComponent } from '../Column/DefaultTypes.js';

function FileName(fileNameExport, extension = 'txt') {
    let fName = 'Report';

    if (fileNameExport && fileNameExport.length > 0) {
        fName = fileNameExport;
    }

    return `${fName}_${DateTime.local().toFormat('yyyy-MM-dd_HH-mm-ss')}.${extension}`;
}

function ConvertDataToHtml(data) {
    let tableHTML = '<table id="ted_001">';

    // Add table headers
    tableHTML += '<thead>';
    tableHTML += '<tr>';
    if (data.length > 0) {
        Object.keys(data[0]).forEach((key) => {
            tableHTML += '<th>' + key + '</th>';
        });
    }
    tableHTML += '</tr>';
    tableHTML += '</thead>';

    // Add table data
    tableHTML += '<tbody>';
    data.forEach((row) => {
        tableHTML += '<tr>';
        Object.values(row).forEach((value) => {
            tableHTML += '<td>' + value + '</td>';
        });
        tableHTML += '</tr>';
    });
    tableHTML += '</tbody>';
    tableHTML += '</table>';

    tableHTML = `<!DOCTYPE html>
    <html>
    <head>
    <style>
    #ted_001 {
      font-family: Arial, Helvetica, sans-serif;
      border-collapse: collapse;
      width: 100%;
    }
    
    #ted_001 td, #ted_001 th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    
    #ted_001 tr:nth-child(even){background-color: #f2f2f2;}
    
    #ted_001 tr:hover {background-color: #ddd;}
    
    #ted_001 th {
      padding-top: 12px;
      padding-bottom: 12px;
      text-align: left;
      background-color: #04AA6D;
      color: white;
    }
    </style>
    </head>
    <body>
    ${tableHTML}
    </body>
</html>
    `;

    return tableHTML;
}

/**
 * Formats data for export and checks if any cell exceeds the character limit.
 * @param {Array} array_data 
 * @param {Object} columns 
 * @param {number} text_length_limit_in_cell 
 * @returns {{data: Array, exceedsLimit: boolean}}
 */
function FormatDataToExport(array_data, columns, text_length_limit_in_cell = 0) {
    let exceedsLimit = false;
    const excelLimit = 32767;

    const data = array_data.map((row) => {
        const newRow = {};

        Object.keys(row).forEach((key) => {
            // Skip hidden columns
            if (columns[key] && columns[key].hidden) {
                return;
            }

            const colConfig = columns[key];
            let value = row[key];

            // Handle DateTime columns
            if (
                colConfig &&
                colConfig.decorator &&
                colConfig.decorator.component &&
                colConfig.decorator.component === DateTimeComponent
            ) {
                let dtLuxon = null;
                if (value instanceof Date) {
                    dtLuxon = DateTime.fromJSDate(value);
                } else if (typeof value === 'string') {
                    // Try ISO first
                    dtLuxon = DateTime.fromISO(value);
                    // If invalid and a format is provided, try that (though typically data is ISO or Date)
                    if (!dtLuxon.isValid && colConfig.fromFormat) {
                        dtLuxon = DateTime.fromFormat(value, colConfig.fromFormat);
                    }
                }

                if (dtLuxon && dtLuxon.isValid) {
                    // Use column format if available, otherwise default
                    const fmt = colConfig.format || 'yyyy-MM-dd HH:mm:ss';
                    value = dtLuxon.toFormat(fmt);
                }
            }
            // Handle Objects/Arrays
            else if (value !== null && typeof value === 'object') {
                value = JSON.stringify(value);
            }

            // Check character limit
            if (typeof value === 'string') {
                if (value.length > excelLimit) {
                    console.warn(
                        `El valor de la columna ${key} es muy largo para Excel (${value.length} chars).`
                    );
                    exceedsLimit = true;
                }

                if (text_length_limit_in_cell > 0 && value.length > text_length_limit_in_cell) {
                    value = value.substring(0, text_length_limit_in_cell);
                }
            }

            // Remove internal hash if present (though usually filtered out by key selection or just delete it)
            if (key !== 'internal_hash_row') {
                newRow[key] = value;
            }
        });

        return newRow;
    });

    return { data, exceedsLimit };
}

export const ExportTableToXlsx = (filteredData, columns, fileNameExport) => {
    try {
        // limit for Excel cells is 32767 characters.
        // We pass 0 (no truncation) to get full data, but FormatDataToExport checks excelLimit internally for the flag.
        const { data: FormatedData, exceedsLimit } = FormatDataToExport(filteredData, columns, 0);

        if (FormatedData && FormatedData.length > 0) {
            /* Create a worksheet */
            const ws = XLSX.utils.json_to_sheet(FormatedData);
            /* Create a new empty workbook, then add the worksheet */
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Report');

            let ExtensionFile = 'xlsx';
            if (exceedsLimit) {
                ExtensionFile = 'csv';
                console.warn('Data exceeds Excel cell limit, switching to CSV export to preserve full content.');
            }

            const NameFile = FileName(fileNameExport, ExtensionFile);
            const wopts = {
                bookType: ExtensionFile,
                bookSST: false,
                type: 'binary',
                FS: ';' // Semicolon for CSV separation (common in some locales, maybe make configurable?)
            };
            XLSX.writeFile(wb, NameFile, wopts);
        }
    } catch (error) {
        console.error(error);
    }
};

export const ExportTableToHTML = (filteredData, columns, fileNameExport) => {
    try {
        const { data: FormatedData } = FormatDataToExport(filteredData, columns);
        const html_content = ConvertDataToHtml(FormatedData);

        const link_download = document.createElement('a');
        link_download.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html_content));
        link_download.setAttribute('download', FileName(fileNameExport, 'html'));

        link_download.style.display = 'none';
        document.body.appendChild(link_download);
        link_download.click();
        document.body.removeChild(link_download);
    } catch (error) {
        console.error(error);
    }
};