export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
} & {
    setContent: (content_json: any) => void;
};
declare const Index: import("svelte").Component<{
    readOnly?: boolean;
    readOnlyButton?: boolean;
    onchange?: Function;
    content?: any;
    urlUploadImages?: any;
}, {
    setContent: (content_json: any) => void;
}, "readOnly" | "readOnlyButton">;
type $$ComponentProps = {
    readOnly?: boolean;
    readOnlyButton?: boolean;
    onchange?: Function;
    content?: any;
    urlUploadImages?: any;
};
