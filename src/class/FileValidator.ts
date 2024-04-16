import fs from 'fs'
import path from 'path'
import { FileValidatorException } from './Exceptions'
import { ENV } from './EnvVars'

export class FileValidator {

    private allowedExtensions: string[] = []

    constructor(){
        this.allowedExtensions = ENV.FILES_EXTENSION
    }

    validDirectory(directoryPath: string) {
        if (!fs.existsSync(directoryPath)) {
            throw new FileValidatorException(`Directory ${directoryPath} does not exist`)
        }

        if (!fs.statSync(directoryPath).isDirectory()) {
            throw new FileValidatorException(`"${directoryPath}" is not a directory.`)
        }
    }

    isFileValid(fileName: string, stats: fs.Stats) {
        if (!this.allowedExtensions.length) return true
        if (!stats.isFile()) return false

        const fileNameExtension = path.extname(fileName).toLocaleLowerCase()
        if (this.allowedExtensions.includes(fileNameExtension)) return true

        return false
    }
}
