import classNames from 'classnames/bind';
import { useContext } from 'react';
import { useRef } from 'react';
import { AppContext } from '~/Context/AppProvider';
import Button from '../Button';
import styles from './Modal.module.scss';

const cx = classNames.bind(styles);

function Modal({ children, heading, action, create, modalVisible, setModalVisible, actionRemove }) {
    const actionOnClick = () => {
        setModalVisible(false);
        action();
    };

    const actionOnClickRemove = () => {
        setModalVisible(false);
        actionRemove();
    };

    return (
        <>
            <div className={cx('modal', modalVisible ? 'show' : 'hide')}>
                <div className={cx('modal__content')}>
                    <h2 className={cx('modal__heading')}>{heading}</h2>
                    {children}
                    <div className={cx('modal__bottom')}>
                        <Button
                            className={cx('model__btn')}
                            outline
                            onClick={() => {
                                setModalVisible(false);
                            }}
                        >
                            Cancel
                        </Button>
                        <Button className={cx('model__btn')} primary onClick={actionOnClick}>
                            {create ? 'Create' : 'Save'}
                        </Button>
                        {actionRemove ? (
                            <Button className={cx('model__btn')} rounded onClick={actionOnClickRemove}>
                                Remove
                            </Button>
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
                <div className={cx('modal__overlay')}></div>
            </div>
        </>
    );
}

export default Modal;
