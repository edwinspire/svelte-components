# Svelte Components Library

A comprehensive collection of Svelte 5 components for building modern web applications. This library provides a wide range of UI elements from complex data tables and charts to basic inputs and layout utilities.

## Installation

```bash
npm install @edwinspire/svelte-components
```

## Usage

Import components directly from the library:

```svelte
<script>
  import { Table, Chart, Input, Modal } from '@edwinspire/svelte-components';
</script>
```

---

## Components

### 🏗️ Layout & Navigation

#### `AppBase`
The main application shell layout. Includes a responsive sidebar, top navigation bar, and main content area.
- **Props**: `logoText`, `logoIcon`, `menu`, `topRightNavBar`, `topLeftNavBar`.

#### `Level`
A responsive level component for horizontal alignment of items.
- **Props**: `left` (array of snippets/components), `right` (array of snippets/components).

#### `Menu`
A side menu component supporting nested items and sections.
- **Usage**: Used internally by `AppBase` or standalone.

#### `Tab`
A tabbed interface component.
- **Props**: `tabs` (array of objects with `label`, `classIcon`, `component`), `active` (index).

#### `SlideFullScreen`
A full-screen overlay component that slides in.
- **Props**: `show` (boolean).

---

### 📊 Data Display

#### `Table`
A powerful data table with sorting, filtering, pagination, and export capabilities.
- **Features**:
  - Automatic column generation or custom column configuration.
  - Sorting (including robust boolean/null handling).
  - Filtering and Search.
  - Export to Excel (.xlsx) and HTML.
  - Inline editing support.
  - Pagination.
- **Props**: `RawDataTable`, `columns`, `selectionType`, `pageSize`.

#### `Chart`
Wrapper around Apache ECharts for rendering responsive charts.
- **Props**: `option` (ECharts configuration object), `data`, `title`.

#### `JSONView`
A component to pretty-print JSON objects with syntax highlighting.
- **Props**: `jsonObject`.

---

### 📝 Form & Input

#### `Input`
A versatile input component supporting various types including text, numbers, dates, files, and more.
- **Types**: `text`, `number`, `date`, `datetime-local`, `file`, `checkbox`, `boolean`.
- **Props**: `value`, `label`, `placeholder`, `required`, `pattern`.
- **Dependencies**: Uses `luxon` for date formatting.

#### `BasicSelect`
A styled select dropdown.
- **Props**: `options` (array of `{id, value}`), `option` (selected value), `label`.

#### `PredictiveInput`
An input with auto-completion/suggestion capabilities.

#### `EditorCode`
A code editor component based on CodeMirror 6.
- **Features**: Syntax highlighting, formatting (Prettier), read-only mode.
- **Props**: `code` (string), `lang` ('js', 'json', 'html', etc.), `isReadOnly`.

#### `FileUpload`
A dedicated component for handling file uploads.
- **Props**: `url`, `multiple`, `accept`.

---

### 💬 Feedback & Modals

#### `Modal`
A basic modal dialog component.
- **Props**: `show` (boolean).

#### `DialogModal`
A pre-configured modal for confirmations or alerts with title, body, and action buttons.
- **Props**: `show`, `title`, `body`, `onaccept`, `oncancel`.

#### `Notify`
A notification system for displaying toast messages.
- **Usage**: Place `<Notify />` in your root layout. Use `Notifications` utility to trigger messages.

---

### 🛠️ Utilities & Helpers

- **`WebSocketClient`**: Helper class for WebSocket consistency.
- **`sha256`**: Utility for SHA-256 hashing.
- **`copyTextToClipboard`**: Browser clipboard utility.
- **`export_data.js`**: Functions to export data to Excel/HTML.

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```
