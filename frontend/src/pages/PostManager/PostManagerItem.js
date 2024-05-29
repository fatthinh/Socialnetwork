import { getDateTimeDifference } from '~/utils';
import styles from './PostManager.module.scss';
import classNames from 'classnames/bind';
import { faEllipsisVertical } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import Image from '~/components/Image';
import { memo } from 'react';

const cx = classNames.bind(styles);
function PostManagerItem({ post }) {
    return (
        <div className={cx('products-row')}>
            <button className={cx('cell-more-button')}>
                <FontAwesomeIcon icon={faEllipsisVertical} />
            </button>
            <div className={cx('product-cell', 'image')}>
                <Image src={post.contentUrl} alt="post-item" />
            </div>
            <div className={cx('product-cell')}>
                <span className={cx('cell-label')}>Author:</span>
                {post.user.userName}
            </div>
            <div className={cx('product-cell')}>
                <span className={cx('cell-label')}>Description:</span>
                <span style={{ overflowY: 'scroll', height: 32, fontSize: 12, marginLeft: 8 }}>{post.description}</span>
            </div>
            <div className={cx('product-cell')}>
                <span className={cx('cell-label')}>Likes:</span>
                <span style={{ color: 'var(--primary)' }}>
                    <FontAwesomeIcon icon={faHeart} />
                    {post.likes}
                </span>
            </div>
            <div className={cx('product-cell')}>
                <span className={cx('cell-label')}>Created at:</span> {getDateTimeDifference(post.createdAt)}
            </div>
        </div>
    );
}

export default memo(PostManagerItem);
