import dotenv from 'dotenv'
import { FileLister } from './class/FileLister'
import { log } from './class/Logger'
dotenv.config()

const {
    PATH_TO_FILES,
    FILES_EXTENSION,
} = process.env

export const mainExecutor = () => {
    log(`
        Initializing app...
        PATH_TO_FILES = ${PATH_TO_FILES}
    `)

    const filesExtension = FILES_EXTENSION?.split(' ')
    const fileLister = new FileLister(PATH_TO_FILES!, filesExtension)
    const files = fileLister.listFiles()
    log(`
        Found files: ${files.length}
    `)
    log(files)
}
