import TextField from '@mui/material/TextField';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types'; // Étape 1: Importez PropTypes

export default function MyTextField(props) {
  const { label, width, placeholder, name, control } = props;
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <TextField
          sx={{ width: width }} // Corrigé pour appliquer correctement la largeur
          onChange={onChange}
          value={value}
          id="standard-basic"
          label={label}
          variant="standard"
          placeholder={placeholder}
          error={!!error}
          helperText={error?.message}
        />
      )}
    />
  );
}

// Étape 2: Définissez les propTypes pour le composant MyTextField
MyTextField.propTypes = {
  label: PropTypes.string.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]), // width peut être un nombre ou une chaîne
  placeholder: PropTypes.string,
  name: PropTypes.string.isRequired,
  control: PropTypes.object.isRequired, // 'control' est un objet, mais sa structure détaillée dépend de react-hook-form
};
