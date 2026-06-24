import { createEffect, createSignal, type Component } from "solid-js";

const App: Component = () => {
  const [darkMode, setDarkMode] = createSignal(false);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }

  return (
    <div class="w-full h-full  min-h-screen flex items-center justify-center dark:bg-gray-600 dark:text-white">
      <button class="text-2xl fixed top-0 right-0" onClick={toggleDarkMode}>
        {darkMode() ? "☀️" : "🌙"}
      </button>

      <div>
        <h1 class="text-2xl text-center">Solid Todo App</h1>
        <input class="border dark:text-black" type="text" />
        <button class="px-2 border">Add</button>
        <ul>
          <li>
            <input type="checkbox" checked />
            <span>
              <s>abrazaar pinguino</s>
            </span>
            <button>❌</button>
          </li>
          <li>
            <input type="checkbox" checked />
            <span>
              <s>abrazaar pinguino</s>
            </span>
            <button>❌</button>
          </li>
        </ul>
        <p class="text-sm mt-4">Completed count: {0}</p>
      </div>
    </div>
  );
};

export default App;
