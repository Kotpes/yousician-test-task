import { create } from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import Search from './Search';

const updateSearchValue = jest.fn();

const props = {
  searchValue: 'Jackson 5',
  updateSearchValue,
};

describe('Search', () => {
  test('it matches snapshots', () => {
    const component = create(<Search {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('it has correct initial value', () => {
    const component = create(<Search {...props} />);
    const instance = component.root;
    const inputElement = instance.findByType('input');

    expect(inputElement.props.value).toEqual('Jackson 5');
  });

  test('it has correct value after change', () => {
    render(<Search {...props} />);
    const inputField = screen.getByPlaceholderText(
      'Search for songs by artist or title'
    );
    fireEvent.change(inputField, { target: { value: 'Beatles' } });
    expect(updateSearchValue).toHaveBeenCalled();
  });
});
