import { Fragment, useRef, useState, useEffect, useContext } from 'react';
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
import { useNavigate } from 'react-router-dom';
import Menu from '../Popper/Menu';
import Modal from '../Modal';
import Form from '../Form';
import { FormGroupText } from '../Form/FormGroup';
import AuthContext from '~/utils/AuthContext';
import { AppContext } from '~/Context/AppProvider';
import { getDateTimeDifference } from '~/utils';

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

function PostItem({ owner, postImage, likes, timestamp, description, postID, myPost = false, reload }) {
    const wrapperRef = useRef(null);
    const imagesLoaded = useOnLoadImages(wrapperRef);
    const [liked, setLiked] = useState(false);
    const [bookmarked, setBookmarked] = useState(false);

    const [comments, setComments] = useState([]);
    const [postLikes, setPostLikes] = useState(likes);
    const navigate = useNavigate();
    const [showComments, setShowComments] = useState(false);
    const [commentText, setCommentText] = useState('');
    const [editVisible, setEditVisible] = useState(false);
    const [caption, setCaption] = useState(description);
    const { user } = useContext(AuthContext);
    const { loaderVisible, setLoaderVisible } = useContext(AppContext);

    useEffect(() => {
        if (user) {
            checkLikedPost();
            checkBookmarkedPost();
        }

        getComments();
    }, []);

    const getComments = async () => {
        const res = await postServices.getPostComments(postID);
        if (res) {
            setComments(res);
            setCommentText('');
        }
    };

    const checkLikedPost = async () => {
        const userLiked = await likeServices.checkLiked(postID);
        setLiked(userLiked);
    };

    const checkBookmarkedPost = async () => {
        const userBookmarked = await postServices.checkBookmarked(postID);
        setBookmarked(userBookmarked);
        console.log(userBookmarked);
    };

    const handleEditPost = async () => {
        await postServices.editMyPost(postID, caption);
        setLoaderVisible(true);
    };

    const handleRemovePost = () => {
        postServices.deleteMyPost(postID);
        setLoaderVisible(true);
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            reload();
            setLoaderVisible(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [loaderVisible]);

    const handleLike = async () => {
        if (user) {
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
        if (user) {
            await postServices.addPostComment(postID, commentText);
            getComments();
        } else {
            navigate('/sign-in');
        }
    };

    const handleBookmark = async () => {
        if (user) {
            if (bookmarked) {
                await postServices.unBookmark(postID);
                setBookmarked(false);
            } else {
                await postServices.addBookmark(postID);
                setBookmarked(true);
            }
        } else {
            navigate('/sign-in');
        }
    };

    return (
        <div style={{ marginTop: 8, marginBottom: 20 }}>
            <div className={cx('post')} id="post-item" ref={wrapperRef} data-id={postID}>
                <div className={cx('post__header')}>
                    <div className={cx('post__headerAuthor')}>
                        {!imagesLoaded ? (
                            <ClipLoader size={16} />
                        ) : (
                            <Image avatar src={owner.avatar} alt={owner.name} />
                        )}
                        <span style={{ marginLeft: 10 }}>{owner.name}</span>
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
                            <Button small className={cx('post-icon')} onClick={handleLike}>
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
                            <Button small className={cx('post-icon')} onClick={handleBookmark}>
                                {bookmarked ? (
                                    <h4 style={{ color: 'var(--primary)' }}>
                                        <FontAwesomeIcon icon={faBookmark} />
                                    </h4>
                                ) : (
                                    <FontAwesomeIcon icon={faBookmark} />
                                )}
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
        </div>
    );
}

export default PostItem;
