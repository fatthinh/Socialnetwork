import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './AdminLayout.module.scss';
import Sidebar from './components/Sidebar';
import Header from './components/Header';

const cx = classNames.bind(styles);

function AdminLayout({ children }) {
    return (
        <div className={cx('app-container')}>
            <Sidebar />
            <div className={cx('app-content')}>
                <Header />
                <>{children}</>
            </div>
        </div>
    );
}

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout;
