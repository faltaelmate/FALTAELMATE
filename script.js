function toggleMenu(){
  document.getElementById('mainNav').classList.toggle('open');
}
function toggleSearch(){
  const box=document.getElementById('searchBox');
  box.style.display = box.style.display==='block' ? 'none' : 'block';
  if(box.style.display==='block') document.getElementById('searchInput').focus();
  else hideSearchResults();
}
function filterProducts(){
  const q=document.getElementById('searchInput').value.toLowerCase().trim();
  document.querySelectorAll('.product-card').forEach(card=>{
    card.style.display = !q || card.dataset.name.includes(q) ? '' : 'none';
  });
}

// Catálogo completo de productos para el buscador
const SEARCH_CATALOG = [
  { id:'camionero', name:'CAMIONERO DE ALPACA CINCELADO CON REFUERZO DE ALPACA Y BOLITAS DE BRONCE', category:'Cerámica tradicional', page:'mate-detalle.html' },
  { id:'torpedo-imperial', name:'IMPERIAL DE ALPACA CINCELADO CON REFUERZO DE ALPACA Y BOLITAS DE BRONCE TALLADO', category:'Madera de guayubira', page:'mate-detalle.html' },
  { id:'calabaza-poro', name:'TORPEDO DE ALPACA CINCELADO CON ARO DE BRONCE Y REFUERZO DE ALPACA CON BOLITAS DE BRONCE', category:'Calabaza natural', page:'mate-detalle.html' },
  { id:'acero-inoxidable', name:'Mate Acero Inoxidable', category:'Acero inoxidable premium', page:'mate-detalle.html' },
  { id:'algarrobo', name:'Mate Algarrobo', category:'Madera de algarrobo', page:'mate-detalle.html' },
  { id:'ceramica-pintado', name:'CAMIONERO DE ALPACA CINCELADO Y TALLADO', category:'Diseño artesanal', page:'mate-detalle.html' },
  { id:'doble-pared-termico', name:'TORPEDO DE ALPACA CINCELADO CON ARO DE BRONCE', category:'Acero doble pared', page:'mate-detalle.html' },
  { id:'vidrio', name:'Mate de Vidrio', category:'Vidrio templado', page:'mate-detalle.html' },
  { id:'imperial-repujado', name:'IMPERIAL DE ALPACA CINCELADA CON REFUERZO DE ALPACA Y BOLITAS DE BRONCE', category:'Alpaca repujada', page:'mate-detalle.html' },
  { id:'cuero-patagonico', name:'Mate Cuero Patagónico', category:'Revestido en cuero', page:'mate-detalle.html' },
  { id:'mini-viajero', name:'Mate Mini Viajero', category:'Tamaño mini', page:'mate-detalle.html' },
  { id:'porcelana-blanca', name:'Mate Porcelana Blanca', category:'Porcelana fina', page:'mate-detalle.html' },
  { id:'clasica-plateada', name:'Bombilla Clásica Plateada', category:'Acero inoxidable 100%', page:'bombilla-detalle.html' },
  { id:'dorada-premium', name:'Bombilla Dorada Premium', category:'Con acabado dorado', page:'bombilla-detalle.html' },
  { id:'desarmable', name:'Bombilla Desarmable', category:'Sistema desmontable', page:'bombilla-detalle.html' },
  { id:'corta-ergonomica', name:'Bombilla Corta Ergonómica', category:'Tamaño compacto', page:'bombilla-detalle.html' },
  { id:'larga-deluxe', name:'Bombilla Larga Deluxe', category:'Edición premium', page:'bombilla-detalle.html' },
  { id:'clasica-mate', name:'Bombilla Clásica Mate', category:'Acabado mate', page:'bombilla-detalle.html' },
  { id:'profesional', name:'Bombilla Profesional', category:'Para usuarios exigentes', page:'bombilla-detalle.html' },
  { id:'edicion-limitada', name:'Bombilla Edición Limitada', category:'Colección especial', page:'bombilla-detalle.html' },
  { id:'clasico-1l', name:'Termo Clásico 1L', category:'Acero inoxidable', page:'termo-detalle.html' },
  { id:'termico-750', name:'Termo Térmico 750ml', category:'Doble pared', page:'termo-detalle.html' },
  { id:'pico-cebador', name:'Termo Pico Cebador', category:'Pico especial para mate', page:'termo-detalle.html' },
  { id:'cuero-reforzado', name:'Termo Cuero Reforzado', category:'Funda de cuero', page:'termo-detalle.html' },
  { id:'compacto-500', name:'Termo Compacto 500ml', category:'Tamaño viaje', page:'termo-detalle.html' },
  { id:'deportivo', name:'Termo Deportivo', category:'Antigolpes', page:'termo-detalle.html' },
  { id:'acero-mate-negro', name:'Termo Acero Mate Negro', category:'Acabado mate', page:'termo-detalle.html' },
  { id:'premium-1-2l', name:'Termo Premium 1.2L', category:'Mayor capacidad', page:'termo-detalle.html' },
  { id:'iniciacion', name:'Combo Iniciación', category:'Mate + Bombilla', page:'combo-detalle.html' },
  { id:'clasico', name:'Combo Clásico', category:'Mate + Bombilla + Yerbera', page:'combo-detalle.html' },
  { id:'viajero', name:'Combo Viajero', category:'Mate + Bombilla + Termo compacto', page:'combo-detalle.html' },
  { id:'premium', name:'Combo Premium', category:'Mate + Bombilla + Termo 1L', page:'combo-detalle.html' },
  { id:'regalo', name:'Combo Regalo', category:'Mate + Bombilla + caja', page:'combo-detalle.html' },
  { id:'oficina', name:'Combo Oficina', category:'Mate + Bombilla + Termo', page:'combo-detalle.html' },
  { id:'familiar', name:'Combo Familiar', category:'2 Mates + 2 Bombillas + Termo', page:'combo-detalle.html' },
  { id:'deluxe', name:'Combo Deluxe', category:'Edición premium completa', page:'combo-detalle.html' }
];

