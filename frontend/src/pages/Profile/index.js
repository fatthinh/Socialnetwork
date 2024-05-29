import { Fragment, useState, useEffect, useContext } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMap, faUser } from '@fortawesome/free-regular-svg-icons';
import { faBagShopping, faCamera, faEdit, faExclamation, faPhone, faQuestion } from '@fortawesome/free-solid-svg-icons';
import images from '~/assets/images';
import * as postServices from '~/services/postService';
import * as userServices from '~/services/userService';
import PostList from '~/components/PostList';
import Button from '~/components/Button';
import Modal from '~/components/Modal';
import UploadFile from '~/components/UploadFile';
import Form from '~/components/Form';
import AuthContext from '~/utils/AuthContext';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '~/Context/AppProvider';
import { FormGroupInput } from '~/components/Form/FormGroup';

const cx = classNames.bind(styles);

function Profile() {
    const [myPosts, setMyPosts] = useState([]);
    const [myBookmarkedPosts, setMyBookmarkedPosts] = useState([]);
    const { user, checkUserStatus } = useContext(AuthContext);
    const [changeAvtVisible, setChangeAvtVisible] = useState(false);
    const [editInfoVisible, setEditInfoVisible] = useState(false);
    const navigate = useNavigate();
    const [avatar, setAvatar] = useState();
    const { setLoaderVisible } = useContext(AppContext);
    const [email, setEmail] = useState(user ? user.email : '');
    const [phone, setPhone] = useState(user ? user.phone : '');

    useEffect(() => {
        checkUserStatus();
        if (user) {
            loadMyPosts();
            loadMyBookmarkedPosts();
        } else navigate('/');
    }, []);

    const loadMyPosts = async () => {
        const posts = await postServices.getMyPosts();
        setMyPosts(posts);
    };

    const loadMyBookmarkedPosts = async () => {
        try {
            const postIds = await postServices.getMyBookmarkedPosts();
            const promises = postIds.map((itemId) => postServices.getPostById(itemId));
            const posts = await Promise.all(promises);
            setMyBookmarkedPosts(posts);
        } catch (error) {
            console.error(error);
        }
    };

    const onFileChange = (files) => {
        setAvatar(files[0]);
    };

    const changeAvtAction = async () => {
        setLoaderVisible(true);
        setTimeout(async () => {
            await userServices.uploadAvatar(avatar);
            checkUserStatus();
            setLoaderVisible(false);
        }, 1000);
    };

    return user ? (
        <Fragment>
            <main className={cx('profile')}>
                <div className={cx('container')}>
                    <div className={cx('profile-container')}>
                        <div className={cx('row')}>
                            <div className={cx('col-9', ' col-xl-8', ' col-lg-7', ' col-md-12')}>
                                <div className={cx('cart-info')}>
                                    <div className={cx('row gy-3')}>
                                        <div className={cx('col-12')}>
                                            <div className={cx('profile-user')}>
                                                <div className={cx('profile-avatar')}>
                                                    <img
                                                        src={user.imageUrl ?? images.noImage}
                                                        alt=""
                                                        className={cx('profile-user__avatar')}
                                                        style={{ userSelect: 'none' }}
                                                    />
                                                    <button onClick={() => setChangeAvtVisible(true)}>
                                                        <FontAwesomeIcon icon={faCamera} />
                                                    </button>
                                                </div>
                                                <h1 className={cx('profile-user__name')}>{user.userName}</h1>
                                                <p className={cx('profile-user__desc')}>
                                                    About me: {user.aboutMe ?? 'None'}
                                                </p>
                                            </div>
                                        </div>
                                        <div className={cx('col-12')}>
                                            <h2 className={cx('cart-info__heading')}>Account info</h2>

                                            <div
                                                style={{
                                                    display: 'flex',
                                                    justifyContent: 'space-between',
                                                    paddingTop: 8,
                                                    paddingBottom: 8,
                                                }}
                                            >
                                                <p className={cx('cart-info__desc profile__desc')}>
                                                    Addresses, contact information and password
                                                </p>
                                                <Button primary onClick={() => setEditInfoVisible(true)}>
                                                    <FontAwesomeIcon icon={faEdit} />
                                                </Button>
                                            </div>
                                            <div className={cx('row gy-md-2 row-cols-2 row-cols-lg-1')}>
                                                <div className={cx('col')}>
                                                    <article className={cx('account-info')}>
                                                        <div className={cx('account-info__icon')}>
                                                            <FontAwesomeIcon icon={faEnvelope} />
                                                        </div>
                                                        <div>
                                                            <h3 className={cx('account-info__title')}>Email Address</h3>
                                                            <p className={cx('account-info__desc')}>
                                                                {user.email ?? 'None'}
                                                            </p>
                                                        </div>
                                                    </article>
                                                </div>

                                                <div className={cx('col')}>
                                                    <article className={cx('account-info')}>
                                                        <div className={cx('account-info__icon')}>
                                                            <FontAwesomeIcon icon={faPhone} />
                                                        </div>
                                                        <div>
                                                            <h3 className={cx('account-info__title')}>Phone number</h3>
                                                            <p className={cx('account-info__desc')}>
                                                                {user.phoneNumber ?? 'None'}
                                                            </p>
                                                        </div>
                                                    </article>
                                                </div>

                                                <div className={cx('col')}>
                                                    <article className={cx('account-info')}>
                                                        <div className={cx('account-info__icon')}>
                                                            <FontAwesomeIcon icon={faBagShopping} />
                                                        </div>
                                                        <div>
                                                            <h3 className={cx('account-info__title')}>Occupation</h3>
                                                            <p className={cx('account-info__desc')}>
                                                                {user.occupation ?? 'None'}
                                                            </p>
                                                        </div>
                                                    </article>
                                                </div>
                                            </div>
                                        </div>

                                        {myPosts.length ? (
                                            <div
                                                className={cx('col-12')}
                                                style={{ maxHeight: 420, overflow: 'scroll' }}
                                            >
                                                <h2 className={cx('cart-info__heading')}>My Posts</h2>
                                                <p className={cx('cart-info__desc profile__desc')}></p>
                                                <div
                                                    className={cx('col')}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        marginTop: 8,
                                                        marginBottom: 18,
                                                        maxHeight: 800,
                                                        overflow: 'scroll',
                                                    }}
                                                >
                                                    <PostList posts={myPosts} reload={loadMyPosts} myPosts />
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}

                                        {myBookmarkedPosts.length ? (
                                            <div className={cx('col-12')}>
                                                <h2 className={cx('cart-info__heading')}>My Bookmarked Posts</h2>
                                                <p className={cx('cart-info__desc profile__desc')}></p>
                                                <div
                                                    className={cx('col')}
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        flexDirection: 'column',
                                                        marginTop: 8,
                                                        marginBottom: 18,
                                                        maxHeight: 800,
                                                        overflow: 'scroll',
                                                    }}
                                                >
                                                    <PostList
                                                        posts={myBookmarkedPosts}
                                                        reload={loadMyBookmarkedPosts}
                                                    />
                                                </div>
                                            </div>
                                        ) : (
                                            <></>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <Modal
                heading="Change avatar"
                modalVisible={changeAvtVisible}
                setModalVisible={setChangeAvtVisible}
                action={changeAvtAction}
            >
                <Form>
                    <UploadFile onFileChange={(files) => onFileChange(files)} />
                </Form>
            </Modal>

            <Modal heading="Edit information" modalVisible={editInfoVisible} setModalVisible={setEditInfoVisible}>
                <Form>
                    <FormGroupInput label="Email" value={email} setValue={setEmail} />
                    <FormGroupInput label="Phone" type="tel" value={phone} setValue={setPhone} />
                </Form>
            </Modal>
        </Fragment>
    ) : (
        <></>
    );
}

export default Profile;
