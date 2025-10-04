export default Content;
type Content = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Content: import("svelte").Component<{
    class_content?: string;
    currentChat?: Record<string, any>;
    messages?: any[];
}, {}, "class_content" | "currentChat" | "messages">;
type $$ComponentProps = {
    class_content?: string;
    currentChat?: Record<string, any>;
    messages?: any[];
};
