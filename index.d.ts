export declare enum ParameterType{
  Installation ='installation',
  Process='process',
  CurrentOutput='co'
}

export declare enum ParameterName{
  Start_Edit_Session = 'startEdit',
  Finish_Edit_Session= 'endEdit',
  Set_Login_Role='setLogin',
  Get_Spec_Data ='getSpecData',
  Tank_Height='fTankHeight',
  Blocking_Distance ='fBlockingDistance',
  Conversion_Factor='fConversionFactor',
  Min_Plausibility_Window ='fMinPlausWindow',
  Overfill_Enabled='bOverfillEnabled',
  Overfill_Threshold ='fOverfillThreshold',
  Min_Peak_Required='fMinPeakRequired',
  Tracking_Velcity='fTrackingVelocity',
  Empty_Spec_Data_0 ='emptySpec0',
  Empty_Spec_Data_1='emptySpec1',
  Empty_Spec_Data_2 ='emptySpec2',
  Empty_Spec_Data_3='emptySpec3',
  Empty_Spec_Data_4='emptySpec4'
}

export declare enum ParameterDisplayType{
  Text ='text',
  List='list'
}

export declare  class ListOption{
  value:string;
  displayedText:string;
  constructor(value:string, displayedText:string);
}

export declare  class DisplayedParameter{
  address:string;
  name:string;
  label:string;
  value:string;
  unit:string;
  type:ParameterType;
  displayType: ParameterDisplayType;
  list:Array<ListOption>;
  constructor(address:string,name:string,label:string,unit:string,type:ParameterType,displayType: ParameterDisplayType,list:Array<ListOption>);
}

export declare enum PasswordName {
  Expert = 'expert',
  Service = 'service',
  Factory = 'factory',
  Operator = 'operator',
  Reset = 'reset',
  SIL = 'sil',
  GN = 'gn',
  GN_Dens = 'gn_dens',
  GN_Dens_Fad='gn_dens_fad'
}
export declare class Company{
  name:string;
  displayedName:string;
  constructor(name:string,displayedName:string);
}
export declare class Password {
  name:PasswordName;
  isFunction:boolean;
  maskAND:number;
  maskOR:number;
  key:string;
  defaultValue:number;
  description:string;
  constructor(name:PasswordName, isFunction:boolean, maskAND:number, maskOR:number, key:string, defaultValue:number, description:string);
}

export declare class FunctionParameter{
  name:ParameterName;
  address:string;
  functionName:string;
  description:string;
  constructor(name:string, address:string, functionName:string, description:string);
}

export declare class SpecParameter{
  name:ParameterName;
  address:string;
  functionName:string;
  description:string;
  value:string;
  constructor(name:string, address:string, functionName:string, description:string);
}

export declare class FeaturesConfiguration {
  private _json:any;
  passwords:Array<Password>;
  companies:Array<Company>;
  displayedParameters:Array<DisplayedParameter>;
  functionParameters:Array<FunctionParameter>;
  specParameters:Array<SpecParameter>;
  constructor(json:any);
  private readDisplayedParameters():void;
  private readFunctionParameters():void;
  private readSpecParameters():void;
  private readPaswords():void;
  private readCompanies():void;

}
export declare class DevicePasswords {
  private _sn:string;
  private _company:string;
  private _config:FeaturesConfiguration;
  constructor(serialNumber: string, company: string, config:FeaturesConfiguration);
  getPassword(passwordName:PasswordName):string;
  getPasswordDec(passwordName:PasswordName):string;
  getPasswordHex(passwordName:PasswordName):string;
  private md4Make(p:Password):string;
}
export declare class ParametersValidator {
  private _wrongEntry:boolean;
  msg:string;
  isValidated:boolean;
  private _parameters:Array<DisplayedParameter>
  constructor(parameters:Array<DisplayedParameter>);
  private validate():void;
  private convertToNumber(propName:string):number;
}
