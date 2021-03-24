import _ from 'lodash'

export interface HeatMapArray {
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

let finalArray: HeatMapArray[] = []

export const loadResource = (reports: any): HeatMapArray[] => {
    let modArr: ModifiedArrayByResource[] = []

    // modify the array of items from the Resource

    _.forEach(reports, function (resource, k) {
        let questionArray = [...resource.item]
        _.forEach(questionArray, function (ques, q) {
            let linkId =
                questionArray[q].linkId.substring(questionArray[q].linkId.lastIndexOf('/') + 1) ||
                Math.random().toString()
            let answerArray = questionArray[q].answer
            if (answerArray) {
                _.forEach(answerArray, function (ans, a) {
                    console.log(answerArray[a], '++')
                    let obj = {
                        id: linkId,
                        question: questionArray[q].text,
                        answer: {
                            id: answerArray[a]?.id,
                            label: answerArray[a]?.valueCoding
                                ? answerArray[a]?.valueCoding.display
                                : answerArray[a].valueBoolean.toString(),
                        },
                    }
                    modArr.push(obj)
                })
            }
        })
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
    console.log(groupByAnswer, 'adasdsa+++++')

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
        finalArray.push(obj)
    }
    console.log(finalArray)
    return finalArray
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

    return filteredArray[0]?.length
}
