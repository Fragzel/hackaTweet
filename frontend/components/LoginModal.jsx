import React from 'react';
import ReactDOM from 'react-dom';
import Modal from 'react-modal';
import styles from '../styles/LoginModal.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faX } from '@fortawesome/free-solid-svg-icons'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
    },
};


function LoginModal(props) {
    let subtitle;

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#f00';
    }

    if (props.isSignin) {
        return (
            <Modal
                isOpen={props.modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={props.closeModal}
                className={styles.content}
                contentLabel="Example Modal"
            >
                <div >
                    <div className={styles.faX} >
                        <FontAwesomeIcon icon={faX} onClick={props.closeModal} />
                    </div>
                    <div className={styles.modalContainer}>
                        <img className={styles.modalLogo} src="/images/logo_twitter.png"></img>
                        <h2 className={styles.title} ref={(_subtitle) => (subtitle = _subtitle)}>Connect to Hackatweet </h2>

                        <form className={styles.form}>
                            <input className={styles.input} placeholder='Username' />
                            <input className={styles.input} placeholder='Password' />
                            <button className={styles.input} >Sign Up</button>

                        </form>
                    </div>
                </div>
            </Modal >
        );
    }

    return (
        <Modal
            isOpen={props.modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={props.closeModal}
            className={styles.content}
            contentLabel="Example Modal"
        >

            <div className={styles.faX} >
                <FontAwesomeIcon icon={faX} onClick={props.closeModal} />
            </div>
            <div className={styles.modalContainer}>

                <img className={styles.modalLogo} src="/images/logo_twitter.png"></img>
                <h2 className={styles.title} ref={(_subtitle) => (subtitle = _subtitle)}>Create your Hackatweet account</h2>

                <form className={styles.form}>
                    <input className={styles.input} placeholder='Firstname' />
                    <input className={styles.input} placeholder='Username' />
                    <input className={styles.input} placeholder='Password' />
                    <button className={styles.input} >Sign Up</button>

                </form>
            </div>
        </Modal>
    );

}

export default LoginModal;
