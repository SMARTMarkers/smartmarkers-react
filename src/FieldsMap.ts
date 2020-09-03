import { AttachmentField } from './components/fields/AttachmentField'
import { BooleanField } from './components/fields/BooleanField'
import { ChoiceField } from './components/fields/ChoiceField'
import { DateField } from './components/fields/DateField'
import { DateTimeField } from './components/fields/DateTimeField'
import { DecimalField } from './components/fields/DecimalField'
import { DisplayField } from './components/fields/DisplayField'
import { GroupField } from './components/fields/GroupField'
import { IntegerField } from './components/fields/IntegerField'
import { OpenChoiceField } from './components/fields/OpenChoiceField'
import { QuantityField } from './components/fields/QuantityField'
import { QuestionField } from './components/fields/QuestionField'
import { ReferenceField } from './components/fields/ReferenceField'
import { StringField } from './components/fields/StringField'
import { TextField } from './components/fields/TextField'
import { TimeField } from './components/fields/TimeField'
import { UrlField } from './components/fields/UrlField'
import { QuestionnaireItemType } from './models'

export const FieldsMap = {
    [QuestionnaireItemType.Attachment]: AttachmentField,
    [QuestionnaireItemType.Boolean]: BooleanField,
    [QuestionnaireItemType.Choice]: ChoiceField,
    [QuestionnaireItemType.Date]: DateField,
    [QuestionnaireItemType.DateTime]: DateTimeField,
    [QuestionnaireItemType.Decimal]: DecimalField,
    [QuestionnaireItemType.Display]: DisplayField,
    [QuestionnaireItemType.Group]: GroupField,
    [QuestionnaireItemType.Integer]: IntegerField,
    [QuestionnaireItemType.OpenChoice]: OpenChoiceField,
    [QuestionnaireItemType.Quantity]: QuantityField,
    [QuestionnaireItemType.Question]: QuestionField,
    [QuestionnaireItemType.Reference]: ReferenceField,
    [QuestionnaireItemType.String]: StringField,
    [QuestionnaireItemType.Text]: TextField,
    [QuestionnaireItemType.Time]: TimeField,
    [QuestionnaireItemType.Url]: UrlField,
}
