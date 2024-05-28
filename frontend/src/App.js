import { Fragment, useContext, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { publicRoutes } from '~/routes';
import DefaultLayout from '~/layouts';
import AppProvider from './Context/AppProvider';
import Modal from '~/components/Modal';
import Form from '~/components/Form';
import { FormGroupText } from '~/components/Form/FormGroup';
import DropFileInput from '~/components/DropFileInput';
import { AppContext } from '~/Context/AppProvider';
import * as postServices from '~/services/postService';
import * as userServices from '~/services/userService';
import { useSelector } from 'react-redux';
import PrivateRoutes from './utils/PrivateRoutes';
import { AuthProvider } from './utils/AuthContext';
import Loader from './components/Loader';

function App() {
    const { isCreatePostVisible, setIsCreatePostVisible } = useContext(AppContext);
    const [caption, setCaption] = useState('');
    const [file, setFile] = useState({});

    const handleAddPost = async () => {
        // const user = userServices.getCurrentuser();
        const res = await postServices.addNewPost(caption, file);
        console.log(res);
    };

    const onFileChange = (files) => {
        setFile(files[0]);
    };
    return (
        <Router>
            <AuthProvider>
                <div className="App">
                    <Routes>
                        {publicRoutes.map((route, index) => {
                            const Page = route.component;
                            let Layout = DefaultLayout;

                            if (route.layout) {
                                Layout = route.layout;
                            } else if (route.layout === null) {
                                Layout = Fragment;
                            }

                            return (
                                <Route
                                    key={index}
                                    path={route.path}
                                    element={
                                        <Layout>
                                            <Page />
                                        </Layout>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </div>

                <Modal
                    heading="New post"
                    action={handleAddPost}
                    create
                    modalVisible={isCreatePostVisible}
                    setModalVisible={setIsCreatePostVisible}
                >
                    <Form>
                        <FormGroupText placeholder="Write a caption..." value={caption} setValue={setCaption} />
                        <DropFileInput onFileChange={(files) => onFileChange(files)} />
                    </Form>
                </Modal>

                <Loader />
            </AuthProvider>
        </Router>
    );
}

export default App;
