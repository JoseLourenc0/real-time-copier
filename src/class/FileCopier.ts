
import fs from 'fs'
import path from 'path'
import moment, { Moment } from 'moment'
import { log } from './Logger'
import { ENV } from './EnvVars'

export class FileCopier {
    private sourceFilePath: string
    private targetFilePath: string = ''
    private currDate: Moment

    constructor(sourceFilePath: string) {
        this.sourceFilePath = sourceFilePath
        this.currDate = moment()
        this.setFileName()
        this.observeTimeForFileName()
    }

    private observeTimeForFileName() {
        setInterval(() => {
            const currDate = moment()
            const diffDays = currDate.diff(this.currDate, 'days')
            if (diffDays >= 1) {
                this.currDate = currDate
                this.setFileName()
            }
        }, 10_000)
    }

    private setFileName() {
        const fileInfo = path.parse(this.sourceFilePath)
        const targetFileString = `${fileInfo.name}${this.currDate.format('_YYYY_MM_DD_')}${fileInfo.ext}`
        this.targetFilePath = path.join(ENV.TARGET_PATH, targetFileString)
    }

    startCopying() {
        const readStream = fs.createReadStream(this.sourceFilePath)
        const writeStream = fs.createWriteStream(this.targetFilePath, { flags: 'a' })

        readStream.on('data', (chunk: Buffer) => {
            const lines = chunk.toString().split('\n')
            lines.forEach(line => {
                writeStream.write(line + '\n')
            })
        })

        readStream.on('error', (err) => {
            log(err, 'error')
        })

        writeStream.on('error', (err) => {
            log(err, 'error')
        })

        readStream.on('end', () => {
            log(`Cópia concluída com sucesso. Monitorando arquivo ${this.sourceFilePath}`)
            fs.watchFile(this.sourceFilePath, (curr, prev) => {
                if (curr.size > prev.size) {
                    let bytesToRead = curr.size - prev.size
                    let buffer = Buffer.alloc(bytesToRead)
                    let fd = fs.openSync(this.sourceFilePath, 'r')
                    fs.readSync(fd, buffer, 0, bytesToRead, prev.size)
                    fs.closeSync(fd)
                    writeStream.write(buffer.toString())
                }
            })
        })
    }
}
