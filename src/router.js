import React from 'react';
import {  Route, Switch,Redirect,routerRedux } from 'dva/router';
import dynamic from 'dva/dynamic';
import App from './routes/app';


const { ConnectedRouter } = routerRedux


const RunterConfig  = function({history,app}){
    const notFound = dynamic({
        app,
        component:()=>import('./routes/error/index.js')
    });
    const routes = [
        {
            path: '/login',
            models: () => [import('./models/login')],
            component: () => import('./routes/login/login.js'),
        },{
            path:'/userset',//用户管理对应的用户列表
            models:()=>[import('./models/user')],
            component:()=>import('./routes/user/Modal.js'),
        },{
            path:'/roleset',//角色管理
            //models:()=>[import('./models/user')],
            component:()=>import('./routes/role/modal.js'),
        },{
            path:'/menuset',//菜单配置
            models:()=>[import('./models/menus.js')],
            component:()=>import('./routes/menus/modal.js'),
        },{
            path:'/studydemo',
            component:()=>import('./routes/counter/Counter.js')
        },{
            path:'/adminsee',
            //component:()=>import('./routes/test/adminsee.js'),
            component:()=>import('./routes/orders/sellOrder.js')
        },{
            path:'/developersee',
            //component:()=>import('./routes/test/developersee.js'),
            component:()=>import('./routes/orders/buyOrder.js')
        },{
            path:'/originsee',
            //component:()=>import('./routes/test/originsee.js')
            component:()=>import('./routes/orders/originOrder.js')
        }
    ]
    return (
        <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/developersee"/>)} />
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
        </App>
      </ConnectedRouter>
    )
}


export default RunterConfig

