export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    uploadFile: () => Promise<any>;
};
declare const Index: import("svelte").Component<{
    accept?: string;
    url?: string;
    multiple?: boolean;
    onselect?: Function;
    onupload?: Function;
    showUploadButton?: boolean;
}, {
    uploadFile: () => Promise<any>;
}, "accept" | "showUploadButton">;
type $$ComponentProps = {
    accept?: string;
    url?: string;
    multiple?: boolean;
    onselect?: Function;
    onupload?: Function;
    showUploadButton?: boolean;
};
