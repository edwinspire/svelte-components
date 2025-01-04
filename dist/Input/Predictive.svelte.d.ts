export default Predictive;
type Predictive = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Predictive: import("svelte").Component<{
    options?: any[];
    label?: string;
    selectedValue?: string;
    classLabel?: string;
    classInput?: string;
    placeholder?: string;
    onselect?: Function;
}, {}, "label" | "options" | "selectedValue" | "classLabel" | "classInput" | "placeholder">;
type $$ComponentProps = {
    options?: any[];
    label?: string;
    selectedValue?: string;
    classLabel?: string;
    classInput?: string;
    placeholder?: string;
    onselect?: Function;
};
