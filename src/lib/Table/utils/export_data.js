"use strict";

import * as XLSX from 'xlsx';
import { DateTime } from 'luxon';
import { DateTime as DT } from '../Column/DefaultTypes.js';

export const ExportTableToXlsx = (filteredData, columns, fileNameExport) => {
    //console.log(this);
    try {
        // Filter only selection

        console.log('ExportTable > Columns ', columns);

        // let filteredData = GetSelectedRows();
        let ExceedsCharacterLimitPerCell = false;
        let FormatedData = filteredData.map((row) => {
            let r = { ...row };
            // Convert to string objects

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
                    r[key] = DateTime.fromISO(row[key]).toFormat('yyyy-MM-dd HH:mm:ss');
                } else if (row[key] !== null && typeof row[key] === 'object') {
                    //r[key] = JSON.stringify(row[key], null, 4);
                    r[key] = JSON.stringify(row[key]);
                    let caracteres = r[key].length;
                    //32767 es el limite de caracteres por celda en un xlsx
                    if (caracteres >= 32767) {
                        ExceedsCharacterLimitPerCell = true;
                        console.warn(
                            `El valor de la columna ${key} es muy largo para ser exportado, se ha limitado a 32767 caracteres`
                        );
                    }
                }
            });
            delete r.internal_hash_row;
            return r;
        });
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

            let fName = 'Report';

            if (fileNameExport && fileNameExport.length > 0) {
                fName = fileNameExport;
            }

            let NameFile = `${fName}_${DateTime.local().toFormat(
                'yyyy-MM-dd_HH-mm-ss'
            )}.${ExtensionFile}`;

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

