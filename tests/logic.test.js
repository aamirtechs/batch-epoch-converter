const test=require("node:test");const assert=require("node:assert/strict");const L=require("../src/logic.js");
test("unit detection by magnitude",()=>{assert.equal(L.detectUnit(1700000000),"s");assert.equal(L.detectUnit(1700000000000),"ms");assert.equal(L.detectUnit(1700000000000000),"us");assert.equal(L.detectUnit(1700000000000000000),"ns");});
test("toMillis conversions",()=>{assert.equal(L.toMillis(2,"s"),2000);assert.equal(L.toMillis(2000,"ms"),2000);assert.equal(L.toMillis(2000000,"us"),2000);assert.equal(L.toMillis(2000000000,"ns"),2000);});
test("convertLine produces ISO",()=>{const r=L.convertLine("0");assert.equal(r.valid,true);assert.equal(r.iso,"1970-01-01T00:00:00.000Z");const bad=L.convertLine("hello");assert.equal(bad.valid,false);});
test("relative formatting with injected now",()=>{const now=1700000000000;assert.equal(L.relativeFormat(now-3*3600000,now),"3h ago");assert.equal(L.relativeFormat(now+60000,now),"1m from now");assert.equal(L.relativeFormat(now,now),"just now");});
test("annotate mode appends human date inside log line",()=>{const out=L.annotateLine("user login at 1700000000 ok",1700000000000);assert.match(out,/1700000000 \[/);assert.match(out,/2023-11-14/);});
test("reverse date to epoch",()=>{assert.equal(L.dateToEpoch("1970-01-01T00:00:01.000Z","s"),1);assert.equal(L.dateToEpoch("1970-01-01T00:00:01.000Z","ms"),1000);assert.equal(L.dateToEpoch("nope","s"),null);});
test("CSV export build",()=>{const res=L.batchConvert("0",0);const csv=L.buildCsv(res,0);assert.match(csv,/raw,unit,iso/);assert.match(csv,/1970-01-01/);});
