import { createEffect, createSignal } from "solid-js";

export function ButtonDarkMode() {
  const [darkMode, setDarkMode] = createSignal(false);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
  });
  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }
  return (
    <button class="text-2xl fixed top-0 right-0" onClick={toggleDarkMode}>
      {darkMode() ? "☀️" : "🌙"}
    </button>
  );
}
