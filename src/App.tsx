import {
  createEffect,
  createMemo,
  createSignal,
  For,
  type Component,
} from "solid-js";
import { createStore, produce } from "solid-js/store";
import { ButtonDarkMode } from "./components/ButtonDarkMode";
import { Todo } from "./components/Todo";

const App: Component = () => {
  // const [darkMode, setDarkMode] = createSignal(false);

  // createEffect(() => {
  //   document.body.classList.toggle("dark", darkMode());
  // });

  // function toggleDarkMode() {
  //   setDarkMode(!darkMode());
  // }

  const [completed, setCompleted] = createSignal(false);
  // const [todos, setTodos] = createSignal<any[]>([]);
  const todoLS = JSON.parse(window.localStorage.getItem("todos") || "[]");
  const [todos, setTodos] = createStore<{ text: string; completed: boolean }[]>(
    todoLS ?? [],
  );

  function removeTodos(index: number) {
    // setTodos((prev) => prev.filter((_, i) => i !== index));
    setTodos(
      produce((todos) => {
        todos.splice(index, 1);
      }),
    );
  }

  const [newItem, setNewItem] = createSignal("");

  function addTodo() {
    // const [text, setText] = createSignal(newItem());
    // const [completed, setCompleted] = createSignal(false);
    if (newItem()) {
      // setTodos(todos.length, { text: newItem(), completed: false });
      setTodos(
        produce((todos) => {
          todos.push({ text: newItem(), completed: false });
        }),
      );
      setNewItem("");
    }
  }

  const completedCount = createMemo(
    () => todos.filter((todo) => todo.completed).length,
  );

  createEffect(() => {
    window.localStorage.setItem("todos", JSON.stringify(todos));
  });

  return (
    <div class="w-full h-full  min-h-screen flex items-center justify-center dark:bg-gray-600 dark:text-white">
      {/* <button class="text-2xl fixed top-0 right-0" onClick={toggleDarkMode}>
        {darkMode() ? "☀️" : "🌙"}
      </button> */}
      <ButtonDarkMode />

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
          <For each={todos} fallback="No todos yet!">
            {(
              todo,
              index, // el index es un signal que nos permite saber el indice del elemento en el array, es decir, nos permite saber en que posicion del array se encuentra el elemento que estamos iterando
            ) => (
              <li>
                <Todo
                  todo={todo}
                  index={index}
                  onInputChange={() => {
                    setTodos(
                      produce((todos) => {
                        todos[index()].completed = !todos[index()].completed;
                      }),
                    );
                  }}
                  onTextChange={(newText: string) => {
                    setTodos(
                      produce((todos) => {
                        todos[index()].text = newText;
                      }),
                    );
                  }}
                  onRemove={() => removeTodos(index())}
                >
                  {" "}
                  {/* el index es un signal que nos permite saber el indice del elemento en el array, es decir, nos permite saber en que posicion del array se encuentra el elemento que estamos iterando */}
                  {todo.text}{" "}
                </Todo>
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
        <p class="text-sm mt-4">
          Completed count: {(console.log("completed"), completedCount())}
        </p>
      </div>
    </div>
  );
};

export default App;
