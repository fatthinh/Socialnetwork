import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './SuggestedAccounts.module.scss';
import AccountItem from './AccountItem';

const cx = classNames.bind(styles);

function SuggestedAccounts({ label, followings = [] }) {
    return (
        <div className={cx('wrapper')}>
            <div style={{ display: 'flex ', justifyContent: 'space-between' }}>
                <p className={cx('label')}>{label}</p>
                <p className={cx('more-btn')}>See all</p>
            </div>

            {followings.length ? (
                followings.map((item) => {
                    return <AccountItem key={item.id} />;
                })
            ) : (
                <span>No followings</span>
            )}
        </div>
    );
}

SuggestedAccounts.propTypes = {
    label: PropTypes.string.isRequired,
};

export default SuggestedAccounts;
