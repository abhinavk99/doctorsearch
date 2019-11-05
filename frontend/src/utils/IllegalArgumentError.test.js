import { expect } from 'chai';
import IllegalArgumentError from './IllegalArgumentError';

it('should correctly create an IllegalArgumentError', () => {
  const err = new IllegalArgumentError('Error message');
  expect(err.message).to.equal('Error message');
  expect(err.name).to.equal('IllegalArgumentError');
});
