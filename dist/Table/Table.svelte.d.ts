/** @typedef {typeof __propDef.props}  TableProps */
/** @typedef {typeof __propDef.events}  TableEvents */
/** @typedef {typeof __propDef.slots}  TableSlots */
export default class Table extends SvelteComponentTyped<{
    url?: string;
    RawDataTable?: any[];
    SelectionType?: number;
    columns?: {};
    params?: {};
    ShowNewButton?: boolean;
    ShowEditButton?: boolean;
    ShowSelectionButton?: boolean;
    ShowExportButton?: boolean;
    iconExport?: string;
    rowClassFunction?: (row: any) => string;
    IntervalRefreshSelected?: number;
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
import { SvelteComponentTyped } from "svelte";
declare const __propDef: {
    props: {
        url?: string;
        RawDataTable?: any[];
        SelectionType?: number;
        columns?: {};
        params?: {};
        ShowNewButton?: boolean;
        ShowEditButton?: boolean;
        ShowSelectionButton?: boolean;
        ShowExportButton?: boolean;
        iconExport?: string;
        rowClassFunction?: (row: any) => string;
        IntervalRefreshSelected?: number;
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
