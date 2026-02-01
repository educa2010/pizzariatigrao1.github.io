let carrinho=[], atual="", preco=0;

function menu(){nav.classList.toggle("active")}

function go(p){
  document.querySelectorAll(".page").forEach(e=>e.classList.remove("active"));
  document.getElementById(p).classList.add("active");
  nav.classList.remove("active");
  render();
}

function proxima(p){go(p)}

function pizza(n,v){
  atual=n;
  preco=v;
  pname.innerText=n+" - R$"+v.toFixed(2);
  modal.classList.add("active");
}

function confirm(){
  let detalhe=[];
  let valorFinal = preco;

  if(borda.value !== "Sem borda"){
    valorFinal += 12;
    detalhe.push(borda.value);
  }

  if(peda.value === "4 pedaços"){
    valorFinal = valorFinal * 0.7;
    detalhe.push("4 pedaços");
  } else {
    detalhe.push("8 pedaços");
  }

  carrinho.push({nome:atual,detalhe,preco:Number(valorFinal.toFixed(2))});
  modal.classList.remove("active");
  update();
}

function add(n,v){
  carrinho.push({nome:n,detalhe:[],preco:v});
  update();
}

function update(){
  count.innerText=carrinho.length;
  const c=document.querySelector(".cart");
  c.classList.add("added");
  setTimeout(()=>c.classList.remove("added"),400);
  render();
}

function render(){
  lista.innerHTML = carrinho.length
    ? carrinho.map((i,idx)=>`
      <div class="item">
        <span>${i.nome}</span>
        ${i.detalhe.length? `<span class="detail">${i.detalhe.join(" | ")}</span>`:""}
        <span class="price">R$${i.preco}</span>
        <button onclick="rem(${idx})">X</button>
      </div>
    `).join("")
    : "<p>Carrinho vazio 🍕</p>";

  let soma = carrinho.reduce((a,b)=>a+(b.preco||0),0);
  total.innerText = "Total: R$"+soma.toFixed(2);
}

function rem(i){
  carrinho.splice(i,1);
  update();
}

function finalizar(){
  let msg="🧾 Pedido Tigrão Pizza:%0A"+
    carrinho.map(i=>`${i.nome} ${i.detalhe.length? '| '+i.detalhe.join(" | "):''} - R$${i.preco}`).join("%0A")+
    "%0A*Total: R$"+carrinho.reduce((a,b)=>a+(b.preco||0),0).toFixed(2)+"*";
  window.open("https://wa.me/5516993699410?text="+msg);
}
