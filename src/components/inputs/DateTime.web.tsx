import React from 'react'
import { Item, Icon } from 'native-base'

export interface DateTimeProps {
    mode?: 'date' | 'time' | 'datetime'
    value?: Date | string
    onChange?: (date?: Date) => void
    error?: string
    minDate?: Date
    maxDate?: Date
}

const formatDate = (date: string | Date | null | undefined) => {
    if (!date) return ''
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear()

    if (month.length < 2) month = '0' + month
    if (day.length < 2) day = '0' + day

    return [year, month, day].join('-')
}

export const DateTime: React.FC<DateTimeProps> = props => {
    const { mode, value, onChange, error, minDate, maxDate } = props
    const onLocalChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const date = event.target.valueAsDate ? event.target.valueAsDate : undefined
        if (onChange) {
            onChange(date)
        }
    }

    const hasError = !!error

    return (
        <Item regular error={hasError}>
            <input
                style={{
                    height: 50,
                    fontSize: 17,
                    paddingLeft: 8,
                    paddingRight: 5,
                    width: '100%',
                    backgroundColor: 'transparent',
                    border: 0,
                }}
                type={mode ? mode : 'date'}
                autoComplete="none"
                autoCorrect="none"
                autoCapitalize="one"
                value={formatDate(value)}
                onChange={onLocalChange}
                max={maxDate ? formatDate(maxDate) : undefined}
                min={minDate ? formatDate(minDate) : undefined}
            />
            {hasError && <Icon name="close-circle" />}
        </Item>
    )
}
