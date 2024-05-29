import classNames from 'classnames/bind';
import styles from './PostManager.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import * as postServices from '~/services/postService';
import { useState, useEffect, useContext } from 'react';
import PostManagerItem from './PostManagerItem';
import { AppContext } from '~/Context/AppProvider';
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRangePicker } from 'react-date-range';
import { addDays } from 'date-fns';
import AuthContext from '~/utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function PostManager() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const { setLoaderVisible } = useContext(AppContext);
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [totalPost, setTotalPost] = useState();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    const [state, setState] = useState([
        {
            startDate: new Date(),
            endDate: addDays(new Date(), 7),
            key: 'selection',
        },
    ]);

    useEffect(() => {
        if (!user) {
            navigate('/sign-in');
        }
        setLoaderVisible(true);
        setTimeout(async () => {
            await loadPosts();
            await loadDashboard();
            setLoaderVisible(false);
        }, 500);
    }, [page, state]);

    const loadPosts = async () => {
        const result = await postServices.loadPostsManagement(page, state[0]);
        setPosts((prev) => {
            return [...prev, ...result];
        });
    };

    const loadDashboard = async () => {
        const res = await postServices.loadDashboard();
        setTotalPost(res.postCount);
        console.log(res.postCount);
    };

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const bottom = clientHeight + scrollTop + 1 >= scrollHeight;

        if (bottom) {
            setPage((prev) => prev + 1);
        }
    };

    return (
        <>
            <div className={cx('app-content-actions')}>
                <input className={cx('search-bar')} placeholder="Search..." type="text" />
                <div className={cx('app-content-actions-wrapper')}>
                    <span>
                        {posts.length} / {totalPost}
                    </span>
                    <div className={cx('filter-button-wrapper')}>
                        <button
                            className={cx('action-button', 'filter')}
                            onClick={() => setDatePickerVisible(!datePickerVisible)}
                        >
                            <span>Filter</span>
                            <FontAwesomeIcon icon={faFilter} />
                        </button>

                        <div className={cx('filter-menu', datePickerVisible ? 'active' : '')}>
                            <DateRangePicker
                                onChange={(item) => {
                                    setState([item.selection]);
                                    setPage(0);
                                    setPosts([]);
                                }}
                                showSelectionPreview={true}
                                moveRangeOnFirstSelection={false}
                                months={2}
                                ranges={state}
                                direction="horizontal"
                                preventSnapRefocus={true}
                                calendarFocus="backwards"
                            />
                        </div>
                        <div className={cx('filter-menu')}>
                            <label>Status</label>
                            <select>
                                <option>All Status</option>
                                <option>Active</option>
                                <option>Disabled</option>
                            </select>
                            <div className={cx('filter-menu-buttons')}>
                                <button className={cx('filter-button', 'reset')}>Reset</button>
                                <button className={cx('filter-button', 'apply')}>Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('products-area-wrapper', 'gridView')} onScroll={handleScroll}>
                {posts.length ? (
                    posts.map((post) => {
                        return <PostManagerItem key={post.id} post={post} />;
                    })
                ) : (
                    <>Nothing......</>
                )}
            </div>
        </>
    );
}

export default PostManager;
