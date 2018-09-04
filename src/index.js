import dva from 'dva';
import './index.css';
// import createHistory from 'history/createHashHistory';
import createHistory from 'history/createBrowserHistory';

// 1. Initialize
const app = dva({
    history: createHistory(),
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/app').default);
app.model(require('./models/home').default);
app.model(require('./models/game').default);
app.model(require('./models/news').default);
app.model(require('./models/my').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');