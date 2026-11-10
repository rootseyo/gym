const {test}=require('node:test');const assert=require('node:assert/strict');const fs=require('node:fs');const vm=require('node:vm');const core=require('../ouwan-core.js');
test('whole-day completion rejects empty days/exercises, unfinished and explicitly unchecked legacy sets',()=>{
 for(const value of [[],null,[{name:'벤치',sets:[]}],[{name:'벤치',sets:[{completed:false,isCompleted:true}]}]])assert.equal(core.isComplete(value),false);
 assert.equal(core.isComplete([{name:'벤치',sets:[{completed:'true'},{isCompleted:true}]}]),true);
});
test('Korean week and month boundaries',()=>{
 const now=Date.parse('2026-08-31T15:00:00Z');assert.equal(core.today(now),'2026-09-01');assert.equal(core.periodStart('week',now),'2026-08-31');assert.equal(core.periodStart('month',now),'2026-09-01');assert.equal(core.validDate('2026-02-31'),false);
});
test('total volume sums strength weight by reps and excludes cardio',()=>{
 assert.equal(core.totalVolume([{type:'strength',sets:[{weight:60,actualReps:10},{weight:40,actualReps:12}]},{type:'cardio',sets:[{weight:12,actualReps:30}]}]),1080);
});
test('nickname samples are unique after normalization and server/web completion rules match',()=>{
 const samples=JSON.parse(fs.readFileSync(require('node:path').join(__dirname,'../nickname-samples.json')));assert.equal(samples.length,1000);assert.equal(new Set(samples.map(core.nicknameKey)).size,1000);
 assert.equal(core.nicknameKey(' 힘센  거북이 '),core.nicknameKey('힘센거북이'));
 assert.equal(fs.readFileSync(require('node:path').join(__dirname,'../ouwan-core.js'),'utf8'),fs.readFileSync(require('node:path').join(__dirname,'../../admin/src/lib/ouwan-core.js'),'utf8'));
});
test('shared v1 workout code preserves rest and set values but resets completion',()=>{
 const context={TextEncoder,TextDecoder,URL,btoa,atob};vm.createContext(context);vm.runInContext(fs.readFileSync(require('node:path').join(__dirname,'../routine-code.js'),'utf8'),context);
 const ex=[{name:'벤치프레스',category:'가슴',type:'strength',restSeconds:135,sets:[{weight:42.5,targetReps:12,actualReps:10,type:'warmup',completed:true}]}];
 const code=context.generateExerciseRoutineCode(ex,()=>90,true);assert.match(code,/^FITROUTINE_v1_/);const parsed=JSON.parse(context.decodeRoutineString(code));
 assert.equal(parsed.data[0].rst,135);assert.equal(parsed.data[0].s[0].cmp,0);assert.equal(parsed.data[0].s[0].tr,10);assert.equal(parsed.data[0].s[0].w,42.5);assert.equal(ex[0].sets[0].completed,true);
});
