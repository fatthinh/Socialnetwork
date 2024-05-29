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

function Dashboard() {
    const [postCount, setPostCount] = useState([]);
    const [userCount, setUserCount] = useState([]);
    const { setLoaderVisible } = useContext(AppContext);
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/sign-in');
        }
        loadDashboard();
    }, []);

    const loadDashboard = async () => {
        const res = await postServices.loadDashboard();
        console.log(res);
    };

    return <>hello</>;
}

export default Dashboard;
