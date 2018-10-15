import {
  FILTER_TODOS,
  TOGGLE_TODO,
  GET_TODOS,
  GET_TODOS_SUCCESS,
  GET_TODOS_FAILURE,
  GET_TODO,
  GET_TODO_SUCCESS,
  GET_TODO_FAILURE,
  CREATE_TODO,
  CREATE_TODO_SUCCESS,
  CREATE_TODO_FAILURE,
  UPDATE_TODO,
  UPDATE_TODO_SUCCESS,
  UPDATE_TODO_FAILURE,
  DELETE_TODO,
  DELETE_TODO_SUCCESS,
  DELETE_TODO_FAILURE
} from "./todo-actions";

const initialState = {
  loading: false,
  filter: "all",
  todos: [],
  todoDetails: {
    title: "Loading ...",
    completed: false
  },
  filteredTodos: [],
  error: null
};

export default function todoReducer(state = initialState, action) {
  switch (action.type) {
    case FILTER_TODOS:
      return {
        ...state,
        filter: action.filter,
        filteredTodos: filterTodos(action.filter, state.todos)
      };
    case TOGGLE_TODO:
      const newTodos = toggleTodo(action.todoId, state.todos);
      return {
        ...state,
        todos: newTodos,
        filteredTodos: filterTodos(state.filter, newTodos)
      };
    case GET_TODOS:
      return { ...state, loading: true, error: null };
    case GET_TODOS_SUCCESS:
      return {
        ...state,
        loading: false,
        todos: action.todos,
        filteredTodos: filterTodos(state.filter, action.todos)
      };
    case GET_TODOS_FAILURE:
      return { ...state, loading: false, error: action.error };
    case GET_TODO:
      return { ...state, loading: true, error: null };
    case GET_TODO_SUCCESS:
      return {
        ...state,
        loading: false,
        todoDetails: action.todo
      };
    case GET_TODO_FAILURE:
      return { ...state, loading: false, error: action.error };
    case DELETE_TODO:
      return { ...state, loading: true, error: null };
    case DELETE_TODO_SUCCESS:
      return { ...state, loading: false };
    case DELETE_TODO_FAILURE:
      return { ...state, loading: false, error: action.error };
    default:
      return state;
  }
}

function filterTodos(filter, todos) {
  switch (filter) {
    case "all":
      return todos;
    case "not_done":
      return todos.filter(todo => todo.completed === false);
    case "completed":
      return todos.filter(todo => todo.completed === true);
    default:
      return todos;
  }
}

function toggleTodo(id, todos) {
  return todos.map(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
    return todo;
  });
}
