import config from '~/config';

// Layouts
import { SidebarOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Live from '~/pages/Live';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';
import PostManager from '~/pages/PostManager/index';
import AdminLayout from '~/layouts/AdminLayout/AdminLayout';
import Dashboard from '~/pages/PostManager/Dashboard';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.myProfile, component: Profile, layout: SidebarOnly },
    { path: config.routes.signin, component: SignIn, layout: null },
    { path: config.routes.signup, component: SignUp, layout: null },
    { path: config.routes.admin, component: PostManager, layout: AdminLayout },
    { path: config.routes.dashboard, component: Dashboard, layout: AdminLayout },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
