import profile from './profiles/reducer';
import auth from './auth/reducer';
import letter from './letter/reducer';

const rootReducer = {
    profile,
    auth,
    letter
}

export default rootReducer;