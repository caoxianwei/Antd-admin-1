const APIROOT = '/api';

module.exports = {
    name: 'Antd admin',
    footerText: 'antd admin code By yxy © 2018 ',
    apiPrefix:'/api',
    openPages:['/login'],//打开页  为啥要定义成数组..又不需要往数组push东西
    api:{
        userLogin: `${APIROOT}/user/login`,
        userLogout: `${APIROOT}/user/logout`,
        users: `${APIROOT}/users`
    }
}
