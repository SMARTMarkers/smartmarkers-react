import React from 'react'
import ReactDOM from 'react-dom'
import { ModalProps } from 'react-native'

// create and get reference to Modal DOM node
const appRoot = document.getElementById('root')
appRoot?.insertAdjacentHTML('afterend', '<div id="modal-root"></div>')
const modalRoot = document.getElementById('modal-root')

const InnerModal: React.FC<ModalProps> = props => {
    const containerStyle = {
        // copied from RNW View/StyleSheet/constants
        alignItems: 'stretch',
        border: '0 solid black',
        boxSizing: 'border-box',
        display: 'flex',
        flexBasis: 'auto',
        flexDirection: 'column',
        flexShrink: 0,
        marginTop: 0,
        marginRight: 0,
        marginBottom: 0,
        marginLeft: 0,
        minHeight: 0,
        minWidth: 0,
        paddingTop: 0,
        paddingRight: 0,
        paddingBottom: 0,
        paddingLeft: 0,
        zIndex: 0,

        // modal
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,

        // etc
        backgroundColor: props.transparent ? 'transparent' : 'white',
    } as React.CSSProperties

    return modalRoot
        ? ReactDOM.createPortal(<div style={containerStyle}>{props.children}</div>, modalRoot)
        : null
}

export const Modal: React.FC<ModalProps> = props => {
    if (props.visible) {
        return <InnerModal {...props} />
    }
    return null
}
