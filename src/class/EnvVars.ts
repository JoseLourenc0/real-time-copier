import dotenv from 'dotenv'
dotenv.config()

const {
    PATH_TO_FILES,
    FILES_EXTENSION,
    TARGET_PATH
} = process.env

export class ENV {
    static get PATH_TO_FILES() {
        return PATH_TO_FILES || ''
    }

    static get TARGET_PATH() {
        return TARGET_PATH || ''
    }

    static get FILES_EXTENSION() {
        if(!FILES_EXTENSION) return []
        
        const splitted = FILES_EXTENSION.split(' ')
        if (!splitted.length) return []

        return splitted
    }
}

