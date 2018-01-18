import dva from 'dva';
import createLoading from 'dva-loading'
import './index.css';

// 1. Initialize
const app = dva({
    ...createLoading({
        effects: true,
    })
});

// 2. Plugins
// app.use({});

// 3. Model
//app.model(require('./models/user').default);
//app.model(require('./models/counter').default);
app.model(require('./models/app').default);


// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
