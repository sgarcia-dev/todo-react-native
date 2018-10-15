const API = "https://jsonplaceholder.typicode.com";

export const FILTER_TODOS = "FILTER_TODOS";
export const filterTodosAction = filter => ({
  type: FILTER_TODOS,
  filter
});

export const TOGGLE_TODO = "TOGGLE_TODO";
export const toggleTodoAction = todoId => ({
  type: TOGGLE_TODO,
  todoId
});

export const GET_TODOS = "GET_TODOS";
const getTodosAction = () => ({
  type: GET_TODOS
});
export const GET_TODOS_SUCCESS = "GET_TODOS_SUCCESS";
const getTodosSuccessAction = todos => ({
  type: GET_TODOS_SUCCESS,
  todos
});
export const GET_TODOS_FAILURE = "GET_TODOS_FAILURE";
const getTodosFailureAction = error => ({
  type: GET_TODOS_FAILURE,
  error
});

export const getTodos = () => dispatch => {
  dispatch(getTodosAction());
  fetch(`${API}/users/1/todos`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(todos => {
      dispatch(getTodosSuccessAction(todos));
    })
    .catch(err => {
      dispatch(getTodosFailureAction(err));
    });
};

export const GET_TODO = "GET_TODO";
const getTodoAction = () => ({
  type: GET_TODO
});
export const GET_TODO_SUCCESS = "GET_TODO_SUCCESS";
const getTodoSuccessAction = todo => ({
  type: GET_TODO_SUCCESS,
  todo
});
export const GET_TODO_FAILURE = "GET_TODO_FAILURE";
const getTodoFailureAction = error => ({
  type: GET_TODO_FAILURE,
  error
});

export const getTodo = todoId => dispatch => {
  dispatch(getTodoAction());
  return fetch(`${API}/todos/${todoId}`)
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(todo => {
      dispatch(getTodoSuccessAction(todo));
    })
    .catch(err => {
      console.error(err);
      dispatch(getTodoFailureAction(err));
    });
};

export const CREATE_TODO = "CREATE_TODO";
const createTodoAction = todo => ({
  type: CREATE_TODO,
  todo
});
export const CREATE_TODO_SUCCESS = "CREATE_TODO_SUCCESS";
const createTodoSuccessAction = () => ({
  type: CREATE_TODO_SUCCESS
});
export const CREATE_TODO_FAILURE = "CREATE_TODO_FAILURE";
const createTodoFailureAction = error => ({
  type: CREATE_TODO_FAILURE,
  error
});
export const createTodo = todo => dispatch => {
  dispatch(createTodoAction(todo));
  return fetch(`${API}/todos/`, {
    method: "POST",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(todo => {
      dispatch(createTodoSuccessAction());
      dispatch(getTodos());
    })
    .catch(err => {
      console.error(err);
      dispatch(createTodoFailureAction(err));
    });
};

export const UPDATE_TODO = "UPDATE_TODO";
const updateTodoAction = (todoId, todo) => ({
  type: UPDATE_TODO,
  todoId,
  todo
});
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
const updateTodoSuccessAction = () => ({
  type: UPDATE_TODO_SUCCESS
});
export const UPDATE_TODO_FAILURE = "UPDATE_TODO_FAILURE";
const updateTodoFailureAction = error => ({
  type: UPDATE_TODO_FAILURE,
  error
});

export const updateTodo = (todoId, todo) => dispatch => {
  dispatch(updateTodoAction());
  return fetch(`${API}/todos/${todoId}`, {
    method: "PUT",
    body: JSON.stringify(todo),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      return res.json();
    })
    .then(todo => {
      dispatch(updateTodoSuccessAction());
      dispatch(getTodos());
    })
    .catch(err => {
      console.error(err);
      dispatch(updateTodoFailureAction(err));
    });
};

export const DELETE_TODO = "DELETE_TODO";
const deleteTodoAction = todoId => ({
  type: DELETE_TODO,
  todoId
});
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
const deleteTodoSuccessAction = () => ({
  type: DELETE_TODO_SUCCESS
});
export const DELETE_TODO_FAILURE = "DELETE_TODO_FAILURE";
const deleteTodoFailureAction = error => ({
  type: DELETE_TODO_FAILURE,
  error
});

export const deleteTodo = todoId => dispatch => {
  dispatch(deleteTodoAction());
  return fetch(`${API}/todos/${todoId}`, { method: "DELETE" })
    .then(res => {
      if (!res.ok) {
        return Promise.reject(res.statusText);
      }
      dispatch(deleteTodoSuccessAction());
      dispatch(getTodos());
    })
    .catch(err => {
      console.error(err);
      dispatch(deleteTodoFailureAction(err));
    });
};
