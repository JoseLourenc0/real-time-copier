import { FileCopier } from './class/FileCopier'
import { FileLister } from './class/FileLister'
import { log } from './class/Logger'

export const mainExecutor = () => {

    const fileLister = new FileLister()
    const files = fileLister.listFiles()
    log(`
        Found files: ${files.length}
    `)
    files.forEach(file => {
        log('Iniciando file: ' + file)
        const fileCopier = new FileCopier(file.filePath)
        fileCopier.startCopying()
    })
}
