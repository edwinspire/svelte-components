export default Tab;
type Tab = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Tab: import("svelte").Component<{
    classSize?: string;
    tabs?: any[];
    active?: number;
    children: any;
}, {}, "classSize" | "tabs" | "active">;
type $$ComponentProps = {
    classSize?: string;
    tabs?: any[];
    active?: number;
    children: any;
};
