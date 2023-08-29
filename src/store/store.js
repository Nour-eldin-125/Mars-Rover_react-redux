import {createStore} from 'redux'
import reducer from './rover.reducer'


const store = createStore(reducer)
export default store;