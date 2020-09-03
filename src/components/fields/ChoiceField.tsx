import React from 'react'
import { View, Text } from 'native-base'
import { BaseFieldProps } from './BaseFieldProps'
import { QuestionnaireItemFields } from './QuestionnaireItemFields'
import { IQuestionnaireItem } from '../../models'
import { setFormValue, getLabel, getFormValue, extractChoices } from './utils'
import { DropDown, ButtonGroup } from '../inputs'
import { Autocomplete } from '../inputs/Autocomplete'
import { QuestionsLayout } from '../Form'

const DROP_DOWN_CODE = 'drop-down'
const AUTOCOMPLETE_CODE = 'autocomplete'
const EXTERNALLY_DEFINED_URL =
    'http://hl7.org/fhir/StructureDefinition/questionnaire-externallydefined'

enum ChoiceType {
    DropDown,
    Autocomplete,
    Group,
}

const renderAutocomplete = (
    item: IQuestionnaireItem,
    onChange: (value: any) => void,
    value: any
) => {
    const autocompleteUri = item.extension?.find(v => v.url && v.url === EXTERNALLY_DEFINED_URL)
    const fetcUrl = autocompleteUri?.valueUri || ''
    return <Autocomplete fetchUrl={fetcUrl} onChange={onChange} value={value} />
}

const calculateChoiceType = (item: IQuestionnaireItem): ChoiceType => {
    if (item.extension) {
        const dropDown = item.extension.find(
            v =>
                v.valueCodeableConcept &&
                v.valueCodeableConcept.coding &&
                v.valueCodeableConcept.coding.find(c => c.code === DROP_DOWN_CODE)
        )
        if (dropDown) {
            return ChoiceType.DropDown
        } else {
            const autocomplete = item.extension.find(
                v =>
                    v.valueCodeableConcept &&
                    v.valueCodeableConcept.coding &&
                    v.valueCodeableConcept.coding.find(c => c.code === AUTOCOMPLETE_CODE)
            )
            if (autocomplete) {
                return ChoiceType.Autocomplete
            } else {
                return ChoiceType.Group
            }
        }
    } else {
        return ChoiceType.Group
    }
}

const renderChoice = (
    type: ChoiceType,
    item: IQuestionnaireItem,
    onChange: (value: any) => void,
    value: any,
    questionsLayout?: QuestionsLayout
) => {
    if (type === ChoiceType.Autocomplete) {
        return renderAutocomplete(item, onChange, value)
    }

    const choices = extractChoices(item)

    if (type === ChoiceType.DropDown) {
        return <DropDown items={choices} onChange={onChange} value={value} />
    }

    return (
        <ButtonGroup
            questionsLayout={questionsLayout}
            items={choices}
            onChange={onChange}
            value={value}
        />
    )
}

export interface ChoiceFieldProps extends BaseFieldProps {}

export const ChoiceField: React.FC<ChoiceFieldProps> = props => {
    const { item, id, questionsLayout, ...propsToPass } = props
    const choiceType = calculateChoiceType(item)
    const onChange = (value: any) => {
        const newFormData = setFormValue(props.formData, item.linkId, value)
        if (props.onChange) {
            props.onChange(newFormData, item.linkId)
        }
    }
    const { value } = getFormValue(props.formData, item.linkId)
    return (
        <View>
            <Text>{getLabel(item)}</Text>
            {renderChoice(choiceType, item, onChange, value, questionsLayout)}
            <QuestionnaireItemFields items={item.item} {...propsToPass} />
        </View>
    )
}
