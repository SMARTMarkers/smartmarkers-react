import { IQuestionnaire, IQuestionnaireItem, QuestionnaireItemType } from '../../models'
import { EnumDictionary, QuestionsLayout } from '../Form'

export interface BaseFieldProps {
    id?: string
    testID?: string
    questionnaire: IQuestionnaire
    item: IQuestionnaireItem
    fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>
    formData?: any
    errorData?: any
    onChange?: (formData: any, linkId: string) => void
    onSubmit?: Function
    onFocus?: Function
    onBlur?: Function
    questionsLayout?: QuestionsLayout
}
