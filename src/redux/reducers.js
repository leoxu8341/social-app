import profile from './profiles/reducer';
import auth from './auth/reducer';
import letter from './letter/reducer';
import report from './report/reducer';

const rootReducer = {
    profile,
    auth,
    letter,
    report
}

export default rootReducer;