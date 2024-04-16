import { FileLister } from './class/FileLister'
import { log } from './class/Logger'

export const mainExecutor = () => {

    const fileLister = new FileLister()
    const files = fileLister.listFiles()
    log(`
        Found files: ${files.length}
    `)
    log(files)
}
