import classNames from 'classnames/bind';
import Sidebar from '~/layouts/components/Sidebar';
import styles from './SidebarOnly.module.scss';

const cx = classNames.bind(styles);

function SidebarOnly({ children }) {
    return (
        <div>
            <Sidebar />
            <div className={cx('container')}>
                <div className={cx('content')}>{children}</div>
            </div>
        </div>
    );
}

export default SidebarOnly;
