const fs=require('fs');const file=__dirname+'/treatment-cost.css';let css=fs.readFileSync(file,'utf8');
css=css.slice(0,css.indexOf('@media(max-width:1050px)'));
function set(selector,props){const start=css.indexOf(selector+'{');if(start<0)throw Error('Missing '+selector);const end=css.indexOf('}',start);let rule=css.slice(start+selector.length+1,end);for(const [name,value] of Object.entries(props)){const re=new RegExp('(^|;)'+name+':[^;]*');if(re.test(rule))rule=rule.replace(re,(_,sep)=>sep+name+':'+value);else rule+=';'+name+':'+value;}css=css.slice(0,start)+selector+'{'+rule+'}'+css.slice(end+1);}
set('.treatment-cost',{'font-family':'Montserrat,sans-serif','font-size':'18px','line-height':'1.6'});
set('.tc-heading h2',{'font-family':'Ubuntu,sans-serif!important','font-size':'50px','font-weight':'500','line-height':'1.1','letter-spacing':'0'});
set('.tc-eyebrow',{'font-size':'13px','line-height':'1.5'});
set('.tc-intro',{'font-size':'20px','line-height':'1.6','color':'#747577'});
set('.tc-price-link',{'font-size':'16px'});
set('.tc-choice-copy',{'padding':'23px 54px 23px 24px','gap':'9px'});
set('.tc-choice-copy strong',{'font-family':'Ubuntu,sans-serif','font-size':'28px','font-weight':'500','line-height':'1.1'});
set('.tc-choice-copy>span',{'font-size':'16px','line-height':'1.6','color':'#747577'});
set('.tc-indicator',{'bottom':'39px'});
set('.tc-panel',{'grid-template-columns':'minmax(0,1fr) 330px','gap':'0 36px','padding':'34px'});
set('.tc-services h3',{'font-family':'Ubuntu,sans-serif','font-size':'28px','font-weight':'500','line-height':'1.1','margin':'0 0 28px'});
set('.tc-table-label',{'font-size':'14px','letter-spacing':'0','color':'#747577'});
set('.tc-services li',{'padding':'22px 0','gap':'16px'});
set('.tc-step',{'font-size':'14px'});
set('.tc-service strong',{'font-size':'18px','font-weight':'500','line-height':'1.5'});
set('.tc-service>span',{'font-size':'16px','line-height':'1.6','color':'#747577'});
set('.tc-price',{'font-size':'22px','line-height':'1.4'});
set('.tc-price-individual',{'font-size':'16px','max-width':'150px','color':'#747577'});
set('.tc-case-note',{'font-size':'15px','line-height':'1.6','color':'#747577'});
set('.tc-aside',{'padding':'28px 24px'});
set('.tc-aside h3',{'font-family':'Ubuntu,sans-serif','font-size':'30px','line-height':'1.1','letter-spacing':'0'});
set('.tc-aside p',{'font-size':'16px','line-height':'1.6','color':'#747577'});
set('.tc-consult',{'font-family':'Montserrat,sans-serif','font-size':'16px','line-height':'1.5','padding':'16px 20px'});
set('.tc-consult-price',{'font-size':'14px','line-height':'1.6','color':'#747577'});
set('.tc-additional summary',{'font-size':'16px','line-height':'1.6','color':'#57585a'});
set('.tc-additional p',{'font-size':'16px','line-height':'1.6','color':'#747577'});
set('.tc-disclaimer',{'font-size':'14px','line-height':'1.6','color':'#747577'});
set('.tc-preview-dialog',{'font':'16px/1.6 Montserrat,sans-serif'});
css=`@font-face{font-family:Montserrat;src:url('assets/montserrat-regular.ttf') format('truetype');font-weight:400;font-style:normal;font-display:swap}
@font-face{font-family:Montserrat;src:url('assets/montserrat-medium.ttf') format('truetype');font-weight:500;font-style:normal;font-display:swap}
@font-face{font-family:Montserrat;src:url('assets/montserrat-semibold.ttf') format('truetype');font-weight:600;font-style:normal;font-display:swap}
@font-face{font-family:Ubuntu;src:url('assets/ubuntu-medium.ttf') format('truetype');font-weight:500;font-style:normal;font-display:swap}
`+css+`
@media(max-width:1050px){
  .tc-heading h2{font-size:44px}.tc-heading{align-items:flex-start}.tc-price-link{margin-top:35px}
  .tc-panel{grid-template-columns:minmax(0,1fr) 280px;padding:26px;gap:0 26px}
  .tc-choice-copy strong{font-size:24px}.tc-choice-copy>span{font-size:15px}.tc-image{height:145px}
  .tc-choice-copy{padding:22px 42px 22px 18px}.tc-indicator{right:14px}
  .tc-service strong{font-size:17px}.tc-service>span{font-size:15px}.tc-price{font-size:20px}.tc-price-individual{font-size:15px}
  .tc-aside{padding:25px 20px}.tc-aside h3{font-size:28px}.tc-consult{padding:15px;font-size:15px}
}
@media(max-width:700px){
  .treatment-cost{padding-bottom:55px;font-size:16px}.tc-inner{width:calc(100% - 32px)}
  .tc-heading{display:block;margin-bottom:24px}.tc-eyebrow{font-size:11px;letter-spacing:.8px;margin-bottom:14px}
  .tc-heading h2{font-size:34px;line-height:1.1}.tc-desktop-break{display:none}.tc-intro{font-size:18px;line-height:1.6;margin-top:16px}
  .tc-price-link{margin-top:17px;font-size:16px;gap:9px}.tc-options{display:block}.tc-option{display:block;margin-bottom:15px}
  .tc-choice{display:flex;align-items:center;min-height:112px;border-radius:12px}.tc-image{width:94px;flex:0 0 94px;height:auto;min-height:112px;align-self:stretch}
  .tc-choice-copy{padding:18px 35px 18px 14px;gap:7px}.tc-choice-copy strong{font-size:23px;line-height:1.1}.tc-choice-copy>span{font-size:14px;line-height:1.5}
  .tc-indicator{right:10px;bottom:calc(50% - 11px);width:22px;height:22px}.is-selected .tc-choice{border-radius:12px 12px 0 0;box-shadow:none}
  .tc-panel{display:block;margin:0;padding:24px 18px;border-top:0;border-radius:0 0 12px 12px;border-color:#a5dfe4}
  .tc-services h3{font-size:26px;line-height:1.15;margin-bottom:23px}.tc-services li{display:grid;grid-template-columns:18px minmax(0,1fr);gap:8px 8px;padding:20px 0}
  .tc-step{grid-row:1/3;font-size:13px}.tc-service strong{font-size:17px;line-height:1.5}.tc-service>span{font-size:15px;line-height:1.6}
  .tc-price{grid-column:2;margin:0;padding:0;font-size:22px;justify-self:start}.tc-price-individual{font-size:16px;text-align:left;max-width:none}
  .tc-table-label{font-size:13px;gap:12px}.tc-case-note{font-size:14px;line-height:1.6}
  .tc-aside{margin-top:25px;padding:24px 20px}.tc-plan-icon{display:none}.tc-aside h3{font-size:28px}.tc-aside h3 br{display:none}
  .tc-aside p{font-size:16px;margin:15px 0 22px}.tc-consult{padding:16px;font-size:15px}.tc-consult-price{font-size:13px}
  .tc-additional{margin-top:24px}.tc-additional summary{font-size:16px;line-height:1.5}.tc-additional p{font-size:15px}.tc-disclaimer{font-size:13px}
}
@media(prefers-reduced-motion:reduce){.tc-choice{transition:none}}
`;
fs.writeFileSync(file,css);
