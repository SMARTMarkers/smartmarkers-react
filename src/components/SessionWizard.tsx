import React from 'react'
import { Spinner, ListItem, Text, View, List, Button, Body, Right, Switch } from 'native-base'
import { useFhirContext, User } from '../context'
import { Task, Session, ResultBundle } from '../models/internal'
import { FormMode, Form } from './Form'
import { Questionnaire } from '../instruments'
import { IQuestionnaireResponse } from '../models'
import { ReportFactory } from '../reports'
import { FormData } from './types'

export interface SessionWizardProps {
    patient?: User
    tasks: Task[]
    onCompleted: () => void
}

export const SessionWizard: React.FC<SessionWizardProps> = props => {
    const { patient, tasks, onCompleted } = props
    const { server, user } = useFhirContext()
    if (!server) {
        return <View>FHIR Client is not initialized</View>
    }
    const [isReady, setIsReady] = React.useState(false)
    const [session] = React.useState(new Session(tasks, patient ? patient : (user as User), server))

    const [selected, setSelected] = React.useState<number[]>([])
    const [isSubmitting, setIsSubmitting] = React.useState(false)

    const [task, setTask] = React.useState(session.currentTask())
    const [showTaskDetails, setShowTaskDetails] = React.useState(true)

    const [, updateState] = React.useState<any>()
    const forceUpdate = React.useCallback(() => updateState({}), [])

    const onTaskSubmit = (formData: FormData, response: IQuestionnaireResponse) => {
        const reportFactory = new ReportFactory(server)
        const report = reportFactory.createReport(response)
        const bundle = new ResultBundle(task, report)

        session.currentTask().setResultBundle(bundle)
        if (session.hasNextTask()) {
            setTask(session.getNextTask() as Task)
            setShowTaskDetails(true)
        } else {
            setIsReady(true)
        }
    }

    const onToggleSelect = (index: number) => {
        if (selected.includes(index)) {
            const itemIndex = selected.indexOf(index)
            if (itemIndex > -1) {
                selected.splice(itemIndex, 1)
                setSelected(selected)
            }
        } else {
            selected.push(index)
            setSelected(selected)
        }
        forceUpdate()
    }

    const onSubmit = async () => {
        setIsSubmitting(true)
        session.markResultsToSubmit(selected)
        await session.submit()
        setIsSubmitting(false)
        if (onCompleted) {
            onCompleted()
        }
    }

    const onStartTask = () => {
        setShowTaskDetails(false)
    }

    if (isSubmitting) {
        return <Spinner />
    }

    if (showTaskDetails) {
        return (
            <View>
                <Text>{task.getTitle()}</Text>
                <Text>{task.getNote()}</Text>

                <Button onPress={onStartTask}>
                    <Text>Proceed</Text>
                </Button>
            </View>
        )
    }

    if (isReady) {
        return (
            <View>
                <List>
                    {session.tasks.map((task, index) => {
                        const isSelected = selected.includes(index)
                        return (
                            <ListItem
                                key={`selectionItem${index}`}
                                selected={isSelected}
                                onPress={() => onToggleSelect(index)}
                            >
                                <Body>
                                    <Text>
                                        {index + 1} {task.instrument?.getTitle()}
                                    </Text>
                                </Body>
                                <Right>
                                    <Switch value={isSelected} />
                                </Right>
                            </ListItem>
                        )
                    })}
                </List>
                <Button onPress={onSubmit}>
                    <Text>Submit selected results</Text>
                </Button>
            </View>
        )
    }

    return (
        <View>
            {task.instrument && (
                <Form
                    questionnaire={(task.instrument as unknown) as Questionnaire}
                    mode={FormMode.Wizard}
                    onSubmit={onTaskSubmit}
                />
            )}
        </View>
    )
}
