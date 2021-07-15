import * as _ from 'lodash'

export interface IHeatMap {
    id: string
    question: string
    type: string
    answer: {
        id: string
        label: string
        count: number | undefined
    }[]
}

interface ModifiedArrayByResource {
    id: string
    question: string
    type: string
    answer: { id: string; label: string } | { id: string; label: string }
}

interface GroupByAnswer {
    id: string
    ques: string
    type: string
    ans: {
        id: string
        label: string
    }[]
}

interface PreAnswerArray {
    id: string
    label: string
}

interface FinalAnswer {
    id: string
    label: string
    count: number | undefined
}

interface HeatMapCountObj {
    heatMapArray: IHeatMap[]
    maxCount: number
}

class Count {
    static divValue: number = 10

    static getMaxCount(isexecution) {
        if (!isexecution) {
            return maxCount + this.divValue - (maxCount % this.divValue)
        } else {
            return 0
        }
    }
}

let maxCount: number

export const TransformReports = (reports: any, selectedTasks: any): HeatMapCountObj => {
    let heatMapArray: IHeatMap[] = []
    let modArr: ModifiedArrayByResource[] = []
    let isexecution: Boolean = true
    maxCount = 0

    const booleanData: any = {
        answerOption: [
            {
                boolean: {
                    system: 'http://snomed.info/sct',
                    code: '1',
                    display: 'true',
                },
            },
            {
                boolean: {
                    system: 'http://snomed.info/sct',
                    code: '0',
                    display: 'false',
                },
            },
        ],
    }
    const integerData: any = {
        answerOption: [
            {
                integer: {
                    system: 'http://snomed.info/sct',
                    code: '1',
                    display: 'Free input answers',
                },
            },
        ],
    }
    // modify the array of items from the Resource
    //checking the "selectedTasks" is defined or not

    if (selectedTasks === undefined || selectedTasks === {}) {
        selectedTasks = {}
    } else {
        _.forEach(selectedTasks?.instrument?.item, function (data, i) {
            //if data.type is boolean then insert defined "booleanData"

            if (data.type === 'boolean') {
                let tasks = selectedTasks?.instrument?.item[i]
                selectedTasks.instrument.item[i]['answerOption'] = booleanData.answerOption
            }
            if (data.type === 'integer') {
                let tasks = selectedTasks?.instrument?.item[i]
                selectedTasks.instrument.item[i]['answerOption'] = integerData.answerOption
            }
        })
    }
    let qArray: any = []
    //combining the Questionnaire response and Questionnaire

    _.forEach(reports, function (resource, k) {
        // Strict check for Resource and recource Type should be "QuestionnaireResponse"

        if (resource?.resourceType === 'QuestionnaireResponse') {
            isexecution = false
            if (resource?.item) {
                qArray.push(...resource?.item)
            }
        }
    })
    //Check 'selectedTasks' is empty or not
    if (!isexecution) {
        let selectedTasksSize = _.size(selectedTasks)

        let someArray: any = []

        if (selectedTasksSize == 0) {
            someArray = _.filter([...qArray], _.size)
        } else {
            someArray = _.filter([...qArray, ...selectedTasks?.instrument?.item], _.size)
        }

        // Looping the combined array(Questionnaire response and Questionnaire array)
        _.forEach(someArray, function (ques, k) {
            let linkId =
                ques.linkId.substring(ques.linkId.lastIndexOf('/') + 1) || Math.random().toString()
            if (ques?.answer || ques?.answerOption) {
                let answerArray = ques?.answer ? ques.answer : ques.answerOption
                if (answerArray) {
                    _.forEach(answerArray, function (ans, a) {
                        // it enables the code and choice type values
                        if (answerArray[a]?.valueCoding) {
                            let obj = {
                                id: linkId,
                                question: ques.text,
                                type: 'choice',
                                answer: {
                                    id: '0',
                                    label: answerArray[a]?.valueCoding
                                        ? answerArray[a]?.valueCoding?.code &&
                                          answerArray[a]?.valueCoding?.display
                                            ? answerArray[a]?.valueCoding.display
                                            : answerArray[a]?.valueCoding.code
                                        : answerArray[a]?.valueCoding?.code,
                                },
                            }
                            modArr.push(obj)
                        }
                        // it enables the boolean values
                        else if (
                            answerArray[a].valueBoolean === true ||
                            answerArray[a].valueBoolean === false ||
                            answerArray[a].boolean
                        ) {
                            let obj = {
                                id: linkId,
                                question: ques.text,
                                type: 'boolean',
                                answer: {
                                    id: '0',
                                    label: answerArray[a]?.boolean
                                        ? answerArray[a]?.boolean?.display
                                        : answerArray[a].valueBoolean?.toString(),
                                },
                            }
                            modArr.push(obj)
                        }
                        // it enables the integer values
                        else if (answerArray[a].valueInteger || answerArray[a]?.integer) {
                            let obj = {
                                id: linkId,
                                question: ques.text,
                                type: 'integer',
                                answer: {
                                    id: '0',
                                    label: integerData.answerOption[0].integer.display,
                                },
                            }
                            modArr.push(obj)
                        }
                    })
                }
            }
        })
        //grouping the multiple questions By ID
        let groupByQuesId = _.map(
            _.groupBy(modArr, function (mod) {
                return mod.id
            }),
            function (key, value) {
                return key
            }
        )
        // getting count of groupedArray
        let size = _.size(groupByQuesId)

        // Group By Answer for each question
        let groupByAnswer: GroupByAnswer[] = []

        for (let i = 0; i < size; i++) {
            let answerArr: PreAnswerArray[] = []

            let ques = ''
            let id = ''
            let type = ''
            let insideGroupByQuesId = groupByQuesId[i]
            for (let j = 0; j < insideGroupByQuesId.length; j++) {
                if (insideGroupByQuesId[j].id) {
                    answerArr.push(insideGroupByQuesId[j].answer)
                    ques = insideGroupByQuesId[j].question
                    id = insideGroupByQuesId[j].id
                    type = insideGroupByQuesId[j].type
                }
            }
            let groupByAnswerObj = {
                id: id,
                ques: ques,
                type: type,
                ans: answerArr,
            }
            groupByAnswer.push(groupByAnswerObj)
        }

        // Getting Final Array with count for each answer in each question

        for (let i = 0; i < groupByAnswer.length; i++) {
            let finalAnswerObj: FinalAnswer[] = []

            for (let j = 0; j < groupByAnswer[i].ans.length; j++) {
                let countAnswers = {
                    id: groupByAnswer[i].ans[j].id,
                    label: groupByAnswer[i].ans[j].label,
                    count: getCount(groupByAnswer[i], groupByAnswer[i].ans[j]),
                }
                finalAnswerObj.push(countAnswers)
            }
            let obj = {
                id: groupByAnswer[i].id,
                question: groupByAnswer[i].ques,
                type: groupByAnswer[i].type,
                answer: _.uniqWith(finalAnswerObj, _.isEqual),
            }
            heatMapArray.push(obj)
        }
       
    }
    return {
        heatMapArray: heatMapArray,
        maxCount: isNaN(Count.getMaxCount(isexecution)) ? 0 : Count.getMaxCount(isexecution),
    }
}

const getCount = (quesObj: { ans: any; type: string }, ansObj: { label: string }) => {
    let groupByAnsObj = _.groupBy(quesObj.ans, function (o) {
        if (o.label === ansObj.label) {
            return o.label
        }
    })
    let mapGroupByAns = _.map(groupByAnsObj, function (v, k) {
        if (k !== 'undefined') {
            return v
        }
    })

    let filteredArray = _.filter(mapGroupByAns, function (u) {
        return u !== undefined
    })

    if (filteredArray[0] && maxCount < filteredArray[0]?.length) {
        maxCount = filteredArray[0]?.length
    }

    //if type choice or boolean need to decrease by '1' from filteredArray[0]?.length
    //if type is integer filtered array length is set to explicitly '0'

    return filteredArray[0] && (quesObj.type == 'choice' || quesObj.type == 'boolean')
        ? filteredArray[0]?.length - 1
        : quesObj.type == 'integer'
        ? 0
        : filteredArray[0]?.length
}
