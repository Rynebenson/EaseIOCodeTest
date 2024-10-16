# Ease.IO Front End Coding Challenge

This repository contains the code for a frontend application developed as part of a Senior front end coding challenge. Below you'll find instructions for running the application, running the tests, as well as the application preferences.

[View Live Demo Here](https://ease-io-test.vercel.app)

<img width="1217" alt="Screenshot 2024-10-11 at 12 57 45 AM" src="https://github.com/user-attachments/assets/d7cbe862-a1dd-4bec-8f47-a7ffc909afe7">
<img width="1206" alt="Screenshot 2024-10-11 at 12 58 03 AM" src="https://github.com/user-attachments/assets/12c3e051-f023-4ad7-970d-22588a7b17b6">
<img width="1104" alt="Screenshot 2024-10-11 at 1 00 02 AM" src="https://github.com/user-attachments/assets/ad45a4ec-2cff-4bd9-a5ad-77b1714cb602">

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

Almost all of the code is located in the `src` folder. I chose to name the directories that are created to house a collection of items in plural form and using camelCase (eg: pages, libs, etc). The main ones I created are:

   - components: React components that can be re-used in several places.
   - services: These are actions which are called by the UI layer and manage the data and business logic between the global state / localStorage.
   - libs: Library classes/functions. These are not React components and display no UI.
   - pages: These are React components that define pages in the app.
   - styles: As tailwind was used, styles are written within the components html, so currently this only houses the global stylesheet.

### File Naming/Structure

Files should be named after the component/function/constants they export, respecting the casing used for it. ie:

   - If you export a constant named CONST, its file/directory should be named the CONST.
   - If you export a component named Text, the file/directory should be named Text.
   - For files that are utilities that export several functions/classes use the UpperCamelCase version ie: utils/Tasks.js.
   - All React components should be PascalCase (a.k.a. UpperCamelCase 🐫).

### API

Given that this project is Front end only and utilizes `localStorage` as the database, I wrote API methods that utilize delays to mimic realistic API request and response times. It also shows a layer of abstraction that I would typically setup when using a REST API. Here's an example of the API method:

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

Actions live in the `services` directory and are responsible for managing the data within the global state, as well as the local storage. This is usually:

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

## State Management

The state in this application is managed with a custom `Context Store`, interacted with via the `Reducer`. Most actions will dispatch 3 states (request, success, and failure). Data is passed via `payload` and the action is unique by its `type`. I decided to update the `localStorage` within the `Reducer` instead of the API file so that I would not have to duplicate the logic done within the `Reducer` while updating the tasks state.

Here's an example of a reducer which contains 3 states triggered by an action:

```js
case ACTION_TYPES.CREATE_TASK_REQUEST:
   return { ...state, createTaskStatus: "loading" }
case ACTION_TYPES.CREATE_TASK_SUCCESS: {
   let mutableTasks = [...state.tasks]

   mutableTasks.push(action.payload)

   mutableTasks = _.sortBy(mutableTasks, (task) => moment(`${task.date} ${task.time}`, "YYYY-MM-DD HH:mm"));

   localStorage.setItem("tasks", JSON.stringify(mutableTasks))

   return { ...state, createTaskStatus: "success", tasks: mutableTasks }
}
case ACTION_TYPES.CREATE_TASK_FAILURE:
   return { ...state, createTaskStatus: "error" }
```

## UI Layer

This layer is solely responsible for:

   - Reflecting the data that is persistent in the `localStorage` as well as the global state mangement
   - Taking user input and passing it to an action

The UI Layer is made up of containers (smart) and presentational components (dumb).

   - Containers manage the business logic and call the actions.
   - Components receive data via props and simply display the data.

Here's an example of a Container (smart):

```js
export default function DeleteTask() {
  const [state, dispatch] = useContext(Context)

  const handleClose = useCallback(() => {
    dispatch({ type: ACTION_TYPES.SHOW_DELETE_TASK_POPUP, payload: { visible: false, deleteTaskData: {} } })
  }, [dispatch])

  const handleArchive = useCallback(() => {
    archiveTask({ id: state.deleteTaskData?.id, archive: true }, dispatch)
  }, [state.deleteTaskData?.id, dispatch])

  const handleDelete = useCallback(() => {
    deleteTask({ id: state.deleteTaskData?.id }, dispatch)
  }, [state.deleteTaskData?.id, dispatch])

  const disabled = useMemo(() => {
    if(state.archiveTaskStatus === "loading" || state.deleteTaskStatus === "loading") return true

    return false
  }, [state.archiveTaskStatus, state.deleteTaskStatus])

  return (
    <Wrapper dataTestId="delete-task-modal" closeButtonDataTestId="close-delete-task-modal-button" title="Delete Task" visible={state.showDeleteTaskModal} handleClose={handleClose}>
      <DeleteTaskWarningText title={state.deleteTaskData?.title} />

      <DeleteTaskWarningButton title="Archive" disabled={disabled} handleClick={handleArchive} />

      <DeleteTaskWarningButton title="Permanently Delete" disabled={disabled} handleClick={handleDelete} />
    </Wrapper>
  )
}
```

And here's an example of a Component (dumb):

```js
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
