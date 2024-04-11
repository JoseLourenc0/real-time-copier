import moment from 'moment'
import { green, red } from 'cli-color'

const DEFAULT_DATE_TIME_FORMAT = 'YYYY-MM-DD HH:mm:ss'

const getHeader = (type: string, message = '') => type === 'default' ? green(message) : red(message)

export const log = (logMessage: any, type = 'default') => {
    const formattedMessage = [logMessage]

    const header = getHeader(type, `[${moment().format(DEFAULT_DATE_TIME_FORMAT)}]`)

    if (type === 'error') console.error(header, ...formattedMessage)
    else console.log(header, ...formattedMessage)
}

