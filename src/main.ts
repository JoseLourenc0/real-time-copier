import { FileCopier } from './class/FileCopier'
import { FileLister } from './class/FileLister'
import { FolderWatcher } from './class/FolderWatcher'
import { log } from './class/Logger'

export const mainExecutor = () => {

    const folderWatcher = new FolderWatcher()
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

    folderWatcher.watchFolderForNewFiles(filePath => {
        const fileCopier = new FileCopier(filePath)
        fileCopier.startCopying()
    })
}
