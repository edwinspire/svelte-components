export default Table;
type Table = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    GetSelectedRows: () => any;
};
declare const Table: import("svelte").Component<{
    RawDataTable?: any;
    SelectionType?: number;
    columns?: Record<string, any>;
    ShowNewButton?: boolean;
    ShowEditButton?: boolean;
    ShowSelectionButton?: boolean;
    ShowExportButton?: boolean;
    iconExport?: string;
    iconDeleteRow?: string;
    ShowDeleteButton?: boolean;
    PageSize?: any[];
    PageSizeSelected?: number;
    relatedTablesForAutoRefresh?: any[];
    fileNameExport?: string;
    requestData?: any;
    rowClassFunction?: any;
    left_items: any;
    right_items: any;
    onclickrow?: Function;
    oneditrow?: Function;
    onnewrow?: Function;
    ondeleterow?: Function;
    onselectrows?: Function;
}, {
    GetSelectedRows: () => any;
}, "RawDataTable" | "columns" | "requestData">;
type $$ComponentProps = {
    RawDataTable?: any;
    SelectionType?: number;
    columns?: Record<string, any>;
    ShowNewButton?: boolean;
    ShowEditButton?: boolean;
    ShowSelectionButton?: boolean;
    ShowExportButton?: boolean;
    iconExport?: string;
    iconDeleteRow?: string;
    ShowDeleteButton?: boolean;
    PageSize?: any[];
    PageSizeSelected?: number;
    relatedTablesForAutoRefresh?: any[];
    fileNameExport?: string;
    requestData?: any;
    rowClassFunction?: any;
    left_items: any;
    right_items: any;
    onclickrow?: Function;
    oneditrow?: Function;
    onnewrow?: Function;
    ondeleterow?: Function;
    onselectrows?: Function;
};
