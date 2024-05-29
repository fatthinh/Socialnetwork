import classNames from 'classnames/bind';
import styles from './Sidebar.module.scss';
import images from '~/assets/images';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDashboard, faHome } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function Sidebar() {
    const navigate = useNavigate();
    return (
        <div className={cx('sidebar')}>
            <div className={cx('sidebar-header')}>
                <div className={cx('app-icon')}>
                    <button onClick={() => navigate('/')}>
                        <img className={cx('logo')} src={images.logo} />
                    </button>
                </div>
            </div>
            <ul className={cx('sidebar-list')}>
                <li className={cx('sidebar-list-item')}>
                    <button>
                        <FontAwesomeIcon icon={faHome} />
                        <span>Home</span>
                    </button>
                </li>
                <li className={cx('sidebar-list-item')}>
                    <button>
                        <FontAwesomeIcon icon={faDashboard} />
                        <span>Dashboard</span>
                    </button>
                </li>
            </ul>
            <div className={cx('account-info')}>
                <div className={cx('account-info-picture')}>
                    <img
                        src="https://res.cloudinary.com/dzjhqjxqj/image/upload/v1703844016/v2depwkhte1trcs0z9q9.jpg"
                        alt="Account"
                    />
                </div>
                <div className={cx('account-info-name')}>Thinh Lam</div>
                <button className={cx('account-info-more')}>
                    {/* <i className={cx('bx bx-dots-horizontal-rounded')} style="font-size: 24px"></i> */}
                </button>
            </div>
        </div>
    );
}

export default Sidebar;
