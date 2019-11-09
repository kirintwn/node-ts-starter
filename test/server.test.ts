import server from '../src';

test('Add()', () => {
  expect(server()).toEqual('hello world');
});
