const {test}=require('node:test');
const assert=require('node:assert/strict');
const vm=require('node:vm');
const fs=require('node:fs');
function fixture(fetch){
 const values=new Map([['fit_tracker_kakao_user',JSON.stringify({kakaoId:'111'})]]);
 const ctx={console:{log(){},warn(){},error(){}},state:{workouts:{},customPresets:[],deletedDates:[]},localStorage:{getItem:k=>values.get(k)||null,setItem:(k,v)=>values.set(k,v)},document:{getElementById:()=>null},navigator:{userAgent:'test'},URLSearchParams,structuredClone,setTimeout,clearTimeout,CustomEvent:class{},fetch,updateUI(){},dispatchEvent(){}};
 ctx.window=ctx;vm.createContext(ctx);vm.runInContext(fs.readFileSync('firebase-sync.js','utf8'),ctx);return ctx;
}
const workout=weight=>[{name:'벤치프레스',sets:[{weight,completed:true}]}];
test('dirty workout edits survive cloud refresh while untouched dates use server records',()=>{
 const c=fixture();c.state.workouts={a:workout(20),b:workout(30)};c.markGymWorkoutChanges({a:workout(10),b:workout(30)},c.state.workouts);c.mergeAdminWorkoutsIntoLocalState({a:workout(10),b:workout(40)});assert.equal(c.state.workouts.a[0].sets[0].weight,20);assert.equal(c.state.workouts.b[0].sets[0].weight,40);
});
test('first upload pulls latest server records before constructing its payload',async()=>{
 const calls=[];const c=fixture(async(url,options)=>{calls.push({url,options});return{ok:true,json:async()=>({success:true,workouts:options.method==='GET'?{a:workout(90)}:{}})};});
 c.state.workouts={a:workout(10)};await c.flushGymSync();assert.equal(calls[0].options.method,'GET');assert.equal(calls[1].options.method,'POST');assert.equal(JSON.parse(calls[1].options.body).workouts.a[0].sets[0].weight,90);
});
test('late response from previous account is discarded before local merge',async()=>{
 let resolve;const c=fixture(()=>new Promise(r=>resolve=r));c.state.workouts={a:workout(10)};const pending=c.pullWorkoutsFromAdminServer();c.localStorage.setItem('fit_tracker_kakao_user',JSON.stringify({kakaoId:'222'}));resolve({ok:true,json:async()=>({success:true,workouts:{a:workout(99)}})});assert.equal(await pending,false);assert.equal(c.state.workouts.a[0].sets[0].weight,10);
});
