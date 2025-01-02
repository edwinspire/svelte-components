export default TreeNode;
type TreeNode = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const TreeNode: import("svelte").Component<{
    value?: any;
    key?: string;
}, {}, "value">;
import TreeNode from './TreeNode.svelte';
type $$ComponentProps = {
    value?: any;
    key?: string;
};
