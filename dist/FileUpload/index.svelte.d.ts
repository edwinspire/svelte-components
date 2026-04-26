export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    uploadFile: () => Promise<any>;
};
declare const Index: import("svelte").Component<{
    label?: any;
    accept?: string;
    url?: string;
    multiple?: boolean;
    onselect?: Function;
    onupload?: Function;
    onchange?: Function;
    showUploadButton?: boolean;
    sizeClass?: string;
}, {
    uploadFile: () => Promise<any>;
}, "label" | "accept" | "showUploadButton" | "sizeClass">;
type $$ComponentProps = {
    label?: any;
    accept?: string;
    url?: string;
    multiple?: boolean;
    onselect?: Function;
    onupload?: Function;
    onchange?: Function;
    showUploadButton?: boolean;
    sizeClass?: string;
};
