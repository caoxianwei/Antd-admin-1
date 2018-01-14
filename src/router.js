import React from 'react';
import {  Route, Switch,Redirect,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
const { ConnectedRouter } = routerRedux

const RunterConfig  = function({history,app}){
    const notFound = dynamic({
        app,
        component:()=>import('./routes/error/index.js')
    });
    const routes = [
        {
            path:'/user',
            //models:()=>[import('./models/user')],
            component:()=>import('./routes/user/Modal.js'),
        },{
            path:'/studydemo',
            component:()=>import('./routes/counter/Counter.js')
        },{
            path: '/login',
            //models: () => [import('./models/login')],
            component: () => import('./routes/login/login.js'),
        }
    ]
    return (
        <ConnectedRouter history={history}>
        {/* <App> */}
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/user"/>)} />
            {
              routes.map(({ path, ...dynamics }, key) => (
                <Route key={key}
                  exact
                  path={path}
                  component={dynamic({
                    app,
                    ...dynamics,
                  })}
                />
              ))
            }
            <Route path='*' exact component={notFound} />
          </Switch>
        {/* </App> */}
      </ConnectedRouter>
    )
}


export default RunterConfig

