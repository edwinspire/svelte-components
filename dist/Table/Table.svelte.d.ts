export default Table;
type Table = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    GetSelectedRows: () => any;
};
declare const Table: import("svelte").Component<{
    RawDataTable?: any;
    selectionType?: number;
    columns?: Record<string, any>;
    showNewButton?: boolean;
    showEditButton?: boolean;
    showEditRow?: boolean;
    showSelectionButton?: boolean;
    showExportButton?: boolean;
    iconExport?: string;
    iconDeleteRow?: string;
    showDeleteButton?: boolean;
    pageSize?: any[];
    pageSizeSelected?: number;
    relatedTablesForAutoRefresh?: any[];
    fileNameExport?: string;
    requestData?: any;
    rowClassFunction?: any;
    left_items?: any[];
    right_items?: any[];
    onclickrow?: Function;
    oneditrow?: Function;
    onnewrow?: Function;
    ondeleterow?: Function;
    onselectrows?: Function;
    onclickcell?: Function;
    onchangecell?: Function;
}, {
    GetSelectedRows: () => any;
}, "RawDataTable" | "selectionType" | "columns" | "showNewButton" | "showEditButton" | "showEditRow" | "showSelectionButton" | "showExportButton" | "iconExport" | "iconDeleteRow" | "showDeleteButton" | "pageSize" | "pageSizeSelected" | "relatedTablesForAutoRefresh" | "fileNameExport" | "requestData" | "left_items" | "right_items">;
type $$ComponentProps = {
    RawDataTable?: any;
    selectionType?: number;
    columns?: Record<string, any>;
    showNewButton?: boolean;
    showEditButton?: boolean;
    showEditRow?: boolean;
    showSelectionButton?: boolean;
    showExportButton?: boolean;
    iconExport?: string;
    iconDeleteRow?: string;
    showDeleteButton?: boolean;
    pageSize?: any[];
    pageSizeSelected?: number;
    relatedTablesForAutoRefresh?: any[];
    fileNameExport?: string;
    requestData?: any;
    rowClassFunction?: any;
    left_items?: any[];
    right_items?: any[];
    onclickrow?: Function;
    oneditrow?: Function;
    onnewrow?: Function;
    ondeleterow?: Function;
    onselectrows?: Function;
    onclickcell?: Function;
    onchangecell?: Function;
};
