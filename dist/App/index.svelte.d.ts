export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    topRightNavBar?: any[];
    topLeftNavBar?: any[];
    children: any;
    menu?: any[];
}, {}, "menu" | "topRightNavBar" | "topLeftNavBar">;
type $$ComponentProps = {
    topRightNavBar?: any[];
    topLeftNavBar?: any[];
    children: any;
    menu?: any[];
};
