import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './UploadFile.module.scss';

const cx = classNames.bind(styles);

const UploadFile = (props) => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [newFile];
            setFileList(updatedList);
            props.onFileChange(updatedList);
        }
    };

    const fileRemove = (file) => {
        const updatedList = [...fileList];
        updatedList.splice(fileList.indexOf(file), 1);
        setFileList(updatedList);
        props.onFileChange(updatedList);
    };

    return (
        <>
            <div className={cx('wrapper')}>
                <div
                    ref={wrapperRef}
                    className={cx('container')}
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className={cx('container__label')}>
                        <FontAwesomeIcon icon={faCloudArrowUp} style={{ fontSize: 42 }} />
                        <p>Drag & Drop your files here</p>
                    </div>
                    <input className={cx('container__input')} type="file" value="" onChange={onFileDrop} />
                </div>
                <p className={cx('container-preview__title')}>Ready to upload</p>
                {fileList.length > 0 ? (
                    <div className={cx('container-preview')}>
                        <div className={cx('container-preview__item')}>
                            <img src={URL.createObjectURL(fileList[0])} alt={fileList[0].name} />
                            <span
                                className={cx('container-preview__item__del')}
                                onClick={() => fileRemove(fileList[0])}
                            >
                                &times;
                            </span>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
};

UploadFile.propTypes = {
    onFileChange: PropTypes.func,
};

export default UploadFile;
