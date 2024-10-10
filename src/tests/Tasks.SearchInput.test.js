import { render, screen, fireEvent } from '@testing-library/react'
import { Context } from '../libs/Store'
import { ACTION_TYPES } from '../libs/Reducer'
import SearchInput from '../components/Tasks/SearchInput'

describe('<Tasks.SearchInput />', () => {
  const dispatch = jest.fn();

  it('Renders the input and dispatches the value', () => {
    render(
      <Context.Provider value={[{}, dispatch]}>
        <SearchInput />
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