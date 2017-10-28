import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox as CheckboxUI, FormControlLabel } from 'material-ui';

export const Checkbox = ({ input, ...rest}) => {
  return <FormControlLabel
            control={
              <CheckboxUI
                checked={input.value}
                onChange={input.onChange}
                {...rest} />
            }
            label="Wybierz wszystkich"/>

};

Checkbox.propTypes = {
  input: PropTypes.object
};

export default Checkbox;
