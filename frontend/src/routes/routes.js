import config from '~/config';

// Layouts
import { HeaderOnly } from '~/layouts';
import { SidebarOnly } from '~/layouts';

// Pages
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Live from '~/pages/Live';
import SignIn from '~/pages/SignIn';
import SignUp from '~/pages/SignUp';

// Public routes
const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.following, component: Following },
    { path: config.routes.live, component: Live },
    { path: config.routes.myProfile, component: Profile, layout: SidebarOnly },
    { path: config.routes.upload, component: Upload, layout: HeaderOnly },
    { path: config.routes.search, component: Search, layout: null },
    { path: config.routes.signin, component: SignIn, layout: null },
    { path: config.routes.signup, component: SignUp, layout: null },
];

const privateRoutes = [];

export { publicRoutes, privateRoutes };
