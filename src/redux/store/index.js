import configureStore from './store';
import reducers from '../reducer';

export default function() {
    console.log("Funzione configure store chiamata con reducers:",reducers);
    return configureStore(reducers);
}
