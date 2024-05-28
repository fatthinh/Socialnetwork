import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './Loader.module.scss';
import { useContext } from 'react';
import { AppContext } from '~/Context/AppProvider';

const cx = classNames.bind(styles);

function Loader() {
    const { loaderVisible } = useContext(AppContext);

    return (
        <>
            <div className={cx('modal', loaderVisible ? 'show' : 'hide')}>
                <div className={cx('modal__content')}>
                    <div className={cx('loader')}></div>
                </div>
                <div className={cx('modal__overlay')}></div>
            </div>
        </>
    );
}

export default Loader;
