import React from 'react'
import { View, Text, Icon, Button, Right } from 'native-base'
import { StyleSheet } from 'react-native'
import { BaseFieldProps } from './BaseFieldProps'
import { getLabel } from './utils'
import { Modal } from '../tools/Modal'
import { IQuestionnaireItem } from '../../models'

export interface DisplayFieldProps extends BaseFieldProps {}

const HelpButton: React.FC<DisplayFieldProps> = props => {
    const [visible, setVisible] = React.useState(false)
    const { item } = props
    const onShowPress = () => {
        setVisible(true)
    }
    const onClosePress = () => {
        setVisible(false)
    }
    return (
        <View style={styles.centeredView}>
            <Button rounded onPress={onShowPress} style={styles.roundButton}>
                <Icon name="help-circle" style={styles.roundIcon} />
            </Button>

            <Modal animationType="fade" transparent={true} visible={visible}>
                <View style={styles.modalView}>
                    <Text>{getLabel(item)}</Text>
                    <Right>
                        <Button rounded onPress={onClosePress} style={styles.roundButton}>
                            <Icon name="md-close-circle-outline" style={styles.roundIcon} />
                        </Button>
                    </Right>
                </View>
            </Modal>
        </View>
    )
}

const HELP_CODE = 'help'
const isHelpButton = (item: IQuestionnaireItem) => {
    if (item.extension && item.extension.length > 0 && item.extension[0].valueCodeableConcept) {
        const concept = item.extension[0].valueCodeableConcept
        if (concept.coding && concept.coding.length > 0) {
            return !!concept.coding.find(item => item.code === HELP_CODE)
        }
    }
    return false
}

export const DisplayField: React.FC<DisplayFieldProps> = props => {
    const { item } = props
    if (isHelpButton(item)) {
        return <HelpButton {...props} />
    } else {
        return <Text note>{getLabel(item)}</Text>
    }
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
        marginTop: 22,
        height: 50,
    },
    roundButton: {
        alignSelf: 'flex-end',
        height: 45,
        width: 45,
    },
    roundIcon: {
        marginLeft: 13,
        marginRight: 0,
    },
    modalView: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
})
