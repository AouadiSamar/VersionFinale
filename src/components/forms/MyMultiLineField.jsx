import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function MyMultiLineField({ label, placeholder, width, name, control }) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          id="standard-multiline-static"
          sx={{ width: width }}
          label={label}
          multiline
          onChange={onChange}
          value={value}
          rows={4} // Adjusted to show multiple lines by default
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

MyMultiLineField.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  width: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
};

export default MyMultiLineField;
