"use strict";
function detectUnit(v){var n=Math.abs(Number(v));if(!isFinite(n)||n===0)return"s";if(n>=1e17)return"ns";if(n>=1e14)return"us";if(n>=1e11)return"ms";if(n>=1e8)return"s";return"s";}
function toMillis(v,unit){var n=Number(v);if(unit==="ns")return n/1e6;if(unit==="us")return n/1e3;if(unit==="ms")return n;return n*1000;}
function fromMillis(ms,unit){if(unit==="ns")return Math.round(ms*1e6);if(unit==="us")return Math.round(ms*1e3);if(unit==="ms")return Math.round(ms);return Math.round(ms/1000);}
function convertLine(line){var raw=String(line).trim();if(!/^-?\d+(\.\d+)?$/.test(raw))return{raw:raw,valid:false,unit:null,ms:null,iso:""};var unit=detectUnit(raw);var ms=toMillis(parseFloat(raw),unit);var d=new Date(ms);if(isNaN(d))return{raw:raw,valid:false,unit:unit,ms:null,iso:""};return{raw:raw,valid:true,unit:unit,ms:ms,iso:d.toISOString(),utc:d.toUTCString()};}
function relativeFormat(ms,now){var ref=now==null?Date.now():now;var diff=ms-ref;var abs=Math.abs(diff);var suffix=diff<0?" ago":" from now";if(abs<1000)return"just now";var sec=Math.floor(abs/1000);if(sec<60)return sec+"s"+suffix;var min=Math.floor(sec/60);if(min<60)return min+"m"+suffix;var hr=Math.floor(min/60);if(hr<24)return hr+"h"+suffix;var day=Math.floor(hr/24);if(day<30)return day+"d"+suffix;var mo=Math.floor(day/30);if(mo<12)return mo+"mo"+suffix;return Math.floor(mo/12)+"y"+suffix;}
function annotateLine(line,now){return String(line).replace(/\b\d{10,19}\b/g,function(m){var unit=detectUnit(m);var ms=toMillis(Number(m),unit);var d=new Date(ms);if(isNaN(d))return m;return m+" ["+d.toISOString()+" | "+relativeFormat(ms,now)+"]";});}
function dateToEpoch(str,unit){var d=new Date(str);if(isNaN(d))return null;return fromMillis(d.getTime(),unit||"s");}
function csvEscape(v){var s=String(v==null?"":v);return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s;}
function buildCsv(results,now){var lines=["raw,unit,iso,utc,relative"];results.forEach(function(r){lines.push([r.raw,r.unit||"",r.iso||"",r.utc||"",r.valid?relativeFormat(r.ms,now):""].map(csvEscape).join(","));});return lines.join("\n")+"\n";}
function batchConvert(text,now){return String(text||"").split(/\r?\n/).filter(function(l){return l.trim()!=="";}).map(convertLine).map(function(r){if(r.valid)r.relative=relativeFormat(r.ms,now);return r;});}
const api={detectUnit,toMillis,fromMillis,convertLine,relativeFormat,annotateLine,dateToEpoch,csvEscape,buildCsv,batchConvert};
if(typeof module!=="undefined"&&module.exports){module.exports=api;} if(typeof window!=="undefined"){window.BatchEpochConverter=api;}
