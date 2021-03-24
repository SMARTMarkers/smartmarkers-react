import * as React from 'react'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import { Row, Col, Badge } from 'native-base'
import { useWindowSize } from './dynamicSize'

interface HeatMapprops {
    numberOfLines: number
    colors: string[]
    colorsPercentage: number[]
    section: any
    maximumValue: number
    blocksSize?: number
    // Optionals
    indexStart?: number
    onBlockPress?: (value: number) => void
    blocksStyle?: object
}

const defaultProps: HeatMapprops = {
    numberOfLines: 7,
    // values: [],
    colors: ['gray', 'orange', 'red'],
    colorsPercentage: [0, 25, 50, 75, 100],
    maximumValue: -1,
    blocksSize: 30,
    section: [],
    // Optionals
    indexStart: 0,
    onBlockPress: () => {},
    blocksStyle: {},
}

interface HeatMapBlockProps {
    style?: Object
    size?: number
    index: number
    value: number
    colors: string[]
    colorsPercentage: number[]
    onBlockPress?: (value: number) => void
    maximumValue: number
    sectionLabel: string
}

export const HeatMap: React.FC<HeatMapprops> = ({
    numberOfLines,
    indexStart,
    colors,
    colorsPercentage,
    maximumValue,
    blocksSize,
    onBlockPress,
    blocksStyle,
    section,
}) => {
    const HeatMapBlock: React.FC<HeatMapBlockProps> = ({
        style,
        size,
        index,
        value,
        colors,
        colorsPercentage,
        onBlockPress,
        maximumValue,
        sectionLabel,
    }) => {
        const dynamicSize = useWindowSize()
        const valuePercentage = (value / maximumValue) * 100
        let color

        for (let i = 0; i < colorsPercentage.length; i++) {
            if (valuePercentage > colorsPercentage[i]) {
                color = colors[i]
            } else break
        }

        if (!color) return null
        return (
            <>
                <TouchableOpacity
                    onPress={() => {
                        if (onBlockPress) {
                            return onBlockPress(value)
                        }
                    }}
                    style={[
                        styles.heatMapBlock,
                        {
                            backgroundColor: color,
                            height: 45,
                        },
                        style,
                    ]}
                >
                    <Text
                        numberOfLines={1}
                        style={{
                            textAlign: 'right',
                            fontSize: 10,
                            paddingRight: 6,
                            paddingBottom: 0,
                        }}
                    >
                        {value}
                    </Text>
                    <Text
                        numberOfLines={1}
                        style={{
                            textAlign: 'center',
                            fontSize: 12,
                            paddingBottom: 10,
                            paddingHorizontal: 4,
                        }}
                    >
                        {sectionLabel}
                    </Text>
                </TouchableOpacity>
            </>
        )
    }

    const generateBlocks = (atualBlock: number) => {
        const blocks: any = []
        for (let j = 0; j < numberOfLines; j++) {
            blocks.push(
                <HeatMapBlock
                    key={Math.random()}
                    style={blocksStyle}
                    size={blocksSize}
                    index={j + atualBlock}
                    value={section.answer[j + atualBlock]?.count}
                    colors={colors}
                    colorsPercentage={colorsPercentage}
                    onBlockPress={onBlockPress}
                    maximumValue={maximumValue}
                    sectionLabel={section.answer[j + atualBlock]?.label}
                />
            )
        }
        return blocks
    }

    const generateDummyBlocks = () => {
        return (
            <>
                <TouchableOpacity
                    style={[
                        styles.heatMapBlock,
                        {
                            backgroundColor: '#DEDEDE',
                            height: 45,
                            opacity: 0.5,
                        },
                    ]}
                >
                    <Text>{}</Text>
                </TouchableOpacity>
            </>
        )
    }

    const generateColumns = () => {
        const actualColumns = section.answer?.length / numberOfLines
        const numberOfColumns = 5
        const columns: any = []
        let atualBlock = 0
        for (let i = 0; i < numberOfColumns; i++) {
            columns.push(
                <Col size={3} key={Math.random()}>
                    {actualColumns > i ? generateBlocks(atualBlock) : generateDummyBlocks()}
                </Col>
            )
            atualBlock += numberOfLines
        }

        return columns
    }

    return <View style={{ flex: 1, flexDirection: 'row' }}>{generateColumns()}</View>
}

HeatMap.defaultProps = defaultProps

const styles = StyleSheet.create({
    heatMapBlock: {
        borderRadius: 3,
        margin: 1,
        marginTop: 0,
        justifyContent: 'center',
    },
})
