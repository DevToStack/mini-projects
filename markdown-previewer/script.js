// Ensure DOM is ready
(function () {
    // *** Elements required by FCC tests ***
    const editor = document.getElementById('editor');   // id="editor" (User Story #1)
    const preview = document.getElementById('preview'); // id="preview" (User Story #2)

    if (!editor || !preview) {
        // Fail-safe: if those elements don't exist, stop.
        console.error('Required elements missing: #editor and/or #preview');
        return;
    }

    // Marked config
    marked.setOptions({
        breaks: true,           // Optional bonus: interpret newlines as <br>
        gfm: true,
        headerIds: true,
        mangle: false           // Avoid email obfuscation (keeps links predictable)
    });

    // Default markdown that includes all required elements (User Story #5)
    const defaultMarkdown = `# Welcome to My Markdown Previewer

## Sub-heading (H2) example

This is a **bold** text example and here's an [external link](https://example.com).

Inline code: \`const x = 10;\`

\`\`\`javascript
// code block example
function greet(name) {
  return \`Hello, \${name}!\`;
}
console.log(greet('World'));
\`\`\`

- List item one
- List item two

> This is a blockquote — helpful for calling out text.

![Sample image](https://via.placeholder.com/600x150.png?text=Markdown+Previewer+Image)

Thanks for trying this previewer!
`;

    // Populate editor with default markdown (User Story #6)
    editor.value = defaultMarkdown;

    // Render function: parse markdown -> sanitize -> insert
    function renderMarkdown(md) {
        // Convert markdown to HTML using marked
        const rawHtml = marked.parse(md);
        // Sanitize produced HTML with DOMPurify
        const cleanHtml = DOMPurify.sanitize(rawHtml);
        preview.innerHTML = cleanHtml;
    }

    // Initial render on page load (User Story #6)
    renderMarkdown(editor.value);

    // Live update as user types (User Story #3 + #4)
    editor.addEventListener('input', function (e) {
        renderMarkdown(e.target.value);
    });

    // Optional: keyboard shortcut to toggle preview focus (small UX nicety)
    document.addEventListener('keydown', function (e) {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
            // Ctrl/Cmd + B toggles focus to preview for quick inspection
            e.preventDefault();
            preview.focus();
        }
    });

})();
