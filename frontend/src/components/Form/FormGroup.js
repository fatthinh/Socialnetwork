import { faCircleXmark } from '@fortawesome/free-regular-svg-icons';
import { faExclamation, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import Button from '../Button';
import styles from './Form.module.scss';

const cx = classNames.bind(styles);

export const FormGroupText = ({ label, placeholder, required, value, setValue }) => {
    return (
        <div className={cx('form__group')}>
            <label className={cx('form__label', 'form__label--small')}>{label}</label>
            <div className={cx('form__text-area')}>
                <textarea
                    placeholder={placeholder}
                    className={cx('form__text-area-input')}
                    required={required}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                ></textarea>
                {/* <FontAwesomeIcon icon={faExclamation} /> */}
            </div>
            <p className={cx('form__error')}>{label} not empty</p>
        </div>
    );
};

export const FormGroupInput = ({ label, placeholder, required, type = 'text', value, setValue = () => {} }) => {
    return (
        <div className={cx('form__group')}>
            <label className={cx('form__label', 'form__label--small')}>{label}</label>
            <div className={cx('form__text-input', 'form__text-input--small')}>
                <input
                    type={type}
                    placeholder={placeholder}
                    className={cx('form__input')}
                    required={required}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <FontAwesomeIcon icon={faExclamation} className={cx('form__input-icon-error')} />
            </div>
            <p className={cx('form__error')}>{label} not empty</p>
        </div>
    );
};

export const FormGroupSelect = ({ label, placeholder, options }) => {
    return (
        <div className={cx('form__group')}>
            <label className={cx('form__label', 'form__label--small')}>{label}</label>
            <div className={cx('form__text-input', 'form__text-input--small')}>
                <input type="text" readonly placeholder={placeholder} className={cx('form__input')} />

                <div className={cx('form__select-dialog', 'hide')}>
                    <h2 className={cx('form__dialog-heading', 'd-none', 'd-sm-block')}>{label}</h2>
                    <Button>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className={cx('form__close-dialog', ' d-none', ' d-sm-block')}
                        />
                    </Button>
                    <div className={cx('form__search')}>
                        <input type="text" placeholder="Search" className={cx('form__search-input')} />
                        <FontAwesomeIcon icon={faMagnifyingGlass} className={cx('form__search-icon', 'icon')} />
                    </div>
                    <ul className={cx('form__options-list')}>
                        {options.map((option, index) => {
                            return (
                                <li key={index} className={cx('form__option')}>
                                    {option}
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export const FormGroupCheckbox = ({ label, value, setValue }) => {
    return (
        <div className={cx('form__group', 'form__group--inline')}>
            <label className={cx('form__checkbox')}>
                <input
                    type="checkbox"
                    className={cx('form__checkbox-input', 'd-none')}
                    onChange={() => {
                        setValue(!value);
                    }}
                    value={value}
                />
                <span className={cx('form__checkbox-label')}>{label}</span>
            </label>
        </div>
    );
};
