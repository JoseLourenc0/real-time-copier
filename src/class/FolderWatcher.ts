import fs from 'fs'
import path from 'path'
import { ENV } from './EnvVars'
import { FileValidator } from './FileValidator'
import { log } from './Logger'

export class FolderWatcher {
    private directoryPath: string
    private fileValidator: FileValidator

    constructor() {
        this.fileValidator = new FileValidator()
        this.directoryPath = ENV.PATH_TO_FILES
    }

    watchFolderForNewFiles(cb: (filePath: string) => void): void {
        this.fileValidator.validDirectory(this.directoryPath)

        fs.watch(this.directoryPath, { recursive: false }, (eventType, fileName) => {
            if (eventType === 'rename' && fileName) {

                const filePath = path.join(this.directoryPath, fileName)
                if (this.fileValidator.isTempFile(fileName)) return

                const stats = fs.statSync(filePath)

                if(!this.fileValidator.isFileValid(fileName, stats)) return

                cb(filePath)
            }
        });
    }
}
