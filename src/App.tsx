import { createEffect, createSignal, For, Show, type Component } from "solid-js";

const App: Component = () => {
  const [darkMode, setDarkMode] = createSignal(false);

  createEffect(() => {
    document.body.classList.toggle("dark", darkMode());
  });

  function toggleDarkMode() {
    setDarkMode(!darkMode());
  }

  const [completed, setCompleted] = createSignal(false);
  const [todos, setTodos] = createSignal([
    { id: 1, text: "abrazaar pinguino", completed: true },
    { id: 2, text: "cazar pinguino", completed: false },
    { id: 3, text: "liberar pinguino", completed: true },
  ]);

  function removeTodos(index: number) {
    setTodos((prev) => prev.filter((_, i) => i !== index));
  }

  const [newItem, setNewItem] = createSignal("");

  function addTodo() {
    if (newItem().trim() === "") return;
    const newTodo = {
      id: Date.now(),
      text: newItem(),
      completed: false,
    };
    setTodos((prev) => [...prev, newTodo]);
    setNewItem("");
  }

  return (
    <div class="w-full h-full  min-h-screen flex items-center justify-center dark:bg-gray-600 dark:text-white">
      <button class="text-2xl fixed top-0 right-0" onClick={toggleDarkMode}>
        {darkMode() ? "☀️" : "🌙"}
      </button>

      <div>
        <h1 class="text-2xl text-center">Solid Todo App</h1>
        <input
          class="border dark:text-black"
          type="text"
          value={newItem()}
          onInput={(e) => setNewItem(e.currentTarget.value)}
        />
        <button class="px-2 border" onClick={addTodo}>
          Add
        </button>
        <ul>
          <For each={todos()}>
            {(
              todo,
              index, // el index es un signal que nos permite saber el indice del elemento en el array, es decir, nos permite saber en que posicion del array se encuentra el elemento que estamos iterando
            ) => (
              <li>
                <input
                  type="checkbox"
                  checked={(console.log("common operator"), todo.completed)}
                  onChange={() =>
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todo.id ? { ...t, completed: !t.completed } : t,
                      ),
                    )
                  }
                />
                <span
                  onDblClick={(e) => {
                    const target = e.target as HTMLElement;
                    target.setAttribute("contenteditable", "true");
                    target.focus();
                  }}
                  onBlur={(e) => {
                    const target = e.target as HTMLElement;
                    target.removeAttribute("contenteditable");
                    setTodos((prev) =>
                      prev.map((t) =>
                        t.id === todo.id ? { ...t, text: target.innerText } : t,
                      ),
                    );
                  }}
                >
                  <Show when={todo.completed} fallback={<span>{todo.text}</span>}>
                    <s>{todo.text}</s>
                  </Show>
                </span>
                <button onclick={() => removeTodos(index())}>❌</button>
              </li>
            )}
          </For>
          {/* {todos().map((todo) => (
            <li>
              <input
                type="checkbox"
              checked={(console.log('common operator'), todo.completed)} // ejecuta lo que esta en el console.log y luego retorna el valor de todo.completed de  esta forma se ejecuta tres veces el console.log por cada todo que se renderiza
                onChange={() =>
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t,
                    ),
                  )
                }
              />
              <span
                onclick={() =>
                  setTodos((prev) =>
                    prev.map((t) =>
                      t.id === todo.id ? { ...t, completed: !t.completed } : t,
                    ),
                  )
                }
              >
                <Show when={todo.completed} fallback={<span>{todo.text}</span>}>
                  <s>{todo.text}</s>
                </Show>
              </span>
              <button
                onclick={() =>
                  setTodos((prev) => prev.filter((t) => t.id !== todo.id))
                }
              >
                ❌
              </button>
            </li>
          ))} */}
          {/* <li>
            <input type="checkbox" checked />

            <span onclick={() => setCompleted(!completed())}>
               {completed() ? <s>abrazaar pinguino</s> : "abrazaar pinguino"}
              <Show when={completed()} fallback={<span>abrazaar pinguino</span>}>
                <s>abrazaar pinguino</s>
              </Show>
            </span>

            <button>❌</button>
          </li>
          <li>
            <input type="checkbox" checked />
            <span>
              <s>abrazaar pinguino</s>
            </span>
            <button>❌</button>
          </li> */}
        </ul>
        <p class="text-sm mt-4">Completed count: {0}</p>
      </div>
    </div>
  );
};

export default App;
