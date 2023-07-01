import profile from './profiles/reducer';
import auth from './auth/reducer';
import letter from './letter/reducer';
import report from './report/reducer';
import app from './app/reducer';
import message from './message/reducer';

const rootReducer = {
    profile,
    auth,
    letter,
    report,
    app,
    message
}

export default rootReducer;