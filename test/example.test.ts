import lookupGoogle from '../src/main';

test('lookupGoogle()', async () => {
  const result = await lookupGoogle();
  expect([4, 6]).toContain(result.family);
});
