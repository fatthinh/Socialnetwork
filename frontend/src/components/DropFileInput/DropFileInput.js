import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCloud, faCloudArrowUp } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames/bind';
import styles from './DropFileInput.module.scss';

const cx = classNames.bind(styles);

const DropFileInput = (props) => {
    const wrapperRef = useRef(null);

    const [fileList, setFileList] = useState([]);

    const onDragEnter = () => wrapperRef.current.classList.add('dragover');

    const onDragLeave = () => wrapperRef.current.classList.remove('dragover');

    const onDrop = () => wrapperRef.current.classList.remove('dragover');

    const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        if (newFile) {
            const updatedList = [...fileList, newFile];
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
                        {fileList.map((item, index) => (
                            <div key={index} className={cx('container-preview__item')}>
                                <img src={URL.createObjectURL(item)} alt={item.name} />
                                <span className={cx('container-preview__item__del')} onClick={() => fileRemove(item)}>
                                    &times;
                                </span>
                            </div>
                        ))}
                    </div>
                ) : null}
            </div>
        </>
    );
};

DropFileInput.propTypes = {
    onFileChange: PropTypes.func,
};

export default DropFileInput;
