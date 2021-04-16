import * as _ from 'lodash'

export interface IHeatMap {
    id: string
    question: string
    answer: {
        id: string
        label: string
        count: number | undefined
    }[]
}

interface ModifiedArrayByResource {
    id: string
    question: string
    answer: { id: string; label: string } | { id: string; label: string }
}

interface GroupByAnswer {
    id: string
    ques: string
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

    static getMaxCount() {
        return maxCount + this.divValue - (maxCount % this.divValue)
    }
}

let maxCount = 0

export const TransformReports = (reports: any): HeatMapCountObj => {
    let heatMapArray: IHeatMap[] = []
    let modArr: ModifiedArrayByResource[] = []

    // modify the array of items from the Resource

    _.forEach(reports, function (resource, k) {
        if (resource?.item) {
            let questionArray = [...resource?.item]
            _.forEach(questionArray, function (ques, q) {
                let linkId =
                    questionArray[q].linkId.substring(
                        questionArray[q].linkId.lastIndexOf('/') + 1
                    ) || Math.random().toString()
                let answerArray = questionArray[q].answer
                if (answerArray) {
                    _.forEach(answerArray, function (ans, a) {
                        let obj = {
                            id: linkId,
                            question: questionArray[q].text,
                            answer: {
                                id: a.toString(),
                                label: answerArray[a]?.valueCoding
                                    ? answerArray[a]?.valueCoding?.code &&
                                      answerArray[a]?.valueCoding?.display
                                        ? answerArray[a]?.valueCoding.display
                                        : answerArray[a]?.valueCoding.code
                                    : answerArray[a].valueBoolean.toString(),
                            },
                        }
                        modArr.push(obj)
                    })
                }
            })
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
        let insideGroupByQuesId = groupByQuesId[i]
        for (let j = 0; j < insideGroupByQuesId.length; j++) {
            if (insideGroupByQuesId[j].id) {
                answerArr.push(insideGroupByQuesId[j].answer)
                ques = insideGroupByQuesId[j].question
                id = insideGroupByQuesId[j].id
            }
        }
        let groupByAnswerObj = {
            id: id,
            ques: ques,
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
            answer: _.uniqWith(finalAnswerObj, _.isEqual),
        }
        heatMapArray.push(obj)
    }
    console.log(heatMapArray, Count.getMaxCount())
    return { heatMapArray: heatMapArray, maxCount: Count.getMaxCount() }
}

const getCount = (quesObj: { ans: any }, ansObj: { label: string }) => {
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

    if (maxCount < filteredArray[0]?.length) {
        maxCount = filteredArray[0]?.length
    }

    return filteredArray[0]?.length
}
