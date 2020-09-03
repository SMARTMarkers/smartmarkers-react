import {
    IQuestionnaireItemRule,
    QuestionnaireItemOperator,
    IQuestionnaireItem,
    IQuestionnaire,
    QuestionnaireItemType,
} from '../../models'
import { GroupItem } from '../inputs/GroupItem'
import { FieldData, FormData } from '../types'
import {
    IQuestionnaireResponse,
    QuestionnaireResponseStatus,
    IQuestionnaireResponseItem,
    IQuestionnaireResponseItemAnswer,
} from '../../models/QuestionnaireResponse'

const DEFAULT_CHOICES = [
    {
        label: 'Yes',
        value: 'Y',
    },
    {
        label: 'No',
        value: 'N',
    },
    {
        label: "Don't know",
        value: 'asked-unknown',
    },
]

const compareValues = (operator: QuestionnaireItemOperator, value: any, expectedValue: any) => {
    if (value === undefined) return false
    switch (operator) {
        case QuestionnaireItemOperator.Equals:
            return value === expectedValue
        case QuestionnaireItemOperator.GreaterOrEquals:
            return value >= expectedValue
        case QuestionnaireItemOperator.GreaterThan:
            return value > expectedValue
        case QuestionnaireItemOperator.LessOrEquals:
            return value <= expectedValue
        case QuestionnaireItemOperator.LessThan:
            return value < expectedValue
        case QuestionnaireItemOperator.NotEquals:
            return value != expectedValue
        case QuestionnaireItemOperator.Exists:
            return expectedValue ? !!value : !value
        default:
            return false
    }
}

const getExpectedRuleValue = (rule: IQuestionnaireItemRule) => {
    if (rule.answerCoding) {
        return rule.answerCoding.code
    } else if (rule.hasOwnProperty('answerBoolean')) {
        return rule.answerBoolean
    } else if (rule.answerDecimal) {
        return rule.answerDecimal
    } else if (rule.answerInteger) {
        return rule.answerInteger
    } else if (rule.answerQuantity) {
        return rule.answerQuantity
    } else {
        return rule.answerString
    }
}

const checkRule = (rule: IQuestionnaireItemRule, formData: any) => {
    const value = getFormValue(formData, rule.question).value
    const expectedValue = getExpectedRuleValue(rule)
    return compareValues(rule.operator, value, expectedValue)
}

export const checkEnableRules = (
    rules: IQuestionnaireItemRule[] | undefined,
    formData: any
): boolean => {
    let enabled = true

    if (rules && rules.length > 0) {
        enabled = false
        for (const rule of rules) {
            enabled = checkRule(rule, formData)
            if (enabled) break
        }
    }

    return enabled
}

export const getActiveQuestionsCount = (
    items: IQuestionnaireItem[] | undefined,
    formData: FormData
) => {
    let count = 0
    if (!items) return count
    items.forEach(item => {
        if (checkEnableRules(item.enableWhen, formData)) {
            count += 1
        }
    })
    return count
}

export const getActiveQuestions = (items: IQuestionnaireItem[] | undefined, formData: FormData) => {
    const result: IQuestionnaireItem[] = []
    if (!items) return result
    items.forEach(item => {
        if (checkEnableRules(item.enableWhen, formData)) {
            result.push(item)
        }
    })

    return result
}

export const getFormValue = <T = any>(formData: FormData, linkId: string): FieldData<T> => {
    if (!formData || !formData[linkId]) return { touched: false, value: null, error: null }
    return formData[linkId]
}

export const setFormValue = <T = any>(formData: FormData, linkId: string, newValue: T) => {
    if (formData)
        return {
            ...formData,
            [linkId]: { touched: true, value: newValue, error: null },
        }
    return { [linkId]: { touched: true, value: newValue, error: null } }
}

export const getLabel = (item: IQuestionnaireItem) => {
    if (item.text) return item.text
    if (item.code && item.code.length > 0) {
        let label = ''
        item.code.forEach(code => {
            if (code.display) {
                if (label) label += ', '
                label += code.display
            } else if (code.code) {
                if (label) label += ', '
                label += code.code
            }
        })
        if (label) return label
    }

    if (item.linkId) return item.linkId
    return ''
}

export const extractChoices = <T extends { label: string; value: any } = GroupItem<any>>(
    item: IQuestionnaireItem
) => {
    if (!item.answerOption) return DEFAULT_CHOICES as T[]

    return item.answerOption.map(option => {
        if (option.valueCoding) {
            return {
                value: option.valueCoding,
                label: option.valueCoding.display,
            } as T
        } else {
            return { value: 'NoOptions', label: 'NoOptions' } as T
        }
    })
}

