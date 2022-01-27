import * as React from 'react'
import { Text, StyleSheet, View } from 'react-native'
import { HeatMapView } from './HeatMapView'
import { Col, Row } from 'native-base'
import Accordion from 'react-native-collapsible/Accordion'
import { useWindowSize } from './WindowSize'

interface HeatMapProps {
    sections: any[]
    colors: string[]
    maxValue: number
    underlayColor?: String
    expandMultiple?: boolean
    xAxisOptions?: string[]
}

const defaultProps: HeatMapProps = {
    sections: [],
    colors: ['#F0B22C', '#E77F24', '#E04931', '#732671'],
    maxValue: 10,
    underlayColor: '#DEDEDE',
    expandMultiple: false,
    xAxisOptions: ['A', 'B', 'C', 'D', 'E'],
}

export const HeatMap: React.FC<HeatMapProps> = ({
    sections,
    colors,
    maxValue,
    underlayColor,
    xAxisOptions,
}) => {
    const [activeSections, setActiveSections] = React.useState([])
    const [colorsPercentage, setColorsPercentage] = React.useState<number[]>([])
    const [numberRange, setNumberRange] = React.useState<number[]>([])
    const [isDisabled, setIsDisabled] = React.useState<boolean>(false)
    const dynamicSize = useWindowSize()

    const click = (value: number) => {}

    React.useEffect(() => {
        getColorPercentage()
        getNumberRange()
    }, [])

    const getColorPercentage = () => {
        let colorArray: number[] = []
        let colorLength = colors.length
        let colorSections = 100 / colorLength
        for (let i = 0; i <= colorLength; i++) {
            colorArray.push(Math.round(colorSections * i))
        }
        setColorsPercentage(colorArray)
    }

    const getNumberRange = () => {
        let range = Math.round(maxValue / colors.length)
        let numArray: number[] = []
        for (let i = 0; i <= colors.length; i++) {
            numArray.push(i * range)
        }
        setNumberRange(numArray)
    }

    const _renderContent = (section: any) => {
        return section && section.answer && section.type !== 'integer' ? (
            <View style={{ flex: 1 }}>
                <Row style={styles.row}>
                    <Col style={[styles.rowCol]}></Col>
                    <Col style={styles.contentCol}>
                        <Text style={{ textAlign: 'left', fontWeight: 'bold' }}>
                            {'Question: '}
                            {section.question}
                        </Text>

                        <View style={styles.contentView}>
                            {section.answer.map((item: any, index: string) => {
                                return (
                                    <View style={styles.contentWidth}>
                                        <Text style={{ marginVertical: 4 }} key={index}>{`${
                                            index + 1
                                        }: ${item.label}`}</Text>
                                    </View>
                                )
                            })}
                        </View>
                    </Col>
                </Row>
            </View>
        ) : (
            <Text>{section.type !== 'integer' ? 'No answers found' : ''}</Text>
        )
    }

    const _updateSections = (activeSections: any) => {
        setActiveSections(activeSections)
    }

    const _renderHeader = (section: any) => {
        return (
            <View>
                <Row style={styles.row}>
                    <Col style={[styles.rowCol]}>
                        <Text
                            numberOfLines={2}
                            style={{
                                justifyContent: 'center',
                                flexWrap: 'wrap',
                            }}
                        >
                            {section.question}
                        </Text>
                    </Col>
                    <Col style={{ flex: 0.65, padding: 0 }}>
                        <HeatMapView
                            numberOfLines={1}
                            section={section}
                            colors={colors}
                            colorsPercentage={colorsPercentage}
                            maximumValue={numberRange[numberRange.length - 1]}
                            onBlockPress={value => click(value)}
                        />
                    </Col>
                </Row>
            </View>
        )
    }

    const _getUnderlayColor = (): string => {
        return underlayColor ? (underlayColor as string) : (defaultProps.underlayColor as string)
    }

    const generateNumberRange = () => {
        let shiftedArray = numberRange ? [...numberRange] : [...colorsPercentage]
        shiftedArray.shift()
        return shiftedArray.map(item => {
            return (
                <Col key={Math.random()}>
                    <Text style={{ textAlign: 'right' }}>{item}</Text>
                </Col>
            )
        })
    }

    const generateColorRange = () => {
        return colors.map(item => {
            return (
                <Col
                    key={Math.random()}
                    style={{ backgroundColor: item, flex: 1 / colors.length, height: 25 }}
                ></Col>
            )
        })
    }

    const displayXAxisOptions = () => {
        let xAxisLength = xAxisOptions?.length || 0
        let options = xAxisLength > 0 ? xAxisOptions : defaultProps.xAxisOptions
        return options?.map((item: any) => {
            return (
                <Col key={Math.random()} style={{ justifyContent: 'center' }}>
                    <Text style={{ textAlign: 'center', marginVertical: 8 }}>{item}</Text>
                </Col>
            )
        })
    }

    return (
        <>
            <View>
                <Row style={[styles.row, { marginBottom: 20 }]}>
                    <Col style={styles.rowCol}></Col>
                    <Col style={[styles.rangeCol, { marginHorizontal: 15 }]}>
                        <Row>
                            <Text style={{ textAlign: 'left' }}>{'1'}</Text>
                            {generateNumberRange()}
                        </Row>
                        <Row>{generateColorRange()}</Row>
                    </Col>
                </Row>
            </View>

            <Accordion
                key={Math.random()}
                sections={sections}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                onChange={_updateSections}
                underlayColor={_getUnderlayColor()}
                expandMultiple={true}
                containerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
                duration={300}
            />
        </>
    )
}

HeatMap.defaultProps = defaultProps

const styles = StyleSheet.create({
    row: {
        marginHorizontal: 5,
        justifyContent: 'flex-end',
        alignItems: 'flex-start',
        width: '100%',
    },
    rowCol: {
        flex: 0.35,
        justifyContent: 'flex-end',
        padding: 5,
        flexWrap: 'wrap',
    },
    itemText: {
        color: '#000',
        marginLeft: 10,
        margin: 5,
        flex: 1,
        flexWrap: 'nowrap',
    },
    contentCol: {
        flex: 0.65,
        marginLeft: 10,
        marginVertical: 1,
        padding: 8,
        backgroundColor: '#DEDEDE',
        borderRadius: 5,
    },
    rangeCol: {
        flex: 0.65,
        marginLeft: 10,
        marginVertical: 1,
        padding: 8,
        borderRadius: 5,
    },
    contentView: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
    contentWidth: {
        width: '50%',
    },
})
