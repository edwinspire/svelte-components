export default DateTime;
type DateTime = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const DateTime: import("svelte").Component<{
    value?: any;
    onclick_cell?: Function;
    row?: any;
    format?: string;
    fromFormat?: string;
    HighlightIsntToday?: boolean;
    editInline?: boolean;
    css_cell?: string;
}, {}, "value" | "row">;
import { DateTime } from 'luxon';
type $$ComponentProps = {
    value?: any;
    onclick_cell?: Function;
    row?: any;
    format?: string;
    fromFormat?: string;
    HighlightIsntToday?: boolean;
    editInline?: boolean;
    css_cell?: string;
};
