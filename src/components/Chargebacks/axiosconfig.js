import axios from 'axios';
import { getCsrfToken } from './utils/csrfTokenUtil'; // Assurez-vous que le chemin est correct

axios.defaults.headers.common['X-CSRFToken'] = getCsrfToken();

export default axios;
