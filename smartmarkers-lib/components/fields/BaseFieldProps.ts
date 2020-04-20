import {
  Questionnaire,
  QuestionnaireItem,
  QuestionnaireItemType,
} from "../../models";
import { EnumDictionary } from "../Form";

export interface BaseFieldProps {
  id?: string;
  testID?: string;
  questionnaire: Questionnaire;
  item: QuestionnaireItem;
  fieldsMap: EnumDictionary<QuestionnaireItemType, React.FC<BaseFieldProps>>;
  formData?: any;
  errorData?: any;
  onChange?: (formData: any, linkId: string) => void;
  onSubmit?: Function;
  onFocus?: Function;
  onBlur?: Function;
}
