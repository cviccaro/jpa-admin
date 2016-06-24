"use strict";
var index_1 = require('./index');
var index_2 = require('../shared/index');
exports.BlogsRoutes = [
    {
        path: '',
        redirectTo: '/blogs',
        terminal: true
    },
    {
        path: 'blogs',
        component: index_1.BlogIndexComponent,
        children: [
            { path: ':id', component: index_1.BlogComponent },
            { path: '', component: index_1.BlogListComponent, canActivate: [index_2.BlogsGuard] }
        ]
    },
];

//# sourceMappingURL=blogs.routes.js.map
