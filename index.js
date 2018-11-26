"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const xlsx_1 = require("xlsx");

class DeviceModelXmlGenerator{
  constructor(wb){
    this.generateBlocks(this._wb.Sheets['DmBlocks'])
    this.generateEnums(this._wb.Sheets['DmEnums'])
  }

  generateBlocks(blocksSheet){

    this.dmBlocks=[]

    let json= xlsx_1.utils.sheet_to_json(blocksSheet,{raw: true})
    json.forEach((row)=> {
        this.dmBlocks.push({blockLabel: row["Block Label"],
        classification:row["Classification"],
        access:row["Access"],
        deploy:row["Deploy"],
        origin:row["Origin"],
        activationFunc:row["Activation Func"]})
    })
}

generateEnums(enumsSheet){

}

}
exports.DeviceModelXmlGenerator = DeviceModelXmlGenerator;
