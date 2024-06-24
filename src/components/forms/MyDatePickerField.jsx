import TextField from '@mui/material/TextField'; // Import TextField
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';

function MyDatePickerField({ label, control, width, name }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error } }) => (
          <DatePicker
            label={label}
            sx={{ width: width }}
            onChange={onChange}
            value={value}
            renderInput={(params) => (
              <TextField {...params} error={!!error} helperText={error?.message} />
            )}
          />
        )}
      />
    </LocalizationProvider>
  );
}

MyDatePickerField.propTypes = {
  label: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  width: PropTypes.string,
  name: PropTypes.string.isRequired,
};

export default MyDatePickerField;
