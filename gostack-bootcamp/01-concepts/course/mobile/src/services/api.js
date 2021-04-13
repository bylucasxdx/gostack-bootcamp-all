import axios from 'axios';

const api = axios.create({
    baseURL: 'http://10.0.2.2:3003'
});


/**
 * Android com emulador: 10.0.2.2 (Android Studio)
 * Android com emulador: 10.0.3.2 (Genymotion)
 */

export default api;