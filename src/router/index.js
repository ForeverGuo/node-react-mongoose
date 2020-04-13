import { Route } from 'react-router-dom';
import async from './async';

// const PageOne = async(() => import('@/components/PageOne'))
// const PageTwo = async(() => import('@/components/PageTwo'))

import OverView from '@/components/OverView'
import PerforEval from '@/components/PerforEval'
import Module from '@/components/Module'
const routes = [
    {
        path: '/',
        component: OverView,
        name: 'overview',
        title: '性能监控',
        icon:'pie-chart',
        exact: true,
        // children: [
        //     {
        //         path: '/',
        //         component: PageOne,
        //         name: 'option1',
        //         key: 'home_first'
        //     }
        // ]
    },
    {
        path: '/perforeval',
        component: PerforEval,
        name: 'perforeval',
        title: '异常监控',
        icon:'close-circle'
    },
    {
        path: '/module',
        component: Module,
        name: 'module',
        title: '模块',
        icon:'clock-circle'
    },
];

export default routes;