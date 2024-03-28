import {render} from '@testing-library/react';
import React from 'react';

describe('Cards', () => {
  test('should render component', () => {
    render(<p>Hello world</p>);
  });

  test('should contain Hello World', () => {
    const {getByText} = render(<p>Hello world</p>);
    expect(getByText('Hello world')).toBeTruthy();
  });
});
