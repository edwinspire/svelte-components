export default Predictive;
type Predictive = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<$$ComponentProps>): void;
};
declare const Predictive: import("svelte").Component<{
    options?: any[];
    label?: string;
    selectedValue?: any;
    classLabel?: string;
    classInput?: string;
    placeholder?: string;
    classIcon?: string;
    classOnSucess?: string;
    classOnError?: string;
    freeTyping?: boolean;
    onselect?: Function;
}, {}, "label" | "selectedValue" | "classLabel" | "classInput" | "placeholder" | "classIcon" | "classOnSucess" | "classOnError" | "freeTyping">;
type $$ComponentProps = {
    options?: any[];
    label?: string;
    selectedValue?: any;
    classLabel?: string;
    classInput?: string;
    placeholder?: string;
    classIcon?: string;
    classOnSucess?: string;
    classOnError?: string;
    freeTyping?: boolean;
    onselect?: Function;
};
