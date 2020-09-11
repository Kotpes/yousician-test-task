import { create, act } from 'react-test-renderer';

import Filter from './Filter';
import FilterIcon from './icons/FilterIcon';

const onRangeSelect = jest.fn();
const props = {
  onRangeSelect,
};

describe('Search', () => {
  test('it matches snapshots', () => {
    const component = create(<Filter {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
  test('filter label changes on toggle', () => {
    let component;
    act(() => {
      component = create(<Filter {...props} />);
    });
    const instance = component.root;
    const filterIconComponent = instance.findByType(FilterIcon);
    const label = instance.findByProps({ id: 'label' });

    expect(label.children).toEqual(['Filter by level']);

    act(() => filterIconComponent.props.onClick());

    expect(label.children).toEqual(['Hide filter']);
  });
  test('filters visibiity is affected by toggle', () => {
    let component;
    act(() => {
      component = create(<Filter {...props} />);
    });
    const instance = component.root;
    const filterIconComponent = instance.findByType(FilterIcon);

    act(() => filterIconComponent.props.onClick());
    const filtersContainer = instance.findByProps({ className: 'filters' });
    expect(filtersContainer.children.length).toBe(15);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
