import React, { createContext, useEffect, useReducer } from "react"
import { ACTION_TYPES, Reducer } from "./Reducer"

const initialState = {
  fetch_tasks_request: true,
  tasks: [],
  toasts: []
}

export const Context = createContext()

const Store = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  useEffect(() => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) ?? []

    console.log("Tasks: ", tasks)

    dispatch({ type: ACTION_TYPES.LOAD_INITIAL_TASKS, payload: tasks })
  }, [])

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}

export default Store