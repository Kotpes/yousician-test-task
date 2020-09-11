import { create } from 'react-test-renderer';

import Home from './index';

const props = {
  initialSongs: [],
  initialFavorites: [],
  totalSongsCount: 20,
};

describe('Home', () => {
  test('it matches snapshots', () => {
    const component = create(<Home {...props} />);
    expect(component.toJSON()).toMatchSnapshot();
  });
});
