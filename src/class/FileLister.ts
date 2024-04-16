
import fs from 'fs'
import path from 'path'

import { log } from './Logger'
import { FileValidator } from './FileValidator'
import { ENV } from './EnvVars'

interface FileDetails {
    name: string
    size: number
    filePath: string
}

export class FileLister {
    private directoryPath: string
    private fileValidator: FileValidator

    constructor() {
        this.fileValidator = new FileValidator()
        this.directoryPath = ENV.PATH_TO_FILES
    }

    private filesInDirectory () {
        const files = fs.readdirSync(this.directoryPath)
        return files
    }

    listFiles(): FileDetails[] {
        try {
            this.fileValidator.validDirectory(this.directoryPath)

            const files = this.filesInDirectory()
            const fileDetails: FileDetails[] = []

            files.forEach((fileName) => {
                const filePath = path.join(this.directoryPath, fileName)
                const stats = fs.statSync(filePath)
                if(!this.fileValidator.isFileValid(fileName, stats)) return

                const fileSizeInBytes = stats.size
                const fileSizeInKiloBytes = fileSizeInBytes / 1024

                fileDetails.push({
                    name: fileName,
                    size: fileSizeInKiloBytes,
                    filePath
                })
            })
    
            return fileDetails
        } catch (error) {
            log(error?.toString(), 'error')
            return []
        }
    }
}

