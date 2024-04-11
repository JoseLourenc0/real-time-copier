export class FileListerException extends Error {
    constructor(message: string) {
        super(message)
        this.name = 'FileListerException'
    }
}
