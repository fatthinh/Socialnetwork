import classNames from 'classnames/bind';
import styles from './Signin.module.scss';
import images from '../../assets/images/index';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';
import Button from '~/components/Button';
import Form from '~/components/Form';
import { FormGroupCheckbox, FormGroupInput } from '~/components/Form/FormGroup';
import FormRow from '~/components/Form/FormRow';
import AuthIntro from '~/components/AuthIntro';
import { useState, useEffect } from 'react';
import * as userServices from '~/services/userService';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authenticationSlice from '~/redux/authenticationSlice';

const cx = classNames.bind(styles);

function SignIn() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    // const currentUser = useSelector((state) => state.authentication.user);
    const currentUser = sessionStorage.getItem('access-token');

    const handleSignIn = async (e, username, password, rememberMe) => {
        e.preventDefault();

        const result = await userServices.login(username, password, rememberMe);
        if (result) {
            console.log(result);
            dispatch(authenticationSlice.actions.login(result));
            navigate('/');
        }
    };

    useEffect(() => {
        if (currentUser) {
            navigate('/');
        }
    }, [currentUser]);

    return (
        <main className={cx('auth')}>
            <div className={cx('auth__intro', 'd-md-none')}>
                <AuthIntro />
                <p className={cx('auth__intro-text')}>How are you today?</p>
            </div>

            <div className={cx('auth__content')}>
                <div className={cx('auth__content-inner')}>
                    <Button to="/" className={cx('logo')}>
                        <img src={images.logo} alt="story" className={cx('logo__img')} />
                        <h2 className={cx('logo__title')}></h2>
                    </Button>
                    <h1 className={cx('auth__heading')}>Hello Again!</h1>
                    <p className={cx('auth__desc')}>Welcome back to sign in.</p>
                    <Form>
                        <FormGroupInput placeholder="Username" required value={username} setValue={setUsername} />
                        <FormGroupInput
                            placeholder="Password"
                            required
                            type="password"
                            value={password}
                            setValue={setPassword}
                        />
                        <FormRow>
                            <FormGroupCheckbox label="Remember me" value={rememberMe} setValue={setRememberMe} />
                            <Button
                                style={{ marginTop: 30, justifyContent: 'flex-end' }}
                                className={cx('auth__link', 'form__pull-right')}
                            >
                                Forgot password?
                            </Button>
                        </FormRow>
                        <div className={cx('auth__btn-group')}>
                            <FormRow>
                                <Button primary onClick={(e) => handleSignIn(e, username, password, rememberMe)}>
                                    Sign In
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
                        Don’t have an account yet?
                        <Button to="/sign-up" className={cx('auth__link', 'auth__text-link')}>
                            Sign Up
                        </Button>
                    </p>
                </div>
            </div>
        </main>
    );
}

export default SignIn;
