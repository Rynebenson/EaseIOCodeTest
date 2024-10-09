import React, { createContext, useEffect, useReducer } from "react"
import { ACTION_TYPES, Reducer } from "./Reducer"

const initialState = {
  fetch_tasks_request: true,
  tasks: [],
}

export const Context = createContext()

const Store = (props) => {
  const [state, dispatch] = useReducer(Reducer, initialState)

  useEffect(() => {
    let tasks = localStorage.getItem("tasks") ?? []

    dispatch({ type: ACTION_TYPES.LOAD_INITIAL_TASKS, payload: tasks })
  }, [])

  return (
    <Context.Provider value={[state, dispatch]}>
      {props.children}
    </Context.Provider>
  )
}

export default Store