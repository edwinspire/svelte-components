/** @typedef {typeof __propDef.props}  TableProps */
/** @typedef {typeof __propDef.events}  TableEvents */
/** @typedef {typeof __propDef.slots}  TableSlots */
export default class Table extends SvelteComponent<{
    RawDataTable?: any[];
    SelectionType?: number;
    columns?: {};
    ShowNewButton?: boolean;
    ShowEditButton?: boolean;
    ShowSelectionButton?: boolean;
    ShowExportButton?: boolean;
    iconExport?: string;
    iconDeleteRow?: string;
    ShowDeleteButton?: boolean;
    PageSize?: number[];
    PageSizeSelected?: number;
    relatedTablesForAutoRefresh?: any[];
    fileNameExport?: string;
    requestData?: {
        url: any;
        refresh_time: number;
        params: any;
        method: string;
        headers: any;
        authorization: {
            basic: any;
            bearer: any;
        };
    };
    rowClassFunction?: (row: any) => string;
    GetSelectedRows?: () => any[];
}, {
    selectrows: CustomEvent<any>;
    clickrow: CustomEvent<any>;
    editrow: CustomEvent<any>;
    newrow: CustomEvent<any>;
    deleterow: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    left_01: {};
    left_02: {};
    left_03: {};
    left_04: {};
    left_05: {};
    left_06: {};
    left_07: {};
    left_08: {};
    left_09: {};
    left_10: {};
    right_01: {};
    right_02: {};
    right_03: {};
}> {
    get GetSelectedRows(): () => any[];
}
export type TableProps = typeof __propDef.props;
export type TableEvents = typeof __propDef.events;
export type TableSlots = typeof __propDef.slots;
import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        RawDataTable?: any[];
        SelectionType?: number;
        columns?: {};
        ShowNewButton?: boolean;
        ShowEditButton?: boolean;
        ShowSelectionButton?: boolean;
        ShowExportButton?: boolean;
        iconExport?: string;
        iconDeleteRow?: string;
        ShowDeleteButton?: boolean;
        PageSize?: number[];
        PageSizeSelected?: number;
        relatedTablesForAutoRefresh?: any[];
        fileNameExport?: string;
        requestData?: {
            url: any;
            refresh_time: number;
            params: any;
            method: string;
            headers: any;
            authorization: {
                basic: any;
                bearer: any;
            };
        };
        rowClassFunction?: (row: any) => string;
        GetSelectedRows?: () => any[];
    };
    events: {
        selectrows: CustomEvent<any>;
        clickrow: CustomEvent<any>;
        editrow: CustomEvent<any>;
        newrow: CustomEvent<any>;
        deleterow: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        left_01: {};
        left_02: {};
        left_03: {};
        left_04: {};
        left_05: {};
        left_06: {};
        left_07: {};
        left_08: {};
        left_09: {};
        left_10: {};
        right_01: {};
        right_02: {};
        right_03: {};
    };
    exports?: {};
    bindings?: string;
};
export {};
