(()=>{
const trigger=document.querySelector('[data-guarantee-consultation]');if(!trigger)return;
const dialog=document.createElement('dialog');dialog.className='guarantee-consultation';dialog.setAttribute('aria-labelledby','guarantee-consultation-title');
dialog.innerHTML=`<button class="gc-close" type="button" aria-label="Закрыть форму">×</button><h2 id="guarantee-consultation-title">Запись на консультацию</h2><p>Обсудите с врачом условия гарантии и ваш план лечения.</p><form><label>Ваше имя<input name="name" autocomplete="given-name" placeholder="Как к вам обращаться" required></label><label>Телефон<input name="phone" type="tel" autocomplete="tel" placeholder="+7 (___) ___-__-__" required></label><label class="gc-consent"><input type="checkbox" required><span>Я согласен с <a href="https://www.mc-podmoskovie.ru/policy/" target="_blank" rel="noopener">политикой обработки персональных данных</a></span></label><button class="gc-submit" type="submit">Записаться на консультацию</button><p class="gc-demo" role="status">Демонстрационная форма. Данные не отправляются.</p></form>`;
document.body.append(dialog);
trigger.addEventListener('click',()=>dialog.showModal());
dialog.querySelector('.gc-close').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});
dialog.querySelector('form').addEventListener('submit',e=>{e.preventDefault();dialog.querySelector('.gc-demo').textContent='Это локальный макет. Заявка не отправлена.'});
})();
