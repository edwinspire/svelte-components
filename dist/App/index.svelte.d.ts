export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Index: import("svelte").Component<{
    logoText?: string;
    logoIcon?: any;
    topRightNavBar?: any[];
    topLeftNavBar?: any[];
    children: any;
    menu?: any[];
}, {}, "menu" | "logoText" | "logoIcon" | "topRightNavBar" | "topLeftNavBar">;
type $$ComponentProps = {
    logoText?: string;
    logoIcon?: any;
    topRightNavBar?: any[];
    topLeftNavBar?: any[];
    children: any;
    menu?: any[];
};
