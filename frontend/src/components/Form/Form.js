import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form({ children }) {
    return <div className={cx('form')}>{children}</div>;
}

export default Form;
