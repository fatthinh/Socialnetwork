import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import { Fragment, useEffect, useState, useContext } from 'react';
import * as postServices from '~/services/postService';
import PostList from '~/components/PostList';
import { ClipLoader } from 'react-spinners';

const cx = classNames.bind(styles);

function Home() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setTimeout(async () => {
            await fetchApi();
            setLoading(false);
        }, 1000);
    }, [page]);

    const fetchApi = async () => {
        const result = await postServices.load();
        setPosts((prev) => {
            return [...prev, ...result];
        });
    };

    const handleScroll = (event) => {
        const { scrollTop, scrollHeight, clientHeight } = event.target;
        const bottom = clientHeight + scrollTop + 1 >= scrollHeight;

        if (bottom && !loading) {
            setPage((prev) => prev + 1);
            setLoading(true);
        }
    };

    return (
        <Fragment>
            <div className={cx('wrapper')} onScroll={handleScroll}>
                <PostList posts={posts} />
                {loading ? (
                    <div style={{ padding: 12 }}>
                        <ClipLoader />
                    </div>
                ) : (
                    ''
                )}
            </div>
        </Fragment>
    );
}

export default Home;
