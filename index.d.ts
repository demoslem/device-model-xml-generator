import {WorkBook, WorkSheet} from 'xlsx'

export declare interface DmBlock{
    blockLabel:string
    classification:string
    access:string
    deploy:string
    origin:string
    activationFunc:string
}
export declare interface DmEnum{
    name:string
    valueNames: string[]
    values: string[]
}
export declare class DeviceModelGenerator{
    dmBlocks: DmBlock[]
    dmEnums: DmEnum[]
    constructor(private readonly _wb :WorkBook);
    private generateBlocks(blocksSheet: WorkSheet):void;
    private generateEnums(enumsSheet: WorkSheet):void;
}
