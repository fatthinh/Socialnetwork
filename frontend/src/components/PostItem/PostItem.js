import { Fragment, useRef, useState, useEffect } from 'react';
import Image from '../Image';
import classNames from 'classnames/bind';
import styles from './PostItem.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faBookmark,
    faComment,
    faFlag,
    faHeart,
    faPaperPlane,
    faPenToSquare,
} from '@fortawesome/free-regular-svg-icons';

import Button from '../Button';
import { faEllipsisVertical, faSquareXmark } from '@fortawesome/free-solid-svg-icons';
import { useOnLoadImages } from '~/hooks/useOnLoadImages';
import { ClipLoader } from 'react-spinners';
import * as likeServices from '~/services/likeService';
import * as postServices from '~/services/postService';
import * as userServices from '~/services/userService';

import { useNavigate } from 'react-router-dom';
import Menu from '../Popper/Menu';
import Modal from '../Modal';
import Form from '../Form';
import { FormGroupText } from '../Form/FormGroup';

const cx = classNames.bind(styles);

const MENU_ITEMS = [
    {
        icon: <FontAwesomeIcon icon={faFlag} />,
        title: 'Report',
    },
    {
        icon: <FontAwesomeIcon icon={faSquareXmark} />,
        title: 'Hide this post',
    },
    // {
    //     icon: <FontAwesomeIcon icon={faTrash} />,
    //     title: 'Remove',
    //     onClick: (e) => {
    //         const postId = e.target.closest('#post-item').dataset.id;
    //         postServices.deleteMyPost(postId);
    //     },
    // },
];

