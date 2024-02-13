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
    PageSize?: number[];
    PageSizeSelected?: number;
    relatedTablesForAutoRefresh?: any[];
    fileNameExport?: string;
    GetSelectedRows?: () => any[];
}, {
    selectrows: CustomEvent<any>;
    clickrow: CustomEvent<any>;
    editrow: CustomEvent<any>;
    newrow: CustomEvent<any>;
} & {
    [evt: string]: CustomEvent<any>;
}, {
    l01: {};
    l02: {};
    l03: {};
    l04: {};
    l05: {};
    l06: {};
    l07: {};
    l08: {};
    l09: {};
    l10: {};
    r07: {};
    r08: {};
    r09: {};
    r10: {};
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
        PageSize?: number[];
        PageSizeSelected?: number;
        relatedTablesForAutoRefresh?: any[];
        fileNameExport?: string;
        GetSelectedRows?: () => any[];
    };
    events: {
        selectrows: CustomEvent<any>;
        clickrow: CustomEvent<any>;
        editrow: CustomEvent<any>;
        newrow: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        l01: {};
        l02: {};
        l03: {};
        l04: {};
        l05: {};
        l06: {};
        l07: {};
        l08: {};
        l09: {};
        l10: {};
        r07: {};
        r08: {};
        r09: {};
        r10: {};
    };
};
export {};
