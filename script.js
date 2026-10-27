'use strict';
const dishes=[
 {name:'Poisson braisé',cat:'Grillades',desc:'Suggestion illustrative avec accompagnement.',img:'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80'},
 {name:'Riz parfumé',cat:'Plats',desc:'Une inspiration gourmande aux saveurs généreuses.',img:'https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80'},
 {name:'Poulet grillé',cat:'Grillades',desc:'Une idée de plat convivial à partager.',img:'https://images.unsplash.com/photo-1532550907401-a500c9a57435?auto=format&fit=crop&w=800&q=80'},
 {name:'Bananes plantain',cat:'Accompagnements',desc:'Accompagnement traditionnel, présenté à titre d’exemple.',img:'https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80'},
 {name:'Assiette découverte',cat:'Plats',desc:'Composition gourmande fictive pour illustrer la carte.',img:'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80'},
 {name:'Légumes sautés',cat:'Accompagnements',desc:'Une proposition colorée et généreuse.',img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80'}
];
const gallery=[
 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=900&q=80',
 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=900&q=80'
];
const reviews=[
 {author:'Promesse Phs',text:'Excellent restaurant. Le lieu est idéal et très chic. La cuisine est savoureuse, le service impeccable et l’ambiance agréable. Je recommande vivement.'},
 {author:'Sidi MASSIM-OUALI',text:'C’est un lieu coquet, j’ai aimé. Ils ont tenté de ramener la nature en ville avec le style déco. Félicitations à son promoteur. En plus c’est relaxant. Je recommande ce lieu pour des gens qui ont besoin d’écouter de la bonne mélodie sans trop de bruit.'},
 {author:'Gbigbogodo Aubin',text:'Un confort inoubliable, un accueil chaleureux et formidable... C’est juste un paradis sur terre. Je vous conseille vivement ce resto.'}
];
const menuGrid=document.querySelector('#menuGrid');
function renderDishes(filter='Tous'){
 menuGrid.replaceChildren();
 dishes.filter(d=>filter==='Tous'||d.cat===filter).forEach(d=>{
  const card=document.createElement('article');card.className='dish';
  const imageBox=document.createElement('div');imageBox.className='dish-img';
  const img=document.createElement('img');img.src=d.img;img.alt='Illustration : '+d.name;img.loading='lazy';imageBox.append(img);
  const body=document.createElement('div');body.className='dish-content';
  const small=document.createElement('small');small.textContent=d.cat+' · Exemple';
  const title=document.createElement('h3');title.textContent=d.name;
  const desc=document.createElement('p');desc.textContent=d.desc;
  body.append(small,title,desc);card.append(imageBox,body);menuGrid.append(card);
 });
}
renderDishes();
document.querySelectorAll('.filter').forEach(button=>button.addEventListener('click',()=>{document.querySelectorAll('.filter').forEach(b=>{b.classList.remove('active');b.setAttribute('aria-pressed','false')});button.classList.add('active');button.setAttribute('aria-pressed','true');renderDishes(button.dataset.filter)}));
const galleryGrid=document.querySelector('#galleryGrid'),lightbox=document.querySelector('#lightbox');
gallery.forEach((src,i)=>{const button=document.createElement('button');button.className='gallery-item';button.setAttribute('aria-label','Agrandir la photographie illustrative '+(i+1));const img=document.createElement('img');img.src=src;img.alt='Ambiance illustrative du restaurant '+(i+1);img.loading='lazy';button.append(img);button.addEventListener('click',()=>{document.querySelector('#lightboxImg').src=src;lightbox.showModal()});galleryGrid.append(button)});
document.querySelector('#closeLightbox').addEventListener('click',()=>lightbox.close());lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.close()});
let reviewIndex=0;function renderReview(){const r=reviews[reviewIndex];document.querySelector('#reviewText').textContent='“'+r.text+'”';document.querySelector('#reviewAuthor').textContent='— '+r.author;document.querySelector('#reviewCounter').textContent=(reviewIndex+1)+' / '+reviews.length}renderReview();
document.querySelector('#prevReview').addEventListener('click',()=>{reviewIndex=(reviewIndex+reviews.length-1)%reviews.length;renderReview()});document.querySelector('#nextReview').addEventListener('click',()=>{reviewIndex=(reviewIndex+1)%reviews.length;renderReview()});
const toggle=document.querySelector('#menuToggle'),nav=document.querySelector('#nav');toggle.addEventListener('click',()=>{const open=nav.classList.toggle('open');toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Fermer le menu':'Ouvrir le menu');toggle.textContent=open?'×':'☰'});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');toggle.textContent='☰'}));
const dateInput=document.querySelector('#bookingDate');const today=new Date();const localToday=[today.getFullYear(),String(today.getMonth()+1).padStart(2,'0'),String(today.getDate()).padStart(2,'0')].join('-');dateInput.min=localToday;
document.querySelector('#bookingForm').addEventListener('submit',event=>{event.preventDefault();const form=event.currentTarget;if(!form.reportValidity())return;const data=new FormData(form);const result=document.querySelector('#bookingResult');if(data.get('date')<localToday){result.textContent='Veuillez choisir une date future.';return}result.textContent='Récapitulatif de démonstration\nNom : '+data.get('name')+'\nDate : '+data.get('date')+' à '+data.get('time')+'\nPersonnes : '+data.get('guests')+'\nAucune réservation réelle n’a été envoyée au restaurant.'});
const progress=document.querySelector('#progress');let scrollScheduled=false;function updateProgress(){const max=document.documentElement.scrollHeight-innerHeight;progress.style.width=(max>0?Math.min(100,scrollY/max*100):0)+'%';scrollScheduled=false}window.addEventListener('scroll',()=>{if(!scrollScheduled){requestAnimationFrame(updateProgress);scrollScheduled=true}},{passive:true});updateProgress();
if('IntersectionObserver' in window){const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target)}})},{threshold:.1});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el))}else document.querySelectorAll('.reveal').forEach(el=>el.classList.add('visible'));
document.querySelector('#year').textContent=new Date().getFullYear();