function matchProducts(query){
  const q = query.toLowerCase().trim();
  if(!q) return [];
  return SEARCH_CATALOG.filter(p =>
    p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)
  ).slice(0, 8);
}

function goToProduct(page, id){
  window.location.href = page + '?id=' + id;
}

function hideSearchResults(){
  const results = document.getElementById('searchResults');
  if(results){ results.style.display = 'none'; results.innerHTML = ''; }
}

function handleSearchInput(){
  const input = document.getElementById('searchInput');
  const results = document.getElementById('searchResults');
  if(!input || !results) return;
  const matches = matchProducts(input.value);

  if(matches.length === 0){
    hideSearchResults();
    return;
  }

  results.innerHTML = matches.map(p =>
    `<div class="search-result-item" onclick="goToProduct('${p.page}','${p.id}')">
      <span class="search-result-name">${p.name}</span>
      <span class="search-result-category">${p.category}</span>
    </div>`
  ).join('');
  results.style.display = 'block';
}

function handleSearchKeydown(event){
  if(event.key === 'Enter'){
    const input = document.getElementById('searchInput');
    const matches = matchProducts(input.value);
    if(matches.length > 0){
      goToProduct(matches[0].page, matches[0].id);
    }
  }
}

document.getElementById('year').textContent = new Date().getFullYear();
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>document.getElementById('mainNav').classList.remove('open')));

document.querySelectorAll('.model-card').forEach(card => {
  const buyLink = card.querySelector('.model-btn');
  if(!buyLink) return;

  const detailUrl = buyLink.getAttribute('href');
  const productId = new URL(detailUrl, window.location.href).searchParams.get('id');
  if(!productId) return;

  card.setAttribute('role', 'link');
  card.setAttribute('tabindex', '0');
  card.addEventListener('click', event => {
    if(event.target.closest('a, button')) return;
    window.location.href = detailUrl;
  });
  card.addEventListener('keydown', event => {
    if((event.key === 'Enter' || event.key === ' ') && !event.target.closest('a, button')) {
      event.preventDefault();
      window.location.href = detailUrl;
    }
  });

  buyLink.href = `checkout.html?product=${encodeURIComponent(productId)}&quantity=1`;
});
