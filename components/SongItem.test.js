import { create, act } from 'react-test-renderer';

import SongItem from './SongItem';
import HeartIcon from './icons/HeartIcon';
import LevelIcon from '../components/icons/LevelIcon';

const props = {
  images: 'images_url',
  title: 'Song title',
  artist: 'Artist name',
  level: 10,
  isLiked: false,
  id: 'songId',
  reFetchFavourites: jest.fn(() => null),
  favorite: { id: 'favouriteId', songId: 'songId' },
  index: 1,
};

fetch.mockResponseOnce(JSON.stringify({}));

describe('SongItem', () => {
  test('matches the snapshot', () => {
    const component = create(<SongItem {...props} />);

    expect(component.toJSON()).toMatchSnapshot();
  });
  test('adds correct props to HeartIcon after adding song to favorites', () => {
    let component;
    act(() => {
      component = create(<SongItem {...props} />);
    });
    const instance = component.root;
    const heartIconButton = instance.findByProps({ role: 'button' });
    const heartIcon = instance.findByType(HeartIcon);
    expect(heartIcon.props).toEqual({ fill: 'none', stroke: '#fff' });

    act(() => {
      heartIconButton.props.onClick();
    });

    expect(heartIcon.props).toEqual({ fill: '#dc001d', stroke: 'none' });
  });
  test('LevelIcon has correct props', () => {
    const component = create(<SongItem {...props} />);
    const instance = component.root;
    const levelIconComponent = instance.findByType(LevelIcon);

    expect(levelIconComponent.props.value).toEqual(10);
  });
});