function PostItem({ user, postImage, likes, timestamp, description, postID, myPost = false }) {
    const wrapperRef = useRef(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);
    const [liked, setLiked] = useState(false);
    const [comments, setComments] = useState([]);
    const [postLikes, setPostLikes] = useState(likes);
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [currentUser, setCurrentUser] = useState({});
    const [editVisible, setEditVisible] = useState(false);
    const [caption, setCaption] = useState(description);
    const [loading, setLoading] = useState(false);

    const getDateTimeDifference = (dateTime) => {
        const requestTime = new Date(dateTime);
        const currentTime = new Date();

        // Calculate the time difference in milliseconds
        const difference = Math.abs(currentTime.getTime() - requestTime.getTime());

        // If the time difference is less than 1 second, return "Right now"
        if (difference < 1000) {
            return 'Right now';
        }

        // Convert milliseconds to seconds, minutes, hours, days, months, and years
        const seconds = Math.floor(difference / 1000);
        const minutes = Math.floor(seconds / 60);
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);
        const months = Math.floor(days / 30);
        const years = Math.floor(months / 12);

        // Format the result as a string
        if (years > 0) {
            return years + (years === 1 ? ' year ago' : ' years ago');
        } else if (months > 0) {
            return months + (months === 1 ? ' month ago' : ' months ago');
        } else if (days > 0) {
            return days + (days === 1 ? ' day ago' : ' days ago');
        } else if (hours > 0) {
            return hours + (hours === 1 ? ' hour ago' : ' hours ago');
        } else if (minutes > 0) {
            return minutes + (minutes === 1 ? ' minute ago' : ' minutes ago');
        } else {
            return seconds + (seconds === 1 ? ' second ago' : ' seconds ago');
        }
    };

    useEffect(() => {
        getCurrentuser();
        checkLikedPost();
        getComments();
    }, []);

    const getCurrentuser = async () => {
        const user = await userServices.getCurrentuser();
        setCurrentUser(user);
    };

    const getComments = async () => {
        const res = await postServices.getPostComments(postID);
        if (res) {
            setComments(res);
            setCommentText('');
        }
    };

    const checkLikedPost = async () => {
        if (currentUser) {
            const liked = await likeServices.checkLiked(postID);
            if (liked) {
                setLiked(true);
            }
        }
    };

    const handleEditPost = async () => {
        await postServices.editMyPost(postID, caption);
        setLoading(true);
    };

    const handleRemovePost = () => {
        postServices.deleteMyPost(postID);
        setLoading(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [loading]);

    console.log(loading);

    const handleLike = async (postID) => {
        if (currentUser) {
            if (liked) {
                await likeServices.unLike(postID);
                setLiked(false);
                setPostLikes((postLikes) => postLikes - 1);
            } else {
                await likeServices.addLike(postID);
                setLiked(true);
                setPostLikes((postLikes) => postLikes + 1);
            }
        } else {
            navigate('/sign-in');
        }
    };

    const addComment = async () => {
        if (currentUser) {
            await postServices.addPostComment(postID, commentText);
            getComments();
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <Fragment>
            <div className={cx('post')} id="post-item" ref={wrapperRef} data-id={postID}>
                <div className={cx('post__header')}>
                    <div className={cx('post__headerAuthor')}>
                        {!imagesLoaded ? <ClipLoader size={16} /> : <Image avatar src={user.avatar} alt={user.name} />}
                        <span style={{ marginLeft: 10 }}>{user.name}</span>
                        <span style={{ marginLeft: 20 }}>{getDateTimeDifference(timestamp)}</span>
                    </div>
                    {myPost ? (
                        <Button outline onClick={() => setEditVisible(true)}>
                            <FontAwesomeIcon icon={faPenToSquare} />
                        </Button>
                    ) : (
                        <Menu items={MENU_ITEMS}>
                            <button className={cx('more-btn')}>
                                <FontAwesomeIcon icon={faEllipsisVertical} />
                            </button>
                        </Menu>
                    )}
                </div>
                <div className={cx('post__image')}>
                    <Image src={postImage} alt="Post Image" />
                </div>
                <div className={cx('post__footer')}>
                    <div className={cx('post__footerIcons')}>
                        <div className={cx('post__iconsMain')}>
                            <Button small className={cx('post-icon')} onClick={() => handleLike(postID)}>
                                {liked ? (
                                    <h4 style={{ color: 'var(--primary)' }}>
                                        <FontAwesomeIcon icon={faHeart} />
                                    </h4>
                                ) : (
                                    <FontAwesomeIcon icon={faHeart} />
                                )}
                            </Button>
                            <Button small className={cx('post-icon')} onClick={() => setShowComments(!showComments)}>
                                <FontAwesomeIcon icon={faComment} />
                            </Button>
                            <Button small className={cx('post-icon')}>
                                <FontAwesomeIcon icon={faPaperPlane} />
                            </Button>
                        </div>
                        <div className={cx('post__iconSave')}>
                            <Button small className={cx('post-icon')}>
                                <FontAwesomeIcon icon={faBookmark} />
                            </Button>
                        </div>
                    </div>
                    {postLikes ? `Liked by ${postLikes} people.` : <></>}
                    <p>{description}</p>
                </div>
                {showComments ? (
                    <>
                        <h3 style={{ padding: 8 }}>Comments</h3>
                        <div className={cx('post__comments')} style={{ maxHeight: 180, overflow: 'scroll' }}>
                            {comments.map((comment) => (
                                <div
                                    key={comment.id}
                                    style={{ alignItems: 'center', display: 'flex', padding: 4, gap: 4 }}
                                >
                                    <span>
                                        <Image avatar src={comment.user?.imageUrl} />
                                    </span>
                                    <span style={{ fontSize: 12, overflow: 'hidden' }}>{comment.text}</span>
                                </div>
                            ))}
                        </div>
                        <div
                            className={cx('post__comment-box')}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                border: 1,
                                borderColor: '#000',
                                borderStyle: 'solid',
                                borderRadius: 4,
                                padding: 4,
                            }}
                        >
                            <input
                                placeholder="Add a comment..."
                                value={commentText}
                                onChange={(e) => setCommentText(e.target.value)}
                                style={{ width: '100%', fontSize: 14 }}
                            />
                            <Button primary onClick={() => addComment()}>
                                Post
                            </Button>
                        </div>
                    </>
                ) : (
                    ''
                )}
            </div>

            <Modal
                modalVisible={editVisible}
                setModalVisible={setEditVisible}
                heading="Edit Post"
                action={handleEditPost}
                actionRemove={handleRemovePost}
            >
                <Form>
                    <FormGroupText placeholder="Write a caption..." value={caption} setValue={setCaption} />
                </Form>
            </Modal>
        </Fragment>
    );
}

export default PostItem;
