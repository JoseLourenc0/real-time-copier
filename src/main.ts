import dotenv from 'dotenv'
import { FileLister } from './class/FileLister'
import { log } from './class/Logger'
dotenv.config()

const {
    PATH_TO_FILES
} = process.env

export const mainExecutor = () => {
    log(`
        Initializing app...
        PATH_TO_FILES = ${PATH_TO_FILES}
    `)

    const fileLister = new FileLister(PATH_TO_FILES!)
    log(fileLister.listFiles())
}
