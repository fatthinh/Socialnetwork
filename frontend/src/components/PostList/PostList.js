import PostItem from '../PostItem';

function PostList({ posts, myPosts, reload = () => {} }) {
    return (
        <>
            {posts.map((post, index) => (
                <PostItem
                    key={index}
                    owner={{
                        name: post.user.userName,
                        avatar: post.user.imageUrl,
                    }}
                    postImage={post.contentUrl}
                    timestamp={post.createdAt}
                    description={post.description}
                    likes={post.likes}
                    postID={post.id}
                    myPost={myPosts ? true : false}
                    reload={reload}
                />
            ))}
        </>
    );
}

export default PostList;
