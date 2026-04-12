export default Table;
type Table = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<TableProps & Record<string, any>>): void;
} & {
    GetSelectedRows: () => any[];
};
declare const Table: import("svelte").Component<{
    /**
     * - The local array of data objects to be rendered. Updated automatically if server polling is active.
     */
    RawDataTable?: Array<any>;
    /**
     * - Defines table selection mode: 0 (None), 1 (Single), 2 (Multiple).
     */
    selectionType?: number;
    /**
     * - Configuration object defining columns behavior (hidden, sorting, layout, labels).
     */
    columns?: any;
    /**
     * - Whether to render a 'New' row button in the top action bar.
     */
    showNewButton?: boolean;
    /**
     * - Whether to render an 'Edit' button in the action bar.
     */
    showEditButton?: boolean;
    /**
     * - Toggles whether inline row editing is active.
     */
    showEditRow?: boolean;
    /**
     * - Visibility toggle for the row selection mode dropdown.
     */
    showSelectionButton?: boolean;
    /**
     * - Visibility toggle for Export HTML/Excel buttons.
     */
    showExportButton?: boolean;
    /**
     * - FontAwesome class for the 'Export to Excel' icon.
     */
    iconExport?: string;
    /**
     * - FontAwesome class for the 'Delete row' icon.
     */
    iconDeleteRow?: string;
    /**
     * - Visibility toggle for the row deletion button.
     */
    showDeleteButton?: boolean;
    /**
     * - Allowable rows-per-page options.
     */
    pageSize?: Array<number>;
    /**
     * - The currently selected index inside the `pageSize` array.
     */
    pageSizeSelected?: number;
    /**
     * - Names of DB tables tracked over WebSocket to trigger auto-refresh natively.
     */
    relatedTablesForAutoRefresh?: Array<string>;
    /**
     * - The filename string for outputted Excel/HTML files.
     */
    fileNameExport?: string;
    /**
     * - Defines how to fetch server-side data (url, refresh_time, params, method, headers, auth configurations).
     */
    requestData?: any;
    /**
     * - Dynamic row styling function logic, yielding a CSS class.
     */
    rowClassFunction?: Function;
    /**
     * - Optional custom snippets injected on the left side of the top action Bar.
     */
    left_items?: Array<import("svelte").Snippet>;
    /**
     * - Optional custom snippets injected on the right side of the action bar.
     */
    right_items?: Array<import("svelte").Snippet>;
    /**
     * - Event triggered when standard single row is left clicked.
     */
    onclickrow?: Function;
    /**
     * - Event triggered specifically on row editing.
     */
    oneditrow?: Function;
    /**
     * - Event triggered when 'New' action button clicked.
     */
    onnewrow?: Function;
    /**
     * - Triggered alongside text-based searching algorithm.
     */
    onsearch?: Function;
    /**
     * - Event triggered indicating selected rows should be removed.
     */
    ondeleterow?: Function;
    /**
     * - Event dispatch array providing all active checked rows.
     */
    onselectrows?: Function;
    /**
     * - Cell-level mouse event bindings.
     */
    onclickcell?: Function;
    /**
     * - Fired when data in an inline cell input morphs.
     */
    onchangecell?: Function;
} & Record<string, any>, {
    GetSelectedRows: () => any[];
}, "RawDataTable" | "selectionType" | "columns" | "showNewButton" | "showEditButton" | "showEditRow" | "showSelectionButton" | "showExportButton" | "iconExport" | "iconDeleteRow" | "showDeleteButton" | "pageSize" | "pageSizeSelected" | "relatedTablesForAutoRefresh" | "fileNameExport" | "requestData" | "left_items" | "right_items">;
/**
 * Configurable properties for the advanced data Table component.
 * Supports auto-refresh, pagination, searching, CRUD actions, and server-side fetching.
 */
type TableProps = {
    /**
     * - The local array of data objects to be rendered. Updated automatically if server polling is active.
     */
    RawDataTable?: Array<any>;
    /**
     * - Defines table selection mode: 0 (None), 1 (Single), 2 (Multiple).
     */
    selectionType?: number;
    /**
     * - Configuration object defining columns behavior (hidden, sorting, layout, labels).
     */
    columns?: any;
    /**
     * - Whether to render a 'New' row button in the top action bar.
     */
    showNewButton?: boolean;
    /**
     * - Whether to render an 'Edit' button in the action bar.
     */
    showEditButton?: boolean;
    /**
     * - Toggles whether inline row editing is active.
     */
    showEditRow?: boolean;
    /**
     * - Visibility toggle for the row selection mode dropdown.
     */
    showSelectionButton?: boolean;
    /**
     * - Visibility toggle for Export HTML/Excel buttons.
     */
    showExportButton?: boolean;
    /**
     * - FontAwesome class for the 'Export to Excel' icon.
     */
    iconExport?: string;
    /**
     * - FontAwesome class for the 'Delete row' icon.
     */
    iconDeleteRow?: string;
    /**
     * - Visibility toggle for the row deletion button.
     */
    showDeleteButton?: boolean;
    /**
     * - Allowable rows-per-page options.
     */
    pageSize?: Array<number>;
    /**
     * - The currently selected index inside the `pageSize` array.
     */
    pageSizeSelected?: number;
    /**
     * - Names of DB tables tracked over WebSocket to trigger auto-refresh natively.
     */
    relatedTablesForAutoRefresh?: Array<string>;
    /**
     * - The filename string for outputted Excel/HTML files.
     */
    fileNameExport?: string;
    /**
     * - Defines how to fetch server-side data (url, refresh_time, params, method, headers, auth configurations).
     */
    requestData?: any;
    /**
     * - Dynamic row styling function logic, yielding a CSS class.
     */
    rowClassFunction?: Function;
    /**
     * - Optional custom snippets injected on the left side of the top action Bar.
     */
    left_items?: Array<import("svelte").Snippet>;
    /**
     * - Optional custom snippets injected on the right side of the action bar.
     */
    right_items?: Array<import("svelte").Snippet>;
    /**
     * - Event triggered when standard single row is left clicked.
     */
    onclickrow?: Function;
    /**
     * - Event triggered specifically on row editing.
     */
    oneditrow?: Function;
    /**
     * - Event triggered when 'New' action button clicked.
     */
    onnewrow?: Function;
    /**
     * - Triggered alongside text-based searching algorithm.
     */
    onsearch?: Function;
    /**
     * - Event triggered indicating selected rows should be removed.
     */
    ondeleterow?: Function;
    /**
     * - Event dispatch array providing all active checked rows.
     */
    onselectrows?: Function;
    /**
     * - Cell-level mouse event bindings.
     */
    onclickcell?: Function;
    /**
     * - Fired when data in an inline cell input morphs.
     */
    onchangecell?: Function;
};
