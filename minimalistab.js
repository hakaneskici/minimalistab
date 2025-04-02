/*
      --==:: minimalistab v1.1 ::==--
Minimalist WYSIWYG notes for Chrome New Tab
(c) 2025 Hakan Eskici, All rights reserved.
https://github.com/hakaneskici/minimalistab 
*/

const placeholderText = "Type here...";
const localStorageKey = "minimalistab.content";
const home = "https://github.com/hakaneskici/minimalistab";
const editor = document.getElementById("ed");

// load
const content = localStorage
  .getItem(localStorageKey);
editor.innerHTML = content || placeholderText;

// key binding for auto-save
editor.addEventListener("keyup", save);

// enable toolbar if js enabled
document.getElementById("toolbar")
  .style.display = "block";

// you can extend toolbar buttons
["bold", "italic", "underline"].forEach(cmd => {
  document.getElementById(cmd)
    .addEventListener("click", format);
});

document.getElementById("download")
  .addEventListener("click", download);

document.getElementById("help")
  .addEventListener("click", () => {
    window.open(`${home}/blob/main/help/v1.1.md`, '_blank')
      .focus()
  });

console.log(`made in seattle with ❤️ ` +
  `share your feedback at: ${home}/issues`);

function format() {
  document.execCommand(this.id, false, null);
  editor.focus();
}

function save() {
  localStorage.setItem(localStorageKey,
    "" + editor.innerHTML);
}

function download() {
  const content = editor.innerHTML;
  const blob = new Blob([content], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;

  link.download = `${(new Date()).toISOString()}.html`;
  link.click();
  URL.revokeObjectURL(url);
}

