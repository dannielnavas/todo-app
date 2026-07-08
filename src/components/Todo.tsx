import { JSX, Show } from "solid-js";

export function Todo(props: {
  todo: { text: string; completed: boolean };
  index: () => number;
  onRemove: () => void;
  children: JSX.Element;
  onInputChange: () => void;
  onTextChange: (newText: string) => void;
}) {
  const { todo, index } = props;
  return (
    <>
      <input
        type="checkbox"
        checked={(console.log("common operator"), todo.completed)}
        onChange={() => {
          // setTodos(index(), "completed", !todo.completed)
          // setTodos(
          //   produce((todos) => {
          //     todos[index()].completed = !todos[index()].completed;
          //   }),
          // );
          props.onInputChange();
        }}
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
          // todo.setText(target.innerText);
          // setTodos(index(), "text", target.innerText);
          // setTodos(
          //   produce((todos) => {
          //     todos[index()].text = target.innerText;
          //   }),
          // );
          props.onTextChange(target.innerText);
        }}
      >
        <Show when={todo.completed} fallback={<span>{props.children}</span>}>
          <s>{props.children}</s>
        </Show>
      </span>
      <button onclick={() => props.onRemove()}>❌</button>
    </>
  );
}
