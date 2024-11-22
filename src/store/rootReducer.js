
import { combineReducers } from "@reduxjs/toolkit";
import login from "./login";
import addfilename from "./addfilename";
import getunprocessedfiles from "./getunprocesedfiles";
import uploadserver from "./uploadtoserver";
import getfile from "./getfile";
import addcropimage from "./addcropimage";
import getprocessedfile from "./getprocessedfile";
import getqccheckedfiles from "./getqccheckedfiles";

// import allemployee from "./allemployee";
// import adduserSlice from "./adduser";
// import reportsto from "./reportsto";
// import getprofileinfo from "./getprofileinfo";
// import assetSlice from "./assetSlice";
// import allgroup from "./allgroup";
// import addgroup from "./addgroup";
// import allmanagers from "./allmanagers";
// import updategroup from "./updategroup";
// import allscreenshots from "./allscreenshots";
// import activity from "./activity";
// import updateuser from "./updateuser";
// import activitybyday from "./activitybyday";
// import activitybydate from "./activitybydate";
// import getgroupsprofileinfo from "./getgroupsprofileinfo";
// import addgroupsetting from "./addgroupsetting";
// import updategroupsetting from "./updategroupsetting";
// import addempsetting from "./addempsetting";
// import updateempsetting from "./updateempsetting";
// import getempsettings from "./getempsettings";
// import getemployee from "./getemployee";
// import addroles from "./addroles";
// import getroles from "./getroles";
// import fetchpermissions from "./fetchpermissions";

const rootReducer = combineReducers({
  login,
  addfilename,
  uploadserver,
  getunprocessedfiles,
  getfile,
  addcropimage,
  getprocessedfile,
  getqccheckedfiles,
  // allemployee,
  // reportsto,
  // getprofileinfo,
  // getgroupsprofileinfo,
  // assetSlice,
  // allgroup,
  // addgroup,
  // addgroupsetting,
  // allmanagers,
  // updategroup,
  // allscreenshots,
  // activity,
  // adduserSlice,
  // updateuser,
  // activitybyday,
  // activitybydate,
  // updategroupsetting,
  // addempsetting,
  // updateempsetting,
  // getempsettings,
  // getemployee,
  // addroles,
  // getroles,
  // fetchpermissions,
});

export default rootReducer;
