
import { topic, type Chapter } from '../types'

const ch: Chapter = {
  id: 'redux',
  number: 14,
  title: 'Redux and State Management Libraries',
  tagline:
    'Beginner to advanced — Redux fundamentals, Redux Toolkit, practical React examples, async operations, RTK Query, and interview preparation.',
  priority: 'high',

  topics: [
    // =====================================================
    // 1. REDUX FUNDAMENTALS
    // =====================================================

    topic(
      'what-is-redux',
      'What is Redux?',
      'Redux is a predictable state management library that stores shared application data in one centralized store. Components access this data and dispatch actions to request changes.',
      [
        [
          'Simple example',
          'Imagine an e-commerce website. The Navbar, Product page, Cart page, and Checkout page need the same cart information. Redux stores that shared information centrally so different components can access it.',
        ],
        [
          'Important',
          'Redux is not mandatory for every React application. It is useful when application state becomes complex and needs to be shared across many components.',
        ],
      ],
      [
        {
          q: 'What is Redux in simple words?',
          a: 'Redux is a state management library that stores shared application data in a centralized store and updates it through actions and reducers.',
        },
        {
          q: 'Why do we use Redux in React?',
          a: 'We use Redux to manage complex shared state, reduce prop drilling, maintain predictable updates, and simplify debugging.',
        },
        {
          q: 'Is Redux a part of React?',
          a: 'No. Redux is a separate JavaScript library. React Redux provides the official bindings that connect Redux with React components.',
        },
      ]
    ),

    topic(
      'why-redux',
      'Why do we need Redux?',
      'Redux helps manage shared state when passing props through many components becomes difficult. It provides a centralized and predictable approach to state management.',
      [
        [
          'Problem: Prop Drilling',
          'Passing data from a parent to deeply nested children through multiple intermediate components, even when those components do not need the data.',
        ],
        [
          'Solution: Redux',
          'Components can access the shared store directly using React Redux hooks without passing the same data through every intermediate component.',
        ],
        [
          'When NOT to use Redux',
          'For simple local state, such as a form input, dropdown, modal, or small counter. React useState or Context API may be sufficient.',
        ],
      ],
      [
        {
          q: 'What is prop drilling?',
          a: 'Prop drilling is passing data through multiple component levels to reach a deeply nested component that needs it.',
        },
        {
          q: 'When should we use Redux?',
          a: 'When multiple distant components need complex shared client state, predictable updates, middleware, or advanced debugging tools.',
        },
        {
          q: 'Does every React application need Redux?',
          a: 'No. Small applications can work perfectly with useState and Context API. Redux is useful when state management becomes complex.',
        },
      ]
    ),

    topic(
      'redux-three-principles',
      'Three Principles of Redux',
      'Redux follows three important principles that make state management predictable and easier to debug.',
      [
        [
          '1. Single Source of Truth',
          'The application shared state is stored in one Redux store.',
        ],
        [
          '2. State is Read-Only',
          'Components cannot directly modify Redux state. They dispatch actions to request changes.',
        ],
        [
          '3. Changes through Pure Reducers',
          'Reducers calculate the next state from the previous state and an action. They must be predictable and free from side effects.',
        ],
      ],
      [
        {
          q: 'What are the three principles of Redux?',
          a: 'Single source of truth, state is read-only, and state changes are made through pure reducers.',
        },
        {
          q: 'Why is Redux predictable?',
          a: 'Because state updates follow a strict pattern: actions describe events, reducers calculate new state, and the store maintains the result.',
        },
      ]
    ),

    topic(
      'redux-architecture',
      'Redux Architecture',
      'Redux follows a unidirectional data flow. Data moves in one predictable direction from the component to the store and back to the UI.',
      [
        [
          'Flow',
          'UI → dispatch(action) → middleware → reducer → updated store → useSelector() → updated UI',
        ],
        [
          'Example',
          'A user clicks Add to Cart. The component dispatches addToCart(product). The reducer updates the cart. The Navbar reads the updated cart count and renders again.',
        ],
      ],
      [
        {
          q: 'Explain Redux architecture.',
          a: 'Components dispatch actions. Middleware handles additional logic. Reducers calculate new state. The store saves the updated state, and subscribed components receive updates through selectors.',
        },
        {
          q: 'What is unidirectional data flow?',
          a: 'It means data moves in one direction through a predictable sequence rather than being updated from arbitrary places.',
        },
      ]
    ),

    topic(
      'redux-store',
      'Redux Store',
      'The store is the central object that holds the entire Redux state tree. In Redux Toolkit, configureStore() creates and configures the store.',
      [
        [
          'Important methods',
          'getState() reads the current state, dispatch() sends an action, and subscribe() listens for state updates.',
        ],
        [
          'One store',
          'An application usually has one store containing multiple slices of state.',
        ],
        [
          'Example',
          '{ counter: { value: 0 }, cart: { items: [] }, user: { profile: null } }',
        ],
      ],
      [
        {
          q: 'What is a Redux store?',
          a: 'The Redux store is the centralized object that holds the application state and manages updates through dispatch and reducers.',
        },
        {
          q: 'Can we create multiple Redux stores?',
          a: 'Technically yes, but a typical Redux application uses one store with multiple combined reducers.',
        },
      ]
    ),

    topic(
      'redux-state',
      'Redux State',
      'State represents the current data of an application. Redux state is generally organized as a JavaScript object containing different slices of data.',
      [
        [
          'Example',
          '{ counter: { value: 10 }, user: { name: "Rahul" }, cart: { items: [] } }',
        ],
        [
          'Immutable state',
          'Do not directly modify Redux state. Return updated state through reducers. Redux Toolkit uses Immer to simplify immutable updates.',
        ],
        [
          'Normalized state',
          'For large collections, store entities by ID to reduce duplication and simplify updates.',
        ],
      ],
      [
        {
          q: 'What is Redux state?',
          a: 'Redux state is the data maintained by the Redux store that represents the current application state.',
        },
        {
          q: 'What does immutable mean?',
          a: 'Immutable means that instead of modifying the existing object, we create an updated version of that object.',
        },
      ]
    ),

    topic(
      'redux-actions',
      'Redux Actions',
      'An action is a plain JavaScript object that describes an event that happened in the application. It is sent to the store through dispatch.',
      [
        [
          'Basic action',
          '{ type: "counter/increment" }',
        ],
        [
          'Action with payload',
          '{ type: "counter/incrementBy", payload: 5 }',
        ],
        [
          'Action creator',
          'A function that creates and returns an action object. Redux Toolkit automatically generates action creators through createSlice().',
        ],
      ],
      [
        {
          q: 'What is a Redux action?',
          a: 'An action is a plain JavaScript object with a required type property that describes an event. It may also contain payload data.',
        },
        {
          q: 'What is payload?',
          a: 'Payload is the additional data carried by an action, such as a product object, user ID, or quantity.',
        },
        {
          q: 'What is an action creator?',
          a: 'An action creator is a function that returns an action object. Redux Toolkit automatically generates action creators for slice reducers.',
        },
      ]
    ),

    topic(
      'redux-dispatch',
      'Dispatch',
      'Dispatch is the process of sending an action to the Redux store. The action passes through middleware and reaches the reducer.',
      [
        [
          'Traditional Redux',
          'store.dispatch({ type: "counter/increment" })',
        ],
        [
          'Redux Toolkit',
          'dispatch(increment())',
        ],
        [
          'In React',
          'useDispatch() provides access to the dispatch function.',
        ],
      ],
      [
        {
          q: 'What is dispatch in Redux?',
          a: 'Dispatch sends an action to the Redux store to initiate a state update.',
        },
        {
          q: 'Can we update Redux state without dispatch?',
          a: 'No. State updates must follow the Redux update process through dispatched actions and reducers.',
        },
      ]
    ),

    topic(
      'redux-reducers',
      'Redux Reducers',
      'A reducer is a pure function that takes the current state and an action and returns the next state.',
      [
        [
          'Syntax',
          '(state, action) => newState',
        ],
        [
          'Traditional Redux example',
          'function reducer(state, action) { if (action.type === "increment") { return { count: state.count + 1 }; } return state; }',
        ],
        [
          'Pure function',
          'A reducer should not make API calls, modify external variables, generate random values, or directly mutate the existing state.',
        ],
        [
          'Redux Toolkit',
          'createSlice() uses Immer, so mutation-like syntax inside slice reducers is safe.',
        ],
      ],
      [
        {
          q: 'What is a reducer?',
          a: 'A reducer is a pure function that receives the current state and an action and returns the updated state.',
        },
        {
          q: 'Why should reducers be pure?',
          a: 'Pure reducers make state updates predictable, testable, and easier to debug.',
        },
        {
          q: 'Can reducers perform API calls?',
          a: 'No. API calls and other side effects should be handled outside reducers using thunks, middleware, or RTK Query.',
        },
      ]
    ),

    topic(
      'redux-data-flow',
      'Redux Data Flow',
      'Redux follows a strict cycle of actions, reducers, store updates, and UI re-rendering.',
      [
        [
          'Step 1',
          'The user interacts with the UI.',
        ],
        [
          'Step 2',
          'The component dispatches an action.',
        ],
        [
          'Step 3',
          'Middleware handles additional logic if required.',
        ],
        [
          'Step 4',
          'The reducer calculates the new state.',
        ],
        [
          'Step 5',
          'The store saves the updated state.',
        ],
        [
          'Step 6',
          'useSelector() detects changes in the selected state.',
        ],
        [
          'Step 7',
          'React re-renders the relevant component.',
        ],
      ],
      [
        {
          q: 'Explain the Redux data flow when a button is clicked.',
          a: 'The button dispatches an action, the reducer calculates the new state, the store updates, useSelector detects the change, and React renders the updated UI.',
        },
      ]
    ),

    // =====================================================
    // 2. REDUX TOOLKIT
    // =====================================================

    topic(
      'redux-toolkit',
      'What is Redux Toolkit (RTK)?',
      'Redux Toolkit is the official recommended way to write Redux applications. It simplifies Redux by reducing boilerplate and providing useful built-in tools.',
      [
        [
          'Main features',
          'configureStore(), createSlice(), createAsyncThunk(), createSelector(), and RTK Query.',
        ],
        [
          'Built-in benefits',
          'Immer for immutable updates, Redux DevTools integration, thunk middleware, and development checks.',
        ],
        [
          'Modern standard',
          'For new Redux projects, Redux Toolkit is preferred over traditional Redux implementation.',
        ],
      ],
      [
        {
          q: 'What is Redux Toolkit?',
          a: 'Redux Toolkit is the official set of tools that simplifies Redux store configuration, reducers, actions, and asynchronous operations.',
        },
        {
          q: 'Why was Redux Toolkit introduced?',
          a: 'It was introduced to reduce boilerplate, simplify immutable updates, improve developer experience, and make Redux easier to use correctly.',
        },
        {
          q: 'Is Redux Toolkit different from Redux?',
          a: 'Redux Toolkit is built on Redux. Redux provides the core state management concepts, while RTK provides simplified APIs for using them.',
        },
      ]
    ),

    topic(
      'redux-configurestore',
      'configureStore()',
      'configureStore() creates the Redux store and automatically configures common Redux development features.',
      [
        [
          'Syntax',
          'configureStore({ reducer: { counter: counterReducer } })',
        ],
        [
          'Automatically included',
          'Redux DevTools integration, thunk middleware, and development checks for accidental mutation and non-serializable values.',
        ],
        [
          'Multiple reducers',
          'configureStore() automatically combines reducers when an object is provided.',
        ],
      ],
      [
        {
          q: 'What is configureStore()?',
          a: 'configureStore() is a Redux Toolkit function that creates the store, combines reducers, configures middleware, and enables Redux DevTools.',
        },
        {
          q: 'configureStore() vs createStore()?',
          a: 'configureStore() provides better defaults and less manual configuration. createStore() is the older Redux API and is not recommended for new applications.',
        },
      ]
    ),

    topic(
      'redux-createslice',
      'createSlice()',
      'createSlice() combines the slice name, initial state, and reducer functions. It automatically generates the reducer and corresponding action creators.',
      [
        [
          'Syntax',
          'createSlice({ name: "counter", initialState: { value: 0 }, reducers: { increment(state) { state.value += 1 } } })',
        ],
        [
          'name',
          'Defines the slice name and helps generate action type strings.',
        ],
        [
          'initialState',
          'Defines the starting state of the slice.',
        ],
        [
          'reducers',
          'Contains functions that describe how the slice state changes.',
        ],
        [
          'slice.actions',
          'Contains automatically generated action creators.',
        ],
        [
          'slice.reducer',
          'Contains the reducer function used by configureStore().',
        ],
      ],
      [
        {
          q: 'What is createSlice()?',
          a: 'createSlice() creates a Redux slice containing its initial state, reducer functions, action creators, and reducer.',
        },
        {
          q: 'What does createSlice() return?',
          a: 'It returns an object containing name, reducer, actions, caseReducers, and other slice-related properties.',
        },
      ]
    ),

    topic(
      'redux-immer',
      'Immer in Redux Toolkit',
      'Immer is a library that allows developers to write mutation-like code while producing immutable state updates.',
      [
        [
          'Traditional Redux',
          'return { ...state, count: state.count + 1 }',
        ],
        [
          'Redux Toolkit',
          'state.count += 1',
        ],
        [
          'Important',
          'Mutation-like syntax is safe only inside Redux Toolkit reducers because Immer manages the draft state.',
        ],
      ],
      [
        {
          q: 'What is Immer?',
          a: 'Immer is a library that simplifies immutable state updates by allowing mutation-like operations on a draft.',
        },
        {
          q: 'Does Redux Toolkit mutate the original state?',
          a: 'No. Immer converts draft mutations into immutable updates while preserving the original state.',
        },
      ]
    ),

    topic(
      'redux-provider',
      'Provider Component',
      'Provider is a React Redux component that makes the Redux store available to all nested React components.',
      [
        [
          'Import',
          'import { Provider } from "react-redux";',
        ],
        [
          'Usage',
          '<Provider store={store}><App /></Provider>',
        ],
        [
          'Purpose',
          'It connects React components to the Redux store so hooks such as useSelector() and useDispatch() can access it.',
        ],
      ],
      [
        {
          q: 'What is Provider in Redux?',
          a: 'Provider is a React Redux component that passes the Redux store through React context to the application components.',
        },
        {
          q: 'Why do we wrap the application with Provider?',
          a: 'To make the Redux store accessible to components that use Redux hooks.',
        },
      ]
    ),

    topic(
      'redux-useselector',
      'useSelector()',
      'useSelector() is a React Redux hook used to read data from the Redux store and subscribe to updates of the selected state.',
      [
        [
          'Syntax',
          'const count = useSelector((state) => state.counter.value);',
        ],
        [
          'Re-render behavior',
          'The component re-renders when the selected value changes according to the equality comparison. By default, useSelector() uses strict reference equality.',
        ],
        [
          'Best practice',
          'Select only the state required by the component instead of subscribing to the entire store.',
        ],
      ],
      [
        {
          q: 'What is useSelector()?',
          a: 'useSelector() reads a selected value from the Redux store and subscribes the component to updates of that value.',
        },
        {
          q: 'When does useSelector() cause a re-render?',
          a: 'When the selected value changes according to its equality comparison, which is strict reference equality by default.',
        },
        {
          q: 'Can we use multiple useSelector() calls in one component?',
          a: 'Yes. A component can use multiple useSelector() calls to read different pieces of state.',
        },
      ]
    ),

    topic(
      'redux-usedispatch',
      'useDispatch()',
      'useDispatch() is a React Redux hook that returns the store dispatch function. It allows components to dispatch actions and trigger state updates.',
      [
        [
          'Syntax',
          'const dispatch = useDispatch(); dispatch(increment());',
        ],
        [
          'Use case',
          'Button clicks, form submissions, deleting items, updating quantities, and triggering asynchronous operations.',
        ],
      ],
      [
        {
          q: 'What is useDispatch()?',
          a: 'useDispatch() returns the Redux store dispatch function, allowing React components to send actions to the store.',
        },
        {
          q: 'What is the difference between useDispatch() and useSelector()?',
          a: 'useDispatch() sends actions to the store. useSelector() reads and subscribes to selected state from the store.',
        },
      ]
    ),

    topic(
      'redux-practical-counter',
      'Practical Example: Counter Application',
      'A counter demonstrates the complete Redux Toolkit workflow: creating a slice, configuring the store, connecting Provider, and using Redux hooks.',
      [
        [
          'Step 1: Install',
          'npm install @reduxjs/toolkit react-redux',
        ],
        [
          'Step 2: counterSlice.ts',
          `import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: { value: 0 },

  reducers: {
    increment: (state) => {
      state.value += 1;
    },

    decrement: (state) => {
      state.value -= 1;
    },

    incrementByAmount: (state, action) => {
      state.value += action.payload;
    },

    reset: (state) => {
      state.value = 0;
    },
  },
});

export const {
  increment,
  decrement,
  incrementByAmount,
  reset,
} = counterSlice.actions;

export default counterSlice.reducer;`,
        ],
        [
          'Step 3: store.ts',
          `import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counter/counterSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;`,
        ],
        [
          'Step 4: main.tsx',
          `import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";

ReactDOM.createRoot(
  document.getElementById("root")!
).render(
  <Provider store={store}>
    <App />
  </Provider>
);`,
        ],
        [
          'Step 5: App.tsx',
          `import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";

import {
  increment,
  decrement,
  incrementByAmount,
  reset,
} from "./features/counter/counterSlice";

function App() {
  const count = useSelector(
    (state: RootState) => state.counter.value
  );

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div>
      <h1>Counter: {count}</h1>

      <button onClick={() => dispatch(increment())}>
        Increment
      </button>

      <button onClick={() => dispatch(decrement())}>
        Decrement
      </button>

      <button
        onClick={() => dispatch(incrementByAmount(5))}
      >
        Add 5
      </button>

      <button onClick={() => dispatch(reset())}>
        Reset
      </button>
    </div>
  );
}

export default App;`,
        ],
        [
          'Result',
          'The counter value is stored in Redux. Every button dispatches an action, the reducer updates the value, and useSelector() displays the updated state.',
        ],
      ],
      [
        {
          q: 'What is a Redux slice in the counter project?',
          a: 'The counter slice contains the counter initial state and reducer functions such as increment, decrement, and reset.',
        },
        {
          q: 'Why do we export both actions and the reducer?',
          a: 'Components need action creators to dispatch updates, while configureStore() needs the reducer to manage the slice state.',
        },
      ]
    ),

    // =====================================================
    // 3. ASYNCHRONOUS REDUX
    // =====================================================

    topic(
      'redux-async',
      'Asynchronous Operations in Redux',
      'Asynchronous operations include API requests, database calls, timers, and other tasks that do not complete immediately. These operations must be handled outside normal reducers.',
      [
        [
          'Problem',
          'A reducer must remain synchronous and pure. It should not directly fetch data from an API.',
        ],
        [
          'Solution',
          'Use Redux Thunk, createAsyncThunk(), middleware, or RTK Query to manage asynchronous operations.',
        ],
        [
          'Common states',
          'Loading, Success, and Error.',
        ],
      ],
      [
        {
          q: 'Can Redux handle asynchronous operations?',
          a: 'Yes. Redux uses middleware such as Redux Thunk and Redux Saga. Redux Toolkit includes thunk by default and provides createAsyncThunk().',
        },
        {
          q: 'Why should API calls not be placed inside reducers?',
          a: 'Reducers must be pure and synchronous. API calls are side effects and should be handled outside reducers.',
        },
      ]
    ),

    topic(
      'redux-thunk',
      'Redux Thunk',
      'Redux Thunk is middleware that allows dispatching functions instead of only plain action objects. The function receives dispatch and getState as arguments.',
      [
        [
          'Example',
          'const fetchData = () => async (dispatch, getState) => { const response = await fetch("/api/data"); const data = await response.json(); dispatch(dataLoaded(data)); };',
        ],
        [
          'In Redux Toolkit',
          'Thunk middleware is included automatically when using configureStore().',
        ],
        [
          'Best for',
          'Simple asynchronous logic, API calls, and workflows that require dispatching multiple actions.',
        ],
      ],
      [
        {
          q: 'What is Redux Thunk?',
          a: 'Redux Thunk is middleware that allows action creators to return functions. These functions can perform asynchronous operations and dispatch actions.',
        },
        {
          q: 'What are dispatch and getState inside a thunk?',
          a: 'dispatch sends actions to the store, while getState reads the current Redux state.',
        },
      ]
    ),

    topic(
      'redux-createasyncthunk',
      'createAsyncThunk()',
      'createAsyncThunk() is a Redux Toolkit function that simplifies asynchronous operations. It automatically generates pending, fulfilled, and rejected action types.',
      [
        [
          'pending',
          'The request is currently running. Set loading to true.',
        ],
        [
          'fulfilled',
          'The request completed successfully. Store the returned data.',
        ],
        [
          'rejected',
          'The request failed. Store the error and stop loading.',
        ],
        [
          'Example: userSlice.ts',
          `import {
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async () => {
    const response = await fetch(
      "https://jsonplaceholder.typicode.com/users"
    );

    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    return await response.json();
  }
);

const userSlice = createSlice({
  name: "users",

  initialState: {
    users: [],
    loading: false,
    error: null,
  },

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })

      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message ?? "Something went wrong";
      });
  },
});

export default userSlice.reducer;`,
        ],
        [
          'Component example',
          `import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./app/store";
import { fetchUsers } from "./features/users/userSlice";

function Users() {
  const dispatch = useDispatch<AppDispatch>();

  const { users, loading, error } = useSelector(
    (state: RootState) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  if (loading) return <h2>Loading...</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      <h1>User List</h1>

      {users.map((user) => (
        <p key={user.id}>
          {user.name} - {user.email}
        </p>
      ))}
    </div>
  );
}

export default Users;`,
        ],
      ],
      [
        {
          q: 'What is createAsyncThunk()?',
          a: 'It is a Redux Toolkit utility that creates a thunk for asynchronous logic and automatically dispatches pending, fulfilled, and rejected lifecycle actions.',
        },
        {
          q: 'What is extraReducers?',
          a: 'extraReducers handles actions generated outside the slice reducers, including createAsyncThunk lifecycle actions.',
        },
        {
          q: 'What is action.payload in fulfilled?',
          a: 'It contains the value returned by the asynchronous function passed to createAsyncThunk.',
        },
      ]
    ),

    topic(
      'redux-middleware',
      'Redux Middleware',
      'Middleware is a function that sits between dispatching an action and reaching the reducer. It can handle side effects, logging, asynchronous operations, and other custom behavior.',
      [
        [
          'Flow',
          'dispatch(action) → middleware → reducer',
        ],
        [
          'Examples',
          'Redux Thunk, Redux Saga, logging middleware, analytics middleware, and crash-reporting middleware.',
        ],
        [
          'Redux Toolkit',
          'configureStore() provides default middleware. Custom middleware can be added through its middleware option.',
        ],
      ],
      [
        {
          q: 'What is Redux middleware?',
          a: 'Redux middleware is a function that intercepts dispatched actions before they reach reducers and can perform additional operations.',
        },
        {
          q: 'Can middleware dispatch actions?',
          a: 'Yes. Middleware can dispatch additional actions, perform asynchronous tasks, or modify the dispatch pipeline.',
        },
      ]
    ),

    topic(
      'redux-saga',
      'Redux Saga',
      'Redux Saga is middleware that manages asynchronous operations and side effects using JavaScript generator functions.',
      [
        [
          'Important effects',
          'take, call, put, race, cancel, and fork.',
        ],
        [
          'put',
          'Dispatches an action.',
        ],
        [
          'call',
          'Calls a function and waits for its result.',
        ],
        [
          'take',
          'Waits for a specific action.',
        ],
        [
          'When to use',
          'Complex asynchronous workflows, background synchronization, cancellation, and long-running tasks.',
        ],
      ],
      [
        {
          q: 'What is Redux Saga?',
          a: 'Redux Saga is middleware that uses generator functions to manage asynchronous side effects and complex workflows.',
        },
        {
          q: 'Thunk vs Saga?',
          a: 'Thunk uses functions and is easier to learn. Saga uses generator functions and offers more control over cancellation and complex asynchronous workflows.',
        },
      ]
    ),

    // =====================================================
    // 4. SELECTORS AND PERFORMANCE
    // =====================================================

    topic(
      'redux-selectors',
      'Selectors',
      'Selectors are functions that extract or calculate specific values from the Redux store. They help keep components clean and improve code reusability.',
      [
        [
          'Basic selector',
          'const selectCount = (state) => state.counter.value;',
        ],
        [
          'Usage',
          'const count = useSelector(selectCount);',
        ],
        [
          'Benefit',
          'Selectors separate state-reading logic from UI components.',
        ],
      ],
      [
        {
          q: 'What is a Redux selector?',
          a: 'A selector is a function that extracts a particular value from the Redux state.',
        },
        {
          q: 'Why should we use selectors?',
          a: 'Selectors improve code readability, reusability, and separation of concerns. They can also calculate derived data.',
        },
      ]
    ),

    topic(
      'redux-createselector',
      'createSelector()',
      'createSelector() from Redux Toolkit uses Reselect to create memoized selectors. It recalculates derived data only when its input values change.',
      [
        [
          'Example',
          `import { createSelector } from "@reduxjs/toolkit";

const selectCartItems = (state) => state.cart.items;

export const selectCartTotal = createSelector(
  [selectCartItems],
  (items) =>
    items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
);`,
        ],
        [
          'Memoization',
          'Memoization means storing the previous result and reusing it when the inputs have not changed.',
        ],
        [
          'Use case',
          'Calculating cart totals, filtering products, searching lists, and computing derived statistics.',
        ],
      ],
      [
        {
          q: 'What is memoization?',
          a: 'Memoization is an optimization technique that caches the result of a function and reuses it when the same inputs are provided.',
        },
        {
          q: 'Why do we use createSelector()?',
          a: 'It avoids unnecessary recalculations of derived data and can prevent unnecessary component re-renders when memoized results retain the same reference.',
        },
      ]
    ),

    // =====================================================
    // 5. RTK QUERY
    // =====================================================

    topic(
      'redux-rtk-query',
      'RTK Query',
      'RTK Query is a data-fetching and caching tool included in Redux Toolkit. It simplifies API requests by automatically managing loading states, caching, and data updates.',
      [
        [
          'Main features',
          'Automatic fetching hooks, caching, request deduplication, loading states, cache invalidation, and polling.',
        ],
        [
          'Traditional approach',
          'fetch() + createAsyncThunk() + loading state + error state + reducers.',
        ],
        [
          'RTK Query approach',
          'Define an API endpoint and use the generated React hook to fetch and display data.',
        ],
        [
          'Best for',
          'Server state such as products, users, orders, posts, and dashboard information.',
        ],
      ],
      [
        {
          q: 'What is RTK Query?',
          a: 'RTK Query is a Redux Toolkit data-fetching solution that generates API hooks and manages caching, loading states, and data synchronization.',
        },
        {
          q: 'RTK Query vs createAsyncThunk?',
          a: 'createAsyncThunk handles asynchronous logic and lifecycle actions. RTK Query provides a complete data-fetching and caching system with generated hooks.',
        },
        {
          q: 'What is cache invalidation?',
          a: 'Cache invalidation marks cached data as outdated so it can be fetched again when necessary.',
        },
      ]
    ),

    // =====================================================
    // 6. OTHER STATE MANAGEMENT LIBRARIES
    // =====================================================

    topic(
      'redux-context-comparison',
      'Redux vs Context API',
      'Both Redux and Context API can share data between React components. Context is built into React, while Redux provides a dedicated state management architecture.',
      [
        [
          'Context API',
          'Suitable for relatively simple shared state such as theme, language, or authentication information.',
        ],
        [
          'Redux',
          'Suitable for complex shared client state, structured updates, middleware, and advanced debugging.',
        ],
        [
          'Performance',
          'Context consumers re-render when the provided context value changes. Redux useSelector() subscribes to selected state and compares the selected result.',
        ],
      ],
      [
        {
          q: 'Redux vs Context API?',
          a: 'Context API is built into React and is useful for simple shared values. Redux provides a structured state management system with reducers, actions, middleware, selectors, and DevTools.',
        },
        {
          q: 'Does Context API replace Redux?',
          a: 'Context can replace Redux for simple state-sharing requirements, but it does not provide the same built-in Redux architecture and ecosystem.',
        },
      ]
    ),

    topic(
      'redux-zustand',
      'Zustand',
      'Zustand is a lightweight state management library for React. It provides a simple store-based approach with minimal boilerplate.',
      [
        [
          'Basic idea',
          'Create a store using create() and access it directly through a custom hook.',
        ],
        [
          'Advantages',
          'Simple API, minimal boilerplate, selectors, and no mandatory Provider in typical client-side setups.',
        ],
        [
          'Comparison',
          'Redux Toolkit provides a more structured action/reducer architecture. Zustand is simpler for lightweight state management.',
        ],
      ],
      [
        {
          q: 'What is Zustand?',
          a: 'Zustand is a lightweight state management library that allows React components to access shared state through a custom hook.',
        },
        {
          q: 'Redux vs Zustand?',
          a: 'Redux Toolkit provides a structured architecture and extensive tooling. Zustand provides a simpler API with less boilerplate.',
        },
      ]
    ),

    topic(
      'redux-recoil',
      'Recoil',
      'Recoil is a state management library based on atoms and selectors. Atoms represent individual pieces of state, and selectors represent derived state.',
      [
        [
          'Atom',
          'A unit of state that components can read and update.',
        ],
        [
          'Selector',
          'A function that derives state from atoms or other selectors.',
        ],
        [
          'Architecture',
          'Instead of one central state object, components subscribe to individual state units.',
        ],
      ],
      [
        {
          q: 'What is Recoil?',
          a: 'Recoil is a state management library that uses atoms for individual state values and selectors for derived state.',
        },
        {
          q: 'What is the difference between an atom and a selector?',
          a: 'An atom stores state, while a selector derives or calculates state from other atoms or selectors.',
        },
      ]
    ),

    topic(
      'redux-jotai',
      'Jotai',
      'Jotai is a lightweight atom-based state management library. It allows developers to create small pieces of state called atoms and use them directly in React components.',
      [
        [
          'Atom',
          'A small unit of shared state created using atom().',
        ],
        [
          'Hook',
          'useAtom() reads and updates an atom.',
        ],
        [
          'Mental model',
          'Jotai uses a bottom-up approach with small state units, whereas Zustand generally uses a store-based approach.',
        ],
      ],
      [
        {
          q: 'What is Jotai?',
          a: 'Jotai is a state management library that uses atoms as small units of state and provides React hooks to read and update them.',
        },
        {
          q: 'Jotai vs Zustand?',
          a: 'Jotai is atom-based and bottom-up. Zustand is store-based and commonly top-down. Both offer lightweight alternatives to Redux.',
        },
      ]
    ),

    // =====================================================
    // 7. INTERVIEW PREPARATION
    // =====================================================

    topic(
      'redux-interview-beginner',
      'Redux Interview Questions — Beginner',
      'Important beginner-level questions covering Redux fundamentals and the core architecture.',
      [
        [
          'Q1. What is Redux?',
          'Redux is a predictable state management library that stores shared application state in a centralized store.',
        ],
        [
          'Q2. What is a store?',
          'A store is the central object that holds Redux application state.',
        ],
        [
          'Q3. What is an action?',
          'An action is a plain object describing an event that occurred',
        ],
        [
          'Q4. What is a reducer?',
          'A reducer is a pure function that receives state and an action and returns the next state',
        ],
        [
          'Q5. What is dispatch?',
          'Dispatch sends an action to the Redux store',
        ],
        [
          'Q6. What is payload?',
          'Payload is the additional data passed along with an action',
        ],
        [
          'Q7. What is Provider?',
          'Provider connects React components to the Redux store',
        ],
      ],
      [
        {
          q: 'Explain Redux in one sentence.',
          a: 'Redux stores shared application state centrally and updates it predictably through actions and reducers.',
        },
      ]
    ),

    topic(
      'redux-interview-intermediate',
      'Redux Interview Questions — Intermediate',
      'Important intermediate-level questions about Redux Toolkit, React Redux hooks, and asynchronous operations.',
      [
        [
          'Q1. What is Redux Toolkit?',
          'The official recommended approach for writing Redux applications with less boilerplate.',
        ],
        [
          'Q2. What is createSlice()?',
          'A function that creates a slice reducer and action creators from a slice name, initial state, and reducer functions.',
        ],
        [
          'Q3. What is configureStore()?',
          'A function that creates and configures the Redux store with reducers, middleware, and DevTools.',
        ],
        [
          'Q4. What is useSelector()?',
          'A React Redux hook for reading and subscribing to selected store state.',
        ],
        [
          'Q5. What is useDispatch()?',
          'A React Redux hook that returns the store dispatch function.',
        ],
        [
          'Q6. What is createAsyncThunk()?',
          'A utility for asynchronous operations that generates pending, fulfilled, and rejected lifecycle actions.',
        ],
        [
          'Q7. What is extraReducers?',
          'A section inside createSlice() that handles actions generated outside its reducers.',
        ],
      ],
      [
        {
          q: 'Why should we use Redux Toolkit instead of traditional Redux?',
          a: 'Redux Toolkit reduces boilerplate, simplifies immutable updates, provides good defaults, and makes Redux easier to maintain.',
        },
      ]
    ),

    topic(
      'redux-interview-advanced',
      'Redux Interview Questions — Advanced',
      'Advanced questions covering middleware, performance, asynchronous workflows, and Redux ecosystem tools.',
      [
        [
          'Q1. What is Redux middleware?',
          'Middleware intercepts actions between dispatch and reducers and can handle side effects.',
        ],
        [
          'Q2. What is Redux Thunk?',
          'Middleware that allows dispatching functions for asynchronous logic.',
        ],
        [
          'Q3. What is Redux Saga?',
          'Middleware using generator functions for complex asynchronous workflows.',
        ],
        [
          'Q4. What is RTK Query?',
          'A Redux Toolkit solution for API fetching, caching, and data synchronization.',
        ],
        [
          'Q5. What is createSelector()?',
          'A memoization utility that recalculates derived data only when input values change.',
        ],
        [
          'Q6. What is Immer?',
          'A library that simplifies immutable updates using mutation-like draft syntax.',
        ],
        [
          'Q7. How does useSelector() prevent unnecessary re-renders?',
          'It compares the previous and next selected value and re-renders when the result changes according to its equality function.',
        ],
      ],
      [
        {
          q: 'Thunk vs Saga vs RTK Query?',
          a: 'Thunk handles asynchronous functions. Saga manages complex asynchronous workflows using generators. RTK Query focuses on API fetching, caching, and synchronization.',
        },
      ]
    ),

    // =====================================================
    // 8. PRACTICAL ASSIGNMENTS
    // =====================================================

    topic(
      'redux-practice-assignments',
      'Redux Toolkit Practical Assignments',
      'Practice these projects to understand Redux Toolkit through real-world implementation.',
      [
        [
          'Assignment 1: Counter',
          'Create a counter with increment, decrement, reset, and incrementByAmount reducers. Add a custom amount input.',
        ],
        [
          'Assignment 2: Shopping Cart',
          'Create a cart slice with addToCart, removeFromCart, increaseQuantity, decreaseQuantity, and clearCart. Calculate the total price using a selector.',
        ],
        [
          'Assignment 3: User Management',
          'Fetch users from an API using createAsyncThunk. Display loading, error, and success states. Add search and filtering.',
        ],
        [
          'Assignment 4: Product Dashboard',
          'Use RTK Query to fetch products. Add search, category filtering, product details, and caching.',
        ],
        [
          'Assignment 5: Authentication',
          'Create an authentication slice with login, logout, and user information. Handle asynchronous login requests and loading states.',
        ],
      ],
      [
        {
          q: 'What should a developer understand before building a Redux project?',
          a: 'Store, state, actions, reducers, dispatch, createSlice, configureStore, Provider, useSelector, and useDispatch.',
        },
        {
          q: 'What is the recommended learning order for Redux Toolkit?',
          a: 'Redux fundamentals, createSlice, configureStore, Provider, useSelector, useDispatch, createAsyncThunk, selectors, and RTK Query.',
        },
      ]
    ),
  ],
}

export default ch
