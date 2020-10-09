import { errorHandler } from './middleware/error-handler';
import express from 'express';
import {json} from 'body-parser';
import { currentUserRouter } from './routes/current-user';
import { signinRouter } from './routes/signin';
import { signoutRouter } from './routes/signout';
import { signupRouter } from './routes/signup';

const app = express();

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);
app.use(errorHandler);

app.get('/api/users/user', (req,res) => {
    res.send('hi there')
});

app.use(json());

app.listen(3000, () => {
    console.log('Auth listning on port 3000');
}); 