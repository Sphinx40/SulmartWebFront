import React, { useState, useEffect } from 'react';
import { Modal, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { errorhandler } from '../actions'

const ErrorNotification = ({ state, errorhandler }) => {
    const [openModal, setOpenModal] = useState(false);
    const { error } = state;

    useEffect(() => {
        if (error !== '' && error !== undefined) {
            setOpenModal(true)
            setTimeout(() => {
                setOpenModal(false)
                errorhandler('')
            }, 3000)
        } else {
            setOpenModal(false)
        }
    }, [state])


    if (openModal === true) {
        return (
            <Modal open={openModal}>
                <Segment inverted color='red' tertiary>
                    {error}
                </Segment>
            </Modal>
        )
    }
    return null
}

const mapStateToProps = (state) => {
    return {
        state
    }
}


export default connect(mapStateToProps, { errorhandler })(ErrorNotification);