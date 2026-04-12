export default Index;
type Index = {
    $on?(type: string, callback: (e: any) => void): () => void;
    $set?(props: Partial<AppBaseProps & Record<string, any>>): void;
};
declare const Index: import("svelte").Component<{
    /**
     * - The text displayed on the sidebar logo.
     */
    logoText?: string;
    /**
     * - A snippet providing the icon for the logo.
     */
    logoIcon?: import("svelte").Snippet;
    /**
     * - Elements to display on the top-right corner of the navigation bar.
     */
    topRightNavBar?: Array<any>;
    /**
     * - Elements to display on the top-left corner beside the sidebar toggle.
     */
    topLeftNavBar?: Array<any>;
    /**
     * - The main application content.
     */
    children?: import("svelte").Snippet;
    /**
     * - Array definition defining the sidebar's Menu widget items.
     */
    menu?: Array<any>;
} & Record<string, any>, {}, "menu" | "logoText" | "logoIcon" | "topRightNavBar" | "topLeftNavBar">;
/**
 * Main wrapper component for the Application layout.
 * Provides a responsive Sidebar, dynamic Top Nav, and a Main Content area.
 */
type AppBaseProps = {
    /**
     * - The text displayed on the sidebar logo.
     */
    logoText?: string;
    /**
     * - A snippet providing the icon for the logo.
     */
    logoIcon?: import("svelte").Snippet;
    /**
     * - Elements to display on the top-right corner of the navigation bar.
     */
    topRightNavBar?: Array<any>;
    /**
     * - Elements to display on the top-left corner beside the sidebar toggle.
     */
    topLeftNavBar?: Array<any>;
    /**
     * - The main application content.
     */
    children?: import("svelte").Snippet;
    /**
     * - Array definition defining the sidebar's Menu widget items.
     */
    menu?: Array<any>;
};
