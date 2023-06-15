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
    title: {};
    item1: {};
    item2: {};
    item3: {};
    item4: {};
    item5: {};
    item6: {};
    item7: {};
    item8: {};
    item9: {};
    item10: {};
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
        title: {};
        item1: {};
        item2: {};
        item3: {};
        item4: {};
        item5: {};
        item6: {};
        item7: {};
        item8: {};
        item9: {};
        item10: {};
    };
};
export {};
