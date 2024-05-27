import classNames from 'classnames/bind';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

function Form({ children }) {
    return <form className={cx('form')}>{children}</form>;
}

export default Form;
