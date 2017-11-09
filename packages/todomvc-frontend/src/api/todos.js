const TODOS_API = 'https://ddcahfyytj.execute-api.eu-central-1.amazonaws.com/Prod/todos';

export async function getTodos() {
    const data = await fetch(TODOS_API);

    return await data.json();
}

export async function createTodo(title) {
    const data = await fetch(TODOS_API, {
        method: 'POST',
        body: JSON.stringify({ title }),
    });

    return data.json();
}

export async function updateTodo(todo) {
    const data = await fetch(TODOS_API, {
        method: 'PUT',
        body: JSON.stringify(todo),
    });

    return data.json();
}

export async function deleteTodo(todoId) {
    await fetch(`${TODOS_API}?id=${todoId}`, {
        method: 'DELETE',
    });
}