let dataCategories = [];
let dataProducts = [];

const apiCategories = async () => {
  await fetch("./data/categories.json")
    .then((resp) => resp.json())
    .then((json) => dataCategories.push(...json.categories));
  initCategories();
};

const apiProducts = async () => {
  await fetch("./data/products.json")
    .then((resp) => resp.json())
    .then((json) => dataProducts.push(...json.products));
  initProducts();
};

apiCategories();
apiProducts();

const initCategories = () => {
  const containerCategoriesProduct = document.querySelector(
    ".categories_products"
  );

  dataCategories.map((product) => {
    let { id, image, title } = product;

    if (title.length > 8) {
      const lastSpaceIndex = title.lastIndexOf(" ", 6);

      if (lastSpaceIndex !== -1) {
        title =
          title.slice(0, lastSpaceIndex) +
          "<br/>" +
          title.slice(lastSpaceIndex + 1);
      } else {
        title = title.slice(0, 6) + "- <br/>" + title.slice(6);
      }
    }

    containerCategoriesProduct.innerHTML += `
    <div id="${id}" class="product">
        <div class="product_image">
            <img src="${image}" alt="${title}" />
        </div>
        <h5 class="product_title">${title}</h5>
    </div>
    `;
  });
};

const initProducts = async () => {
  const allProductsContainer = document.querySelector(".allProducts_slider");

  dataProducts.map((product) => {
    const { id, image, name, category, price, discounted_price } = product;

    allProductsContainer.innerHTML += `
    <a id="${id}" href="./pages/productDetail.html" class="allProducts_product">
      <div class="allProduct_image">
        <img src="${image}" alt="${name}" />
      </div>
      <div class="allProduct_detail">
        <div class="allProduct_detail--name">
          <h4>${name}</h4>
          <h5>${category}</h5>
        </div>
        <div class="allProduct_detail--price">
          <p class="price">$${price}</p>
          <p class="discount">$${discounted_price}</p>
        </div>
      </div>
      <i class="bi bi-heart"></i>
    </a>
    `;
  });
};