export const getResponse = (
    questionnaire: IQuestionnaire,
    formData: FormData
): IQuestionnaireResponse => {
    const response: IQuestionnaireResponse = {
        id: '',
        resourceType: 'QuestionnaireResponse',
        status: QuestionnaireResponseStatus.Completed,
        questionnaire: `https://r4.smarthealthit.org/${questionnaire.resourceType}/${questionnaire.id}`,
        item: [],
    }

    const items = questionnaire.item ? questionnaire.item : []

    response.item = getResponseItems(items, formData)

    return response
}

export const getAdaptiveResponse = (
    questionnaireResponse: IQuestionnaireResponse,
    formData: FormData
): IQuestionnaireResponse => {
    if (questionnaireResponse.contained && questionnaireResponse.contained.length > 0) {
        const questionnaire = questionnaireResponse.contained[0] as IQuestionnaire
        const items = questionnaire.item ? questionnaire.item : []
        questionnaireResponse.item = getResponseItems(items, formData)
    }

    return questionnaireResponse
}

const getResponseItems = (
    items: IQuestionnaireItem[],
    formData: FormData
): IQuestionnaireResponseItem[] => {
    const response: IQuestionnaireResponseItem[] = []

    items.forEach(item => {
        if (![QuestionnaireItemType.Display].includes(item.type)) {
            const answers = getResponseItemAnswers(item, formData)
            const responseItem: IQuestionnaireResponseItem = {
                id: item.id,
                linkId: item.linkId,
            }

            if (item.text) {
                responseItem.text = item.text
            }
            if (item.extension) {
                responseItem.extension = item.extension
            }
            if (item.definition) {
                responseItem.definition = item.definition
            }
            if (
                ![QuestionnaireItemType.Group, QuestionnaireItemType.Question].includes(
                    item.type
                ) &&
                answers &&
                answers.length > 0
            ) {
                responseItem.answer = answers
            }

            if (item.item && item.item.length > 0) {
                responseItem.item = getResponseItems(item.item, formData)
            }

            response.push(responseItem)
        }
    })

    return response
}

const getResponseItemAnswers = (
    item: IQuestionnaireItem,
    formData: FormData
): IQuestionnaireResponseItemAnswer[] => {
    const answers: IQuestionnaireResponseItemAnswer[] = []
    const value = getFormValue(formData, item.linkId)
    let valueProp = ''
    let id = 1
    const repeats = !!item.repeats
    switch (item.type) {
        case QuestionnaireItemType.Boolean:
            valueProp = 'valueBoolean'
            break
        case QuestionnaireItemType.Decimal:
            valueProp = 'valueDecimal'
            break
        case QuestionnaireItemType.Integer:
            valueProp = 'valueInteger'
            break
        case QuestionnaireItemType.Date:
            valueProp = 'valueDate'
            break
        case QuestionnaireItemType.DateTime:
            valueProp = 'valueDateTime'
            break
        case QuestionnaireItemType.Time:
            valueProp = 'valueTime'
            break
        case QuestionnaireItemType.String:
            valueProp = 'valueString'
            break
        case QuestionnaireItemType.Url:
            valueProp = 'valueUri'
            break
        case QuestionnaireItemType.Attachment:
            valueProp = 'valueAttachment'
            break
        case QuestionnaireItemType.Choice:
            valueProp = 'valueCoding'
            break
        case QuestionnaireItemType.OpenChoice:
            valueProp = 'valueCoding'
            break
        case QuestionnaireItemType.Quantity:
            valueProp = 'valueQuantity'
            break
        case QuestionnaireItemType.Reference:
            valueProp = 'valueReference'
            break
        case QuestionnaireItemType.Group:
        case QuestionnaireItemType.Question:
            if (item.item && item.item.length > 0) {
                answers.push({
                    id: id.toString(),
                    item: getResponseItems(item.item, formData),
                })
            }
            break
        case QuestionnaireItemType.Display:
            break
    }

    if (valueProp && value.value != null) {
        if (repeats) {
            value.value.forEach((answer: any) => {
                answers.push({
                    id: id.toString(),
                    [valueProp]: answer,
                })

                id += 1
            })
        } else {
            answers.push({
                id: id.toString(),
                [valueProp]: value.value,
            })
        }
    }

    return answers
}
