import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import Menu, { MenuItem } from './Menu';
import { HomeIcon, HomeActiveIcon, UserGroupIcon, UserGroupActiveIcon } from '~/components/Icons';
import SuggestedAccounts from '~/components/SuggestedAccounts';
import config from '~/config';
import { useContext, useState, useEffect } from 'react';
import AuthContext from '~/utils/AuthContext';
import * as userServices from '~/services/userService';

const cx = classNames.bind(styles);

function Sidebar() {
    const { user } = useContext(AuthContext);
    const [followings, setFollowings] = useState([]);

    useEffect(() => {
        const res = userServices.getFollowings();
        setFollowings(res);
    }, [user]);

    return (
        <aside className={cx('wrapper')}>
            <Menu>
                <MenuItem title="Home" to={config.routes.home} icon={<HomeIcon />} activeIcon={<HomeActiveIcon />} />
                <MenuItem
                    title="Following"
                    to={config.routes.following}
                    icon={<UserGroupIcon />}
                    activeIcon={<UserGroupActiveIcon />}
                />
            </Menu>

            <SuggestedAccounts label="Followings" followings={followings} />
        </aside>
    );
}

export default Sidebar;
