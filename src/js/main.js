let qty = 1;
  let cart = [];

  function changeQty(d) {
    qty = Math.max(1, qty + d);
    document.getElementById('qtyVal').textContent = qty;
  }

  function addItem() {
    const sel = document.getElementById('itemSelect');
    if (!sel.value) { alert('Selecione um item primeiro!'); return; }
    const [name, price] = sel.value.split('|');
    const existing = cart.find(i => i.name === name);
    if (existing) { existing.qty += qty; }
    else { cart.push({ name, price: parseFloat(price), qty }); }
    qty = 1;
    document.getElementById('qtyVal').textContent = 1;
    sel.value = '';
    renderCart();
  }

  function removeItem(idx) {
    cart.splice(idx, 1);
    renderCart();
  }

  function renderCart() {
    const list = document.getElementById('cartList');
    const total = document.getElementById('cartTotal');
    const empty = document.getElementById('emptyMsg');
    list.innerHTML = '';
    if (cart.length === 0) {
      list.innerHTML = '<p class="empty-cart" id="emptyMsg">Nenhum item ainda. Adicione algo acima! 🌵</p>';
      total.style.display = 'none';
      return;
    }
    let sum = 0;
    cart.forEach((item, i) => {
      const subtotal = item.price * item.qty;
      sum += subtotal;
      const div = document.createElement('div');
      div.className = 'cart-item-line';
      div.innerHTML = `<span>${item.qty}x ${item.name}</span><span style="display:flex;align-items:center;gap:10px"><span>R$ ${subtotal.toFixed(2).replace('.',',')}</span><button onclick="removeItem(${i})" style="background:rgba(226,75,74,0.2);border:none;color:#F09595;border-radius:50%;width:20px;height:20px;cursor:pointer;font-size:0.8rem;display:flex;align-items:center;justify-content:center">×</button></span>`;
      list.appendChild(div);
    });
    total.style.display = 'block';
    total.textContent = `Total: R$ ${sum.toFixed(2).replace('.',',')}`;
  }

  function enviarPedido() {
    if (cart.length === 0) { alert('Adicione pelo menos um item ao pedido!'); return; }
    const obs = document.getElementById('obs').value.trim();
    let msg = '🌵 *Olá, Sabor do Sertão!* Gostaria de fazer um pedido:\n\n';
    cart.forEach(item => {
      msg += `• ${item.qty}x ${item.name} — R$ ${(item.price * item.qty).toFixed(2).replace('.',',')}\n`;
});
    const total = cart.reduce((s,i)=>s+(i.price*i.qty),0);
    msg += `\n💰 *Total: R$ ${total.toFixed(2).replace('.',',')}*`;
    if (obs) msg += `\n\n📝 Obs: ${obs}`;
    msg += '\n\nAguardo confirmação! 😊';
    const url = 'https://wa.me/5561982392806?text=' + encodeURIComponent(msg);
    window.open(url, '_blank');
    const toast = document.getElementById('toast');
    toast.classList.add('show');
    setTimeout(()=>toast.classList.remove('show'), 3500);
  }