export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    url?: any;
    method?: string;
    limitSizeResponseView?: number;
    methodDisabled?: boolean;
    data?: Record<string, any>;
}, {}, "url" | "method" | "data" | "limitSizeResponseView" | "methodDisabled">;
type $$ComponentProps = {
    url?: any;
    method?: string;
    limitSizeResponseView?: number;
    methodDisabled?: boolean;
    data?: Record<string, any>;
};
