import { RadioGroup, } from '@material-ui/core';
import React from 'react';
import Label from 'src/components/TextInput/Label';

export const GenderRadioGroup = ({ input, ...rest }) => {
  return (
    <>
      <Label disabled={false}>Gender</Label>
      <RadioGroup row
        value={input.selected}
        onChange={(_event, value) => input.onChange(value)}
        {...input}
        {...rest}
      />
    </>
  )
}

