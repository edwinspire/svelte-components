"use strict";

import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { DateTime as DT } from '../Column/DefaultTypes.js';


function FileName(fileNameExport, extension = 'txt') {

    let fName = 'Report';

    if (fileNameExport && fileNameExport.length > 0) {
        fName = fileNameExport;
    }

    return `${fName}_${DateTime.local().toFormat(
        'yyyy-MM-dd_HH-mm-ss'
    )}.${extension}`;

}

function ConvertDataToHtml(data) {

    let tableHTML = '<table id="ted_001">';

    // Agregar encabezados de tabla
    tableHTML += '<thead>';
    tableHTML += '<tr>';
    Object.keys(data[0]).forEach(key => {
        tableHTML += '<th>' + key + '</th>';
    });
    tableHTML += '</tr>';
    tableHTML += '</thead>';

    // Agregar datos de tabla
    tableHTML += '<tbody>';
    data.forEach((row) => {
        tableHTML += '<tr>';
        Object.values(row).forEach(value => {
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

function FormatDataToExport(array_data, columns, text_length_limit_in_cell = 0) {
    return array_data.map((row) => {
        let r = { ...row };

        Object.keys(row).forEach((key) => {
            //         console.log('Export: ', key, columns[key]);
            if (columns[key] && columns[key].hidden) {
                delete r[key];
            } else if (
                columns[key] &&
                columns[key].decorator &&
                columns[key].decorator.component &&
                columns[key].decorator.component === DT
            ) {
                //r[key] = new Date(row[key]).toISOString();
                let dtluxon = DateTime.fromISO(row[key]);

                if (dtluxon.isValid) {
                    r[key] = dtluxon.toFormat('yyyy-MM-dd HH:mm:ss');
                } else {
                    r[key] = row[key];
                }

            } else if (row[key] !== null && typeof row[key] === 'object') {
                //r[key] = JSON.stringify(row[key], null, 4);
                r[key] = JSON.stringify(row[key]);

                if (text_length_limit_in_cell > 0) {

                    let caracteres = r[key].length;
                    //32767 es el limite de caracteres por celda en un xlsx
                    if (caracteres >= text_length_limit_in_cell) {
                        r[key] = r[key].substring(0, text_length_limit_in_cell);
                        console.warn(
                            `El valor de la columna ${key} es muy largo para ser exportado, se ha limitado a ${text_length_limit_in_cell} caracteres`
                        );
                    }

                }

            }
        });
        delete r.internal_hash_row;
        return r;
    });
}

export const ExportTableToXlsx = (filteredData, columns, fileNameExport) => {
    //console.log(this);
    try {

        // let filteredData = GetSelectedRows();
        let ExceedsCharacterLimitPerCell = false;
        let FormatedData = FormatDataToExport(filteredData, columns, 32767);
        console.log('FormatedData', FormatedData, XLSX);

        if (FormatedData && FormatedData.length > 0) {
            /* Create a worksheet */
            var ws = XLSX.utils.json_to_sheet(FormatedData);
            /* Create a new empty workbook, then add the worksheet */
            var wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'Report');
            let ExtensionFile = 'xlsx';
            if (ExceedsCharacterLimitPerCell) {
                ExtensionFile = 'csv';
            }

            let NameFile = FileName(fileNameExport, ExtensionFile);
            var wopts = {
                bookType: ExtensionFile,
                bookSST: false,
                type: 'binary',
                FS: ';'
            };
            XLSX.writeFile(wb, NameFile, wopts);
        }
    } catch (error) {
        console.error(error);
    }
}

export const ExportTableToHTML = (filteredData, columns, fileNameExport) => {
    //console.log(this);
    try {

        let FormatedData = FormatDataToExport(filteredData, columns);
        console.log('FormatedData', FormatedData);

        let html_content = ConvertDataToHtml(FormatedData);

        const link_download = document.createElement('a');
        link_download.setAttribute('href', 'data:text/html;charset=utf-8,' + encodeURIComponent(html_content));
        link_download.setAttribute('download', FileName(fileNameExport, 'html'));

        // Ocultar el enlace de descarga
        link_download.style.display = 'none';

        // Agregar el enlace de descarga al documento
        document.body.appendChild(link_download);

        // Simular un clic en el enlace de descarga para iniciar la descarga
        link_download.click();

        // Eliminar el enlace de descarga del documento
        document.body.removeChild(link_download);

    } catch (error) {
        console.error(error);
    }
}