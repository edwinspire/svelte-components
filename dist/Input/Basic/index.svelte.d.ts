export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    placeholder?: any;
    type?: string;
    label?: any;
    value?: any;
    sizeClass?: string;
    labelClass?: string;
    min?: any;
    max?: any;
    step?: any;
    accept?: string;
    url?: string;
    multiple?: boolean;
    onselect?: Function;
    onupload?: Function;
    showUploadButton?: boolean;
}, {}, "type" | "value" | "min" | "max" | "label" | "placeholder" | "accept" | "showUploadButton" | "sizeClass" | "labelClass" | "step">;
type $$ComponentProps = {
    placeholder?: any;
    type?: string;
    label?: any;
    value?: any;
    sizeClass?: string;
    labelClass?: string;
    min?: any;
    max?: any;
    step?: any;
    accept?: string;
    url?: string;
    multiple?: boolean;
    onselect?: Function;
    onupload?: Function;
    showUploadButton?: boolean;
};
