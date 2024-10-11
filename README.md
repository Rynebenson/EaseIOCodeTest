# Ease.IO Front End Coding Challenge

This repository contains the code for a frontend application developed as part of a senior developer coding challenge. Below you'll find instructions for running the application, running the tests, app preferences, component differentiation, and API usage.

## Table of Contents
- [Running the Application](#running-the-application)
- [Running the Tests](#running-the-tests)
- [App Preferences](#app-preferences)

## Running the Application

To run the application, follow these steps:

1. **Clone the repository**:
   - `git clone https://github.com/Rynebenson/EaseIOCodeTest`
   - `cd EaseIOCodeTest`

2. **Install the necessary packages**:
   - `npm install`

3. **Start the application**:
   - `npm start`

   The application will be available at `http://localhost:3000`.

## Running the Tests

To run the tests for this application, follow these steps:

1. **Ensure you have installed all necessary packages** (as described in the [Running the Application](#running-the-application) section).

2. **Run the tests**:
   - Use the following command to execute the tests:
     - `npm test`

## App Preferences

### Directory Structure

Almost all of the code is located in the `src` folder. I chose to name directories that are created to house a collection of items in plural form and using camlCase (eg: pages, libs, etc). The main ones I created are:

   - components: React components that can be re-used in several places.
   - services: These are actions which are called by the UI layer and manage the data within the global state / localStorage.
   - libs: Library classes/functions. These are not React components and display no UI.
   - pages: These are components that define pages in the app.
   - styles: I used tailwind so styles are written within components, so this currently only houses the global stylesheet.

### File Naming/Structure

Files should be named after the component/function/constants they export, respecting the casing used for it. ie:

   - If you export a constant named CONST, its file/directory should be named the CONST.
   - If you export a component named Text, the file/directory should be named Text.
   - For files that are utilities that export several functions/classes use the UpperCamelCase version ie: utils/Tasks.js.
   - All React components should be PascalCase (a.k.a. UpperCamelCase 🐫).

### API

Given that this project is Front End only and utilizes `localStorage` as the database, I wrote API "endpoints" the create delays to mimic realistic API response times. It also shows a layer of abstraction that I would like to setup if a REST API was being used. Here's an example of the API file:

```js
export async function DeleteTask(task) {
  return new Promise((resolve, reject) => {

    setTimeout(() => {
      try {
        resolve({ data: task.id })
      } catch (error) {
        reject(error)
      }
    }, 2000)
  })
}
```

### Actions

Actions live in the `services` directory and are responsible for managing the data in the global state, as well as on local storage. This is usually:

   - Handling any business logic with input coming from the UI layer.
   - Making requests to the API.
   - Dispatching each of the 3 states (request, success, and failure) to the global state management.

```js
export async function archiveTask(task, dispatch) {
  dispatch({ type: ACTION_TYPES.ARCHIVE_TASK_REQUEST })

  try {
    let response = await API.ArchiveTask(task)
    
    dispatch({ type: ACTION_TYPES.ARCHIVE_TASK_SUCCESS, payload: response.data })
  } catch(error) {
    dispatch({ type: ACTION_TYPES.ARCHIVE_TASK_FAILURE, payload: error })
  }
}
```

## UI Layer

This layer is solely responsible for:

   - Reflecting the data that is persisten in the `localStorage` as well as the global state mangement
   - Taking user input and passing it to an action

The UI Layer is made up of containers (smart) and presentational components (dumb).

   - Containers manage the business logic and call the actions.
   - Components receive data via props and display the data.

Here's an example of a Container (smart):

```js
export default function CreateTask() {
  const [state, dispatch] = useContext(Context)
  const [task, setTask] = useState({ title: "", notes: "", date: "", time: "", completed: false })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if(state.createTaskStatus === "success") {
      setTask({ title: "", notes: "", date: "", time: "", completed: false })

      dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: false })
    }
  }, [state.createTaskStatus, dispatch])

  const handleClose = useCallback(() => {
    setTask({ title: "", notes: "", date: "", time: "", completed: false })

    dispatch({ type: ACTION_TYPES.SHOW_CREATE_TASK_MODAL, payload: false })
  }, [dispatch])
  
  /**
   * Update task property with given name, value
   * 
   * @param {React.FormEvent<InputEvent>} event
   * @param {String} event.target.name
   * @param {String|Date} event.target.value
   */
  const handleInputChange = useCallback((event) => {
    setTask({ ...task, [event.target.name]: event.target.value })
  }, [task])

  const validateTask = useCallback(() => {
    let mutableErrors = {}

    let TASK_VALIDATIONS = {
      title: {
        required: true,
        regex: /^[a-zA-Z0-9\s]{3,50}$/, // Alphanumeric, 3-50 characters
        message: "Title should be 3-50 characters long and contain only letters, numbers, and spaces."
      },
      notes: {
        required: false,
        regex: /^[\s\S]{0,300}$/, // Any character, up to 300 characters (if provided)
        message: "Notes can be up to 300 characters."
      },
      date: {
        required: true,
        regex: /^\d{4}-\d{2}-\d{2}$/, // Matches dates in the format YYYY-MM-DD
        message: "Date must be in the format YYYY-MM-DD."
      },
      time: {
        required: true,
        regex: /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/, // Matches times in 24-hour format HH:mm
        message: "Time must be in the format HH:mm (24-hour format)."
      }
    }

    for(let [key, value] of Object.entries(TASK_VALIDATIONS)) {
      if(value.required && !task[key]) {
        mutableErrors[key] = `${key} is required`
        continue
      }
  
      if(task[key] && value.regex && !value.regex.test(task[key]))
        mutableErrors[key] = value.message
    }

    setErrors(mutableErrors)

    if(_.isEmpty(mutableErrors)) return true

    return false
  }, [task])

  /**
   * Validate the task
   *   - If successful, call the createTask service
   *   - If unsuccessful, display errors on form
   * 
   * @param {React.FormEvent} event
   */
  const handleSubmit = useCallback((event) => {
    event.preventDefault()

    if(state.createTaskStatus === "loading") return

    let isValid = validateTask()

    if(isValid) {
      createTask(task, dispatch)
    }
  }, [task, state.createTaskStatus, dispatch, validateTask])

  return (
    <Wrapper dataTestId="create-task-modal" closeButtonDataTestId="close-create-task-modal-button" title="Create Task" visible={state.showCreateTaskModal} handleClose={handleClose}>
      <Tasks.CreateTaskForm 
        task={task}
        errors={errors}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
        status={state.createTaskStatus}
      />
    </Wrapper>
  )
}
```

And here's an example of a Component (dumb):

```js
/**
 * 
 * @param {React.ComponentProps} props
 * @param {String} props.title
 * @returns {React.Component}
 */
export default function DeleteTaskWarningText(props) {
  return (
    <div className="py-6">
      <h2 className="text-lg text-center">
        Are you sure you want to delete task <span className="font-medium capitalize">{`"${props.title}"`}</span>
      </h2>
    </div>
  )
}
```