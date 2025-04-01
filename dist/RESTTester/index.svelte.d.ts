export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    url?: string;
    method?: string;
    limitSizeResponseView?: number;
    methodDisabled?: boolean;
    data?: any;
    onchange?: Function;
}, {}, "url" | "method" | "data" | "limitSizeResponseView" | "methodDisabled">;
type $$ComponentProps = {
    url?: string;
    method?: string;
    limitSizeResponseView?: number;
    methodDisabled?: boolean;
    data?: any;
    onchange?: Function;
};
