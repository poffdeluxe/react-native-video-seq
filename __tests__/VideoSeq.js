import 'react-native';
import React from 'react';
import VideoSeq from '../VideoSeq';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

// Mock out the video stuff
jest.mock('react-native-video', () => 'Video');

it('changes to the next video when one ends', () => {
  const videos = [
    'vid1.mov',
    'vid2.webm',
    'vid3.avi'
  ];

  const component = renderer.create(
    <VideoSeq videos={videos} />
  );

  expect(component.toJSON()).toMatchSnapshot();

  component.getInstance().onEnd();
  expect(component.toJSON()).toMatchSnapshot();

  component.getInstance().onEnd();
  expect(component.toJSON()).toMatchSnapshot();

  // Should stay on vid3.avi since repeat is not on
  component.getInstance().onEnd();
  expect(component.toJSON()).toMatchSnapshot();
});

it('resets to the first vid if repeat is on', () => {
  const videos = [
    'vid1.mov',
    'vid2.webm'
  ];

  const component = renderer.create(
    <VideoSeq videos={videos} repeat={true} />
  );

  expect(component.toJSON()).toMatchSnapshot();

  // Should start vid2
  component.getInstance().onEnd();
  expect(component.toJSON()).toMatchSnapshot();

  // Should repeat back to vid1
  component.getInstance().onEnd();
  expect(component.toJSON()).toMatchSnapshot();
});

it('calls passed in onEnd function if it exists', () => {
  const videos = [
    'vid1.mov'
  ];

  const mockCallback = jest.fn();

  const component = renderer.create(
    <VideoSeq videos={videos} repeat={true} onEnd={mockCallback} />
  );

  expect(component.toJSON()).toMatchSnapshot();

  component.getInstance().onEnd();
  expect(component.toJSON()).toMatchSnapshot();

  expect(mockCallback.mock.calls.length).toBe(1);
});
