import { Fragment, useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import Image from '~/components/Image';
import { NewPostIcon } from '~/components/Icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMap, faUser } from '@fortawesome/free-regular-svg-icons';
import { faCamera, faExclamation, faPhone, faQuestion } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import * as postServices from '~/services/postService';
import * as userServices from '~/services/userService';
import PostList from '~/components/PostList';

const cx = classNames.bind(styles);

function Profile() {
    const [myPosts, setMyPosts] = useState([]);
    const [currentUser, setCurrentUser] = useState();

    useEffect(() => {
        loadMyPosts();
        loadCurrentUser();
    }, []);

    const loadCurrentUser = async () => {
        const res = await userServices.getCurrentuser();
        setCurrentUser(res);
    };

    const loadMyPosts = async () => {
        const posts = await postServices.getMyPosts();
        setMyPosts(posts);
    };

    return currentUser ? (
        <Fragment>
            <main className={cx('profile')}>
                <div className={cx('container')}>
                    <div className={cx('profile-container')}>
                        <div className={cx('row', 'gy-md-3')}>
                            <div className={cx('col-9', ' col-xl-8', ' col-lg-7', ' col-md-12')}>
                                <div className={cx('cart-info')}>
                                    <div className={cx('row gy-3')}>
                                        <div className={cx('col-12')}>
                                            <h2 className={cx('cart-info__heading')}>Account info</h2>
                                            <p className={cx('cart-info__desc profile__desc')}>
                                                Addresses, contact information and password
                                            </p>
                                            <div className={cx('row gy-md-2 row-cols-2 row-cols-lg-1')}>
                                                <div className={cx('col')}>
                                                    <a>
                                                        <article className={cx('account-info')}>
                                                            <div className={cx('account-info__icon')}>
                                                                <FontAwesomeIcon icon={faEnvelope} />
                                                            </div>
                                                            <div>
                                                                <h3 className={cx('account-info__title')}>
                                                                    Email Address
                                                                </h3>
                                                                <p className={cx('account-info__desc')}>
                                                                    {currentUser.email ?? 'None'}
                                                                </p>
                                                            </div>
                                                        </article>
                                                    </a>
                                                </div>

                                                <div className={cx('col')}>
                                                    <a>
                                                        <article className={cx('account-info')}>
                                                            <div className={cx('account-info__icon')}>
                                                                <FontAwesomeIcon icon={faPhone} />
                                                            </div>
                                                            <div>
                                                                <h3 className={cx('account-info__title')}>
                                                                    Phone number
                                                                </h3>
                                                                <p className={cx('account-info__desc')}>
                                                                    {currentUser.phoneNumber ?? 'None'}
                                                                </p>
                                                            </div>
                                                        </article>
                                                    </a>
                                                </div>

                                                <div className={cx('col')}>
                                                    <a>
                                                        <article className={cx('account-info')}>
                                                            <div className={cx('account-info__icon')}>
                                                                <FontAwesomeIcon icon={faMap} />
                                                            </div>
                                                            <div>
                                                                <h3 className={cx('account-info__title')}>
                                                                    Occupation
                                                                </h3>
                                                                <p className={cx('account-info__desc')}>
                                                                    {currentUser.occupation ?? 'None'}
                                                                </p>
                                                            </div>
                                                        </article>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={cx('col-12')}>
                                            <h2 className={cx('cart-info__heading')}>Posts</h2>
                                            <p className={cx('cart-info__desc profile__desc')}></p>
                                            <div
                                                className={cx('col')}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    flexDirection: 'column',
                                                    marginTop: 8,
                                                    marginBottom: 18,
                                                }}
                                            >
                                                <PostList posts={myPosts} myPosts />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={cx('col-3', 'col-xl-4', 'col-lg-5', 'col-md-12')}>
                                <aside className={cx('profile__sidebar')}>
                                    <div className={cx('profile-user')}>
                                        {/* <div class="info-image">
                                        <a>
                                            <img
                                                src="@user.ImageUrl"
                                                alt="image"
                                                class="profile-image"
                                                id="profile-image"
                                            />
                                        </a>
                                        <div class="icon">
                                            <a onclick="chooseMedia(event)" style="cursor: pointer;">
                                                <i class="flaticon-photo-camera"></i>
                                            </a>
                                        </div>
                                    </div> */}
                                        <div className={cx('profile-avatar')}>
                                            <img
                                                src={currentUser.imageUrl ?? images.noImage}
                                                alt=""
                                                className={cx('profile-user__avatar')}
                                                style={{ userSelect: 'none' }}
                                            />
                                            <FontAwesomeIcon icon={faCamera} />
                                        </div>
                                        <h1 className={cx('profile-user__name')}>{currentUser.userName}</h1>
                                        <p className={cx('profile-user__desc')}>
                                            About me: {currentUser.aboutMe ?? 'None'}
                                        </p>
                                    </div>

                                    <div className={cx('profile-menu')}>
                                        <h3 className={cx('profile-menu__title')}>Manage Account</h3>
                                        <ul className={cx('profile-menu__list')}>
                                            <li>
                                                <a className={cx('profile-menu__link')}>
                                                    <span className={cx('profile-menu__icon')}>
                                                        <FontAwesomeIcon icon={faUser} />
                                                    </span>
                                                    Personal info
                                                </a>
                                            </li>
                                            <li>
                                                <a className={cx('profile-menu__link')}>
                                                    <span className={cx('profile-menu__icon')}>
                                                        <FontAwesomeIcon icon={faEnvelope} />
                                                    </span>
                                                    Communications & privacy
                                                </a>
                                            </li>
                                        </ul>
                                    </div>

                                    <div className={cx('profile-menu')}>
                                        <h3 className={cx('profile-menu__title')}>Service</h3>
                                        <ul className={cx('profile-menu__list')}>
                                            <li>
                                                <a className={cx('profile-menu__link')}>
                                                    <span className={cx('profile-menu__icon')}>
                                                        <FontAwesomeIcon icon={faQuestion} />
                                                    </span>
                                                    Help
                                                </a>
                                            </li>
                                            <li>
                                                <a className={cx('profile-menu__link')}>
                                                    <span className={cx('profile-menu__icon')}>
                                                        <FontAwesomeIcon icon={faExclamation} />
                                                    </span>
                                                    Terms of Use
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </aside>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Fragment>
    ) : (
        <></>
    );
}

export default Profile;
