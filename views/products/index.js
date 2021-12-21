module.exports=({products})=>{
  const renderProdcuts=products.map(product=>{
      return `
       <li>${product.title} - ${product.price}</li>
      
      
       `;
  }).join('');  //join all array of strings together to one single big string

  return `
  <ul>${renderProdcuts}</ul>
  `;
}