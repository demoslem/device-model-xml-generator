"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

const PasswordName = {
  Expert:"expert",
  Service:"service",
  Factory:"factory",
  Operator:"operator",
  Reset:"reset",
  SIL:"sil",
  GN:"gn",
  GN_Dens:"gn_dens",
  GN_Dens_Fad:"gn_dens_fad"
};
const ParameterType = {
  Installation : "installation",
  Process : "process",
  CurrentOutput : "co"
};
const ParameterDisplayType = {
  Text : "text",
  List : "list"
};

const ParameterName = {
  Start_Edit_Session : "startEdit",
  Finish_Edit_Session: "endEdit",
  Set_Login_Role:"setLogin",
  Get_Spec_Data :"getSpecData",
  Tank_Height:"fTankHeight",
  Blocking_Distance :"fBlockingDistance",
  Conversion_Factor:"fConversionFactor",
  Min_Plausibility_Window :"fMinPlausWindow",
  Overfill_Enabled:"bOverfillEnabled",
  Overfill_Threshold :"fOverfillThreshold",
  Min_Peak_Required:"fMinPeakRequired",
  Tracking_Velcity:"fTrackingVelocity",
  Empty_Spec_Data_0 :"emptySpec0",
  Empty_Spec_Data_1:"emptySpec1",
  Empty_Spec_Data_2 :"emptySpec2",
  Empty_Spec_Data_3:"emptySpec3",
  Empty_Spec_Data_4:"emptySpec4"
};

class ListOption{
  constructor(value, displayedText) {
    this.value=value;
    this.displayedText=displayedText;
  }
}

class DisplayedParameter{


  constructor(address,name,label,unit,type,displayType,list){
    this.address=address;
    this.name=name;
    this.label=label;
    this.value="";
    this.type=type;
    this.displayType=displayType;
    this.list=list;
    this.unit=unit;

  }
}
class Company{
  constructor(name,displayedName){
    this.name=name;
    this.displayedName=displayedName;
  }
}


class Password{
  constructor(name, isFunction, maskAND, maskOR, key, defaultValue,description){
    this.name=name;
    this.isFunction=isFunction;
    this.maskAND=maskAND;
    this.maskOR=maskOR;
    this.key=key;
    if(isNaN(defaultValue)==true){
      this.defaultValue=-1;
    }
    else{
      this.defaultValue=defaultValue;

    }

    this.description=description;
  }
}

class FunctionParameter{
  constructor(name,address,functionName,description){
    this.name=name;
    this.address=address;
    this.functionName=functionName;
    this.description=description;
  }
}

class SpecParameter{
  constructor(name,address,functionName,description){
    this.name=name;
    this.address=address;
    this.functionName=functionName;
    this.description=description;
    this.value="";
  }
}

class FeaturesConfiguration{
  constructor(json){
    this.passwords=new Array();
    this.companies=new Array();
    this.displayedParameters=new Array();
    this.functionParameters=new Array();
    this.specParameters=new Array();
    this._json = json;
    this.readPasswords();
    this.readCompanies();
    this.readDisplayedParameters();
    this.readFunctionParameters();
    this.readSpecParameters();
  }



  readDisplayedParameters(){

    var options, parameters;
    var parameterTypeName,name,address,label,unit,displayType;
    var optionsList, optionValue,optionText;
    var parameterTypes = Object.values(this._json.FeaturesConfiguration.DeviceParameters.ParameterType);
    parameterTypes.forEach((parameterType) => {
      parameterTypeName= Object(parameterType._attributes.name);
      parameters = Object.values(parameterType.Parameter);
      parameters.forEach((parameter) => {
        name= Object(parameter._attributes.name);
        address= Object(parameter._attributes.address);
        displayType= Object(parameter._attributes.displayType);
        label = String(parameter.Label._text)=="undefined"? "":String(parameter.Label._text);
        unit = String(parameter.Unit._text)=="undefined"? "":String(parameter.Unit._text);
        optionsList=new Array();
        if(displayType==ParameterDisplayType.List){
          options = Object.values(parameter.List.Option);
          options.forEach((option) => {
            optionValue = Object(option._attributes.value);
            optionText=String(option._text)=="undefined"? "":String(option._text);
            optionsList.push (new ListOption(optionValue,optionText));
          });
        }
        this.displayedParameters.push(new DisplayedParameter(address,name,label,unit,parameterTypeName,displayType,optionsList));

      });

    });

  }

  readPasswords(){
     var name,isFunction, maskAND, maskOR, key, defaultValue,description;
     var passwords = Object.values(this._json.FeaturesConfiguration.Passwords.Password);
     passwords.forEach((password) => {
        name =Object(password._attributes.name);
        isFunction=Boolean(Object(password._attributes.isFunction)=="true");
        maskAND = parseInt(Object(password._attributes.maskAND),16);
        maskOR = parseInt(Object(password._attributes.maskOR),16);
        key = String(password.Key._text);
        if (key == "undefined"){
          key = "";
        }
        else{
          key =key.padStart(5,"0");
        }

        description = String(password.Description._text)=="undefined"? "":String(password.Description._text);
        defaultValue = parseInt(Object(password._attributes.defaultValue),16);
        this.passwords.push(new Password(name,isFunction, maskAND, maskOR, key, defaultValue,description));
    });

  }

  readCompanies(){
    var name,displayedName;
    var companies = Object.values(this._json.FeaturesConfiguration.Companies.Company);
    companies.forEach((company) => {
      name = String(company._attributes.name)=="undefined"? "":String(company._attributes.name);
      displayedName=String(company.DisplayedName._text)=="undefined"? "":String(company.DisplayedName._text);
      this.companies.push(new Company(name,displayedName));
    });

  }

  readFunctionParameters(){
    var name,address,functionName,description;
    var parameters = Object.values(this._json.FeaturesConfiguration.FunctionParameters.Parameter);
    parameters.forEach((parameter) => {
      name = String(parameter._attributes.name)=="undefined"? "":String(parameter._attributes.name);
      address = String(parameter._attributes.address)=="undefined"? "":String(parameter._attributes.address);
      functionName=String(parameter.FunctionName._text)=="undefined"? "":String(parameter.FunctionName._text);
      description=String(parameter.Description._text)=="undefined"? "":String(parameter.Description._text);
      this.functionParameters.push(new FunctionParameter(name,address,functionName,description));
    });
  }

  readSpecParameters(){
    var name,address,functionName,description;
    var parameters = Object.values(this._json.FeaturesConfiguration.SpecParameters.Parameter);
    parameters.forEach((parameter) => {
      name = String(parameter._attributes.name)=="undefined"? "":String(parameter._attributes.name);
      address = String(parameter._attributes.address)=="undefined"? "":String(parameter._attributes.address);
      functionName=String(parameter.FunctionName._text)=="undefined"? "":String(parameter.FunctionName._text);
      description=String(parameter.Description._text)=="undefined"? "":String(parameter.Description._text);
      this.specParameters.push(new SpecParameter(name,address,functionName,description));
    });
  }

}

class DevicePasswords {
  constructor(serialNumber, company,config){
    this._sn=serialNumber;
    this._company=company;
    this._config= config;
  }
  getPassword(passwordName){
    var index = this._config.passwords.findIndex(x => x.name==passwordName);
    if (index<0){
      return "Password Configuration is not found, Please update xml file.";
    }
    var x = this.md4Make(this._config.passwords[index]);
    return x.toString().padStart(5,"0") + " (0x"+ x.toString(16).toUpperCase().padStart(4,"0") + ")";
  }
  getPasswordHex(passwordName){
    var index = this._config.passwords.findIndex(x => x.name==passwordName);
    if (index<0){
      return -1;
    }
    var x = this.md4Make(this._config.passwords[index]);
    return x.toString(16).toUpperCase().padStart(4,"0");
  }
  getPasswordDec(passwordName){

    var index = this._config.passwords.findIndex(x => x.name==passwordName);
    if (index<0){
      return -1;
    }
    var x = this.md4Make(this._config.passwords[index]);
    return x.toString().padStart(5,"0");
  }



  md4Make(p){
     var key="";
    var hexcase = 0;
    var chrsz   = 8;
    if(p.defaultValue > -1){
      return p.defaultValue;
    }

    if(p.isFunction==true){
      key = this._company+p.key;
    }else{
      key =p.key;
    }

    var md4 = hex_hmac_md4(key, this._sn);
    var password="";

    if(p.isFunction==true){
      var tailNumber = parseInt(this._sn[14] + this._sn[15], 10) % 16;

      if(tailNumber != 0)
        {
            password = md4.substr((tailNumber - 1)*2,2) + md4.substr(tailNumber*2,2);
        }
        else
        {
            password = md4.substr(30,2) +md4.substr(tailNumber *2,2);
        }
    }
    else{
      password = md4.substring(md4.length-4);
    }

    var x = (parseInt(password,16) & p.maskAND)|p.maskOR;
    return x;

    function hex_hmac_md4(key, data) { return binl2hex(core_hmac_md4(key, data)); }

    function core_md4(x, len)
    {
      x[len >> 5] |= 0x80 << (len % 32);
      x[(((len + 64) >>> 9) << 4) + 14] = len;

      var a =  1732584193;
      var b = -271733879;
      var c = -1732584194;
      var d =  271733878;

      for(var i = 0; i < x.length; i += 16)
      {
        var olda = a;
        var oldb = b;
        var oldc = c;
        var oldd = d;

        a = md4_ff(a, b, c, d, x[i+ 0], 3 );
        d = md4_ff(d, a, b, c, x[i+ 1], 7 );
        c = md4_ff(c, d, a, b, x[i+ 2], 11);
        b = md4_ff(b, c, d, a, x[i+ 3], 19);
        a = md4_ff(a, b, c, d, x[i+ 4], 3 );
        d = md4_ff(d, a, b, c, x[i+ 5], 7 );
        c = md4_ff(c, d, a, b, x[i+ 6], 11);
        b = md4_ff(b, c, d, a, x[i+ 7], 19);
        a = md4_ff(a, b, c, d, x[i+ 8], 3 );
        d = md4_ff(d, a, b, c, x[i+ 9], 7 );
        c = md4_ff(c, d, a, b, x[i+10], 11);
        b = md4_ff(b, c, d, a, x[i+11], 19);
        a = md4_ff(a, b, c, d, x[i+12], 3 );
        d = md4_ff(d, a, b, c, x[i+13], 7 );
        c = md4_ff(c, d, a, b, x[i+14], 11);
        b = md4_ff(b, c, d, a, x[i+15], 19);

        a = md4_gg(a, b, c, d, x[i+ 0], 3 );
        d = md4_gg(d, a, b, c, x[i+ 4], 5 );
        c = md4_gg(c, d, a, b, x[i+ 8], 9 );
        b = md4_gg(b, c, d, a, x[i+12], 13);
        a = md4_gg(a, b, c, d, x[i+ 1], 3 );
        d = md4_gg(d, a, b, c, x[i+ 5], 5 );
        c = md4_gg(c, d, a, b, x[i+ 9], 9 );
        b = md4_gg(b, c, d, a, x[i+13], 13);
        a = md4_gg(a, b, c, d, x[i+ 2], 3 );
        d = md4_gg(d, a, b, c, x[i+ 6], 5 );
        c = md4_gg(c, d, a, b, x[i+10], 9 );
        b = md4_gg(b, c, d, a, x[i+14], 13);
        a = md4_gg(a, b, c, d, x[i+ 3], 3 );
        d = md4_gg(d, a, b, c, x[i+ 7], 5 );
        c = md4_gg(c, d, a, b, x[i+11], 9 );
        b = md4_gg(b, c, d, a, x[i+15], 13);

        a = md4_hh(a, b, c, d, x[i+ 0], 3 );
        d = md4_hh(d, a, b, c, x[i+ 8], 9 );
        c = md4_hh(c, d, a, b, x[i+ 4], 11);
        b = md4_hh(b, c, d, a, x[i+12], 15);
        a = md4_hh(a, b, c, d, x[i+ 2], 3 );
        d = md4_hh(d, a, b, c, x[i+10], 9 );
        c = md4_hh(c, d, a, b, x[i+ 6], 11);
        b = md4_hh(b, c, d, a, x[i+14], 15);
        a = md4_hh(a, b, c, d, x[i+ 1], 3 );
        d = md4_hh(d, a, b, c, x[i+ 9], 9 );
        c = md4_hh(c, d, a, b, x[i+ 5], 11);
        b = md4_hh(b, c, d, a, x[i+13], 15);
        a = md4_hh(a, b, c, d, x[i+ 3], 3 );
        d = md4_hh(d, a, b, c, x[i+11], 9 );
        c = md4_hh(c, d, a, b, x[i+ 7], 11);
        b = md4_hh(b, c, d, a, x[i+15], 15);

        a = safe_add(a, olda);
        b = safe_add(b, oldb);
        c = safe_add(c, oldc);
        d = safe_add(d, oldd);

      }
      return Array(a, b, c, d);

    }

    function md4_cmn(q, a, b, x, s, t)
    {
      return safe_add(rol(safe_add(safe_add(a, q), safe_add(x, t)), s), b);
    }
    function md4_ff(a, b, c, d, x, s)
    {
      return md4_cmn((b & c) | ((~b) & d), a, 0, x, s, 0);
    }
    function md4_gg(a, b, c, d, x, s)
    {
      return md4_cmn((b & c) | (b & d) | (c & d), a, 0, x, s, 1518500249);
    }
    function md4_hh(a, b, c, d, x, s)
    {
      return md4_cmn(b ^ c ^ d, a, 0, x, s, 1859775393);
    }


    function core_hmac_md4(key, data)
    {
      var bkey = str2binl(key);
      if(bkey.length > 16) bkey = core_md4(bkey, key.length * chrsz);

      var ipad = Array(16), opad = Array(16);
      for(var i = 0; i < 16; i++)
      {
        ipad[i] = bkey[i] ^ 0x36363636;
        opad[i] = bkey[i] ^ 0x5C5C5C5C;
      }

      var hash = core_md4(ipad.concat(str2binl(data)), 512 + data.length * chrsz);
      return core_md4(opad.concat(hash), 512 + 128);
    }

    function safe_add(x, y)
    {
      var lsw = (x & 0xFFFF) + (y & 0xFFFF);
      var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
      return (msw << 16) | (lsw & 0xFFFF);
    }

    function rol(num, cnt)
    {
      return (num << cnt) | (num >>> (32 - cnt));
    }

    function str2binl(str)
    {
      var bin = Array();
      var mask = (1 << chrsz) - 1;
      for(var i = 0; i < str.length * chrsz; i += chrsz)
        bin[i>>5] |= (str.charCodeAt(i / chrsz) & mask) << (i%32);
      return bin;
    }



    function binl2hex(binarray)
    {
      var hex_tab = hexcase ? "0123456789ABCDEF" : "0123456789abcdef";
      var str = "";
      for(var i = 0; i < binarray.length * 4; i++)
      {
        str += hex_tab.charAt((binarray[i>>2] >> ((i%4)*8+4)) & 0xF) +
               hex_tab.charAt((binarray[i>>2] >> ((i%4)*8  )) & 0xF);
      }
      return str;
    }



  }
}

class ParametersValidator{

  constructor(parameters){
    this.msg="";
    this.isValidated=true;
    this._wrongEntry=false;
    this._parameters=parameters;
    this.validate();
  }

  validate() {


    var timeConst= this.convertToNumber("timeConstant");
    var tankH = this.convertToNumber("tankHeight");
    var distPiece =this.convertToNumber("distancePiece");
    var blockingDist = this.convertToNumber("blockingDistance");
    var antennaExt = this.convertToNumber("antennaExtension");
    var refOffset = this.convertToNumber("referenceOffset");
    var tankBotOffset= this.convertToNumber("tankBottomOffset");
    var maxTrackingV = this.convertToNumber("maxTrackingVelocity");
    var epsilonRProduct =this.convertToNumber("epsilonRProduct");
    var epsilonRGas = this.convertToNumber("epsilonRGas");
    var range0 = this.convertToNumber("range0");
    var range100 = this.convertToNumber("range100");
    var lowError = this.convertToNumber("lowError");
    var lowTrimming = this.convertToNumber("lowTrimming");
    var highTrimming = this.convertToNumber("highTrimming");
    var minPeak = this.convertToNumber("minPeakRequired");
    var minPlausibility = this.convertToNumber("minPlausibility");


    if(this._wrongEntry==true){
      this.msg = " *Entries should be numbers only.";
      this.isValidated=false;

    } else{
      if(tankH + distPiece+blockingDist+antennaExt > 100){
        this.isValidated=false;
        this.msg = this.msg+" *combination of distance piece, tank height, blocking distance and antenna extension exceeds the maximum measurement range (100m).";
      }
      if(blockingDist < antennaExt){
        this.isValidated=false;
        this.msg = this.msg+" *Blocking Distance is less than Antenna Extension.";
      }
      if(tankH < blockingDist){
        this.isValidated=false;
        this.msg = this.msg+" *Tank Height is less than Blocking Distance."+tankH+"/"+blockingDist;
      }
      if(refOffset < distPiece){
        this.isValidated=false;
        this.msg = this.msg+" *Reference Offset is less than Distance Piece.";
      }

      if (maxTrackingV>60 || maxTrackingV<0.0012){
        this.isValidated=false;
        this.msg = this.msg+" *Maximum Tracking Vlocity should be in the range of (0.0012 to 60) m/min";
      }

      if (maxTrackingV>60 || maxTrackingV<0.0012){
        this.isValidated=false;
        this.msg = this.msg+" *Maximum Tracking Vlocity should be in the range of (0.0012 to 60) m/min";
      }

      if (maxTrackingV>60 || maxTrackingV<0.0012){
        this.isValidated=false;
        this.msg = this.msg+" *Tracking Velocity should be in the range of (0.0012 to 60) m/min";
      }

      if (epsilonRProduct>20 || epsilonRProduct<1.1){
        this.isValidated=false;
        this.msg = this.msg+" *epsilon_R Product should be in the range of (1.1 to 20)";
      }

      if (epsilonRGas>20 || epsilonRGas<1){
        this.isValidated=false;
        this.msg = this.msg+" *epsilon_R Gas  should be in the range of (1 to 20)";
      }

      if (range0>100 || range0<0){
        this.isValidated=false;
        this.msg = this.msg+" *0% Current Output Range should be in the range of (0 to 100) m";
      }

      if (range100>100 || range100<0){
        this.isValidated=false;
        this.msg = this.msg+" *100% Current Output Range should be in the range of (0 to 100) m";
      }

      if (range0 >= range100){
        this.isValidated=false;
        this.msg = this.msg+" *100% Range should be greater than 0% Range";
      }

      if (lowError>3.6 || lowError<3.5){
        this.isValidated=false;
        this.msg = this.msg+" *Low Current Error should be in the range of (3.5 to 3.6) mA";
      }

      if (lowTrimming>25 || lowTrimming<0){
        this.isValidated=false;
        this.msg = this.msg+" *4mA Trimming should be in the range of (0 to 25) mA";
      }

      if (highTrimming>25 || highTrimming<0){
        this.isValidated=false;
        this.msg = this.msg+" *20mA Trimming should be in the range of (0 to 25) mA";
      }

      if (lowTrimming >= highTrimming){
        this.isValidated=false;
        this.msg = this.msg+" *20mA Trimming should be greater 4mA Trimming";
      }

      if (minPeak>100 || minPeak<0){
        this.isValidated=false;
        this.msg = this.msg+" *Minimum Peak Required  should be in the range of (0 to 100)%";
      }

      if (minPlausibility>100 || minPlausibility<0.001){
        this.isValidated=false;
        this.msg = this.msg+" *Minimum Plausibility Window should be in the range of (0.001 to 100) m";
      }
    }

  }


  convertToNumber(propName){
    var result=0;
    result = Number(this._parameters.find(x => x.name==propName).value);
    if(isNaN(result)==true){
      this._wrongEntry=true;
    }
    return result;
  }

}

exports.ParameterDisplayType=ParameterDisplayType;
exports.ParameterType=ParameterType;
exports.PasswordName=PasswordName;
exports.ParameterName=ParameterName;
exports.ListOption=ListOption;
exports.DisplayedParameter=DisplayedParameter;
exports.FunctionParameter=FunctionParameter;
exports.SpecParameter=SpecParameter;
exports.FeaturesConfiguration=FeaturesConfiguration;
exports.Password=Password;
exports.Company=Company;
exports.DevicePasswords = DevicePasswords;
exports.ParametersValidator = ParametersValidator;
