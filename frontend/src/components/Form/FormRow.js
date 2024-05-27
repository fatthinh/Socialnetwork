import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function FormRow({ children }) {
    return <div className={cx('form__row')}>{children}</div>;
}

export default FormRow;
