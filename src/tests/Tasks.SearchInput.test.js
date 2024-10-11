import { render, screen, fireEvent } from '@testing-library/react'
import { Context } from '../libs/Store'
import { ACTION_TYPES } from '../libs/Reducer'
import TasksSearchInput from '../components/Tasks/TasksSearchInput'
import { useState } from 'react'

describe('<TasksSearchInput />', () => {
  const dispatch = jest.fn()

  it('renders the input and dispatches the value', () => {
    const TestComponent = () => {
      const [query, setQuery] = useState('')

      const handleInputChange = (event) => {
        setQuery(event.target.value)
        dispatch({ type: ACTION_TYPES.UPDATE_SEARCH_QUERY, payload: event.target.value })
      }

      return <TasksSearchInput query={query} handleInputChange={handleInputChange} />
    }

    render(
      <Context.Provider value={[{}, dispatch]}>
        <TestComponent />
      </Context.Provider>
    )

    const input = screen.getByPlaceholderText('Search tasks')
    
    expect(input).toBeInTheDocument()
    
    fireEvent.change(input, { target: { value: 'test query' } })
    
    expect(input.value).toBe('test query')
    
    expect(dispatch).toHaveBeenCalledWith({
      type: ACTION_TYPES.UPDATE_SEARCH_QUERY,
      payload: 'test query',
    })
  })
})