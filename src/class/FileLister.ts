
import fs from 'fs'
import path from 'path'
import { FileListerException } from './Exceptions'
import { log } from './Logger'

interface FileDetails {
    name: string
    size: number
}

export class FileLister {
    private directoryPath: string

    constructor(directoryPath: string) {
        this.directoryPath = directoryPath
    }
    
    private validDirectory() {
        if (!fs.existsSync(this.directoryPath)) {
            throw new FileListerException(`Directory ${this.directoryPath} does not exist`)
        }

        if (!fs.statSync(this.directoryPath).isDirectory()) {
            throw new FileListerException(`"${this.directoryPath}" is not a directory.`)
        }
    }

    private filesInDirectory () {
        const files = fs.readdirSync(this.directoryPath)
        if (files.length === 0) {
            throw new FileListerException(`There are no files in ${this.directoryPath}`)
        }
        return files
    }

    listFiles(): FileDetails[] {
        try {
            this.validDirectory()

            const files = this.filesInDirectory()
            const fileDetails: FileDetails[] = []

            files.forEach((fileName) => {
                const filePath = path.join(this.directoryPath, fileName);
                const stats = fs.statSync(filePath);
                const fileSizeInBytes = stats.size;
                const fileSizeInKiloBytes = fileSizeInBytes / 1024;
                fileDetails.push({
                    name: fileName,
                    size: fileSizeInKiloBytes
                })
            })
    
            return fileDetails
        } catch (error) {
            log(error?.toString(), 'error')
            return []
        }
    }
}

