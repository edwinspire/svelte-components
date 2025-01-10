import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';

export default defineConfig({
	plugins: [sveltekit()],
	optimizeDeps: {
        exclude: ["codemirror", "@codemirror/lang-javascript", "@codemirror/lang-json", "@codemirror/lang-xml", "@codemirror/lang-sql", "@codemirror/state"],
    },
});
