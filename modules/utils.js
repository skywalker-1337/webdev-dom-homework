export function escapeHTML(text) {
    return text.replaceAll("&", "&amp;")
               .replaceAll("<", "&lt;")
               .replaceAll(">", "&gt;")
               .replaceAll('"', "&quot;")
               .replaceAll("'", "&#039;");
  }
  
  export function decodeHTML(text) {
    const textarea = document.createElement("textarea");
    textarea.innerHTML = text;
    return textarea.value;
  }
  