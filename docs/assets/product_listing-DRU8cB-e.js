import{r as c,b as o}from"./utils-DJxqsy3g.js";function n(t){return`
    <li class="product-card">
      <a href="/product_pages/product.html?product=${t.Id}">
        <img src="${t.Images.PrimaryMedium}" alt="${t.Name}">
        <h3>${t.Brand.Name}</h3>
        <p>${t.NameWithoutBrand}</p>
        <p class="product-card__price">$${t.FinalPrice}</p>
      </a>
    </li>
    `}class l{constructor(e,i,s){this.category=e,this.dataSource=i,this.listElement=s}async init(){const e=await this.dataSource.getData(this.category);this.renderList(e),document.querySelector(".title").textContent=this.category}renderList(e){c(n,this.listElement,e)}}const r=o("category")||"tents",d=document.querySelector(".product-list"),m=new l(r,d);m.init();const a=document.querySelector("#category-title");a&&(a.textContent=r.charAt(0).toUpperCase()+r.slice(1));
