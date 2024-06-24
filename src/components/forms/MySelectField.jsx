import PropTypes from 'prop-types'; // Importez PropTypes
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Controller } from 'react-hook-form';
import FormHelperText from '@mui/material/FormHelperText';

export default function MySelectField(props) {
  const { label, name, control, width, options } = props;

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <FormControl variant="standard" sx={{ width: typeof width === 'number' ? `${width}px` : width }}>
          <InputLabel id={`select-label-${name}`}>{label}</InputLabel>
          <Select
            labelId={`select-label-${name}`}
            id={`select-${name}`}
            onChange={onChange}
            value={value}
            error={!!error}
          >
            {options.map((option) => (
              <MenuItem key={option.id} value={option.id}>{option.name}</MenuItem>
            ))}
          </Select>
          {error && <FormHelperText sx={{ color: "#d32f2f" }}>{error.message}</FormHelperText>}
        </FormControl>
      )}
    />
  );
}

// Définition des PropTypes pour MySelectField
MySelectField.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  options: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    name: PropTypes.string.isRequired,
  })).isRequired,
};
