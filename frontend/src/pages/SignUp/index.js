import classNames from 'classnames/bind';
import styles from '../SignIn/Signin.module.scss';

import RegisterIntro from '~/components/RegisterIntro';
import images from '~/assets/images';
import { FormGroupInput } from '~/components/Form/FormGroup';
import FormRow from '~/components/Form/FormRow';
import Button from '~/components/Button';
import Form from '~/components/Form';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import * as userServices from '~/services/userService';

const cx = classNames.bind(styles);

function SignUp() {
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = (e) => {
        e.preventDefault();
        const result = userServices.register(email, username, password);
    };

    return (
        <main className={cx('auth')}>
            <div id="auth-content" className={cx('auth__content', 'hide')}>
                <div className={cx('auth__content-inner')}>
                    <a href="./" className={cx('logo')}>
                        <img src={images.logo} alt="" className={cx('logo__img')} />
                        <h1 className={cx('logo__title')}></h1>
                    </a>
                    <h1 className={cx('auth__heading')}>Sign Up</h1>
                    <p className={cx('auth__desc')}>Let’s create your account and enjoy social stories.</p>
                    <Form>
                        <FormGroupInput placeholder="Username" required value={username} setValue={setUsername} />
                        <FormGroupInput placeholder="Email" required type="email" value={email} setValue={setEmail} />
                        <FormGroupInput
                            placeholder="Password"
                            required
                            type="password"
                            value={password}
                            setValue={setPassword}
                        />
                        <div className={cx('auth__btn-group')}>
                            <FormRow>
                                <Button primary onClick={handleSignUp}>
                                    Sign Up
                                </Button>
                            </FormRow>
                            <FormRow>
                                <Button outline leftIcon={<FontAwesomeIcon icon={faGoogle} />}>
                                    Sign In with Google
                                </Button>
                            </FormRow>
                        </div>
                    </Form>
                    <p className={cx('auth__text')}>
                        You have an account yet?
                        <Button to="/sign-in" className={cx('auth__link', 'auth__text-link')}>
                            Sign In
                        </Button>
                    </p>
                </div>
            </div>

            <div className={cx('auth__intro')}>
                <RegisterIntro />
                <p className={cx('auth__intro-text')}>Social network</p>
                <button
                    className={cx('auth__intro-next', 'd-none', 'd-md-flex', 'js-toggle')}
                    toggle-target="#auth-content"
                >
                    <img src="./assets/img/auth/intro-arrow.svg" alt="" />
                </button>
            </div>
        </main>
    );
}

export default SignUp;
