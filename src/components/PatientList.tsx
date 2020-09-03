import React from 'react'
import { Spinner, ListItem, Body, Right, Text, Icon } from 'native-base'
import { useFhirContext } from '../context'
import { IPatient, IHumanName, NameUse } from '../models'

export interface PatientListProps {
    filter?: string
    renderItem?: (item: IPatient, key: any) => React.ReactNode
    onItemPress: (item: IPatient) => void
}

const getHumanNameString = (humanName: IHumanName) => {
    return (humanName.given?.concat(' ') + ' ' + (humanName.family ? humanName.family : '')).trim()
}

const getPatientName = (patient: IPatient) => {
    if (patient && patient.name && patient.name.length > 0) {
        if (patient.name.length == 1) {
            return getHumanNameString(patient.name[0])
        } else {
            const nameOfficial = patient.name.find(item => item.use && item.use == NameUse.Official)
            if (nameOfficial) {
                return getHumanNameString(nameOfficial)
            } else {
                const nameUsual = patient.name.find(item => item.use && item.use == NameUse.Usual)
                if (nameUsual) {
                    return getHumanNameString(nameUsual)
                } else {
                    return getHumanNameString(patient.name[0])
                }
            }
        }
    }
    return ''
}

export const PatientList: React.FC<PatientListProps> = props => {
    const { renderItem, filter, onItemPress } = props
    const [isReady, setIsReady] = React.useState(false)
    const [items, setItems] = React.useState<IPatient[] | undefined>([])
    const { server } = useFhirContext()

    const defaultRenderItem = (item: IPatient, key: any, onItemPress: (item: IPatient) => void) => (
        <ListItem key={key} onPress={() => onItemPress(item)}>
            <Body>
                <Text>{getPatientName(item)}</Text>
                <Text note>{`${item.gender} BD: ${item.birthDate}`}</Text>
            </Body>
            <Right>
                <Icon active name="arrow-forward" />
            </Right>
        </ListItem>
    )
    const render = renderItem ? renderItem : defaultRenderItem

    React.useEffect(() => {
        const loadItems = async () => {
            if (server) {
                const items = await server?.getPatients(filter)
                setItems(items)
            }
            setIsReady(true)
        }
        loadItems()
    }, [])

    if (!isReady) {
        return <Spinner />
    }

    if (items?.length) {
        return <>{items?.map((item, index) => render(item, index, onItemPress))}</>
    } else {
        return (
            <ListItem>
                <Body>
                    <Text note>NO PATIENTS</Text>
                </Body>
            </ListItem>
        )
    }
}
