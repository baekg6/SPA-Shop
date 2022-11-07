import { ProductCard } from "../components/ProductCard/index.js";

class ProductPage {
    constructor() {
        this.mainElement = document.createElement("main");
        this.product = {};
    }

    // 전체 상품 가져오기
    async getProductData() {
        const response = await fetch("https://test.api.weniv.co.kr/mall");
        const data = await response.json();

        this.product = await data;
    }

    // 상품 리스트 세팅하기
    async setProductList() {
        await this.getProductData();
        console.log(this.product);

        // 이곳에서 출력을 진행
        this.mainElement.classList.add("product");
        // 다른 곳에서 메소드를 이용하여 mainElement에 작업을 하면 안된다.
        // 바닐라JS이기 때문에 이런방식으로 작업, 리액트에서는 익스텐션으로 emmet을 쓸 수 있다.
        this.mainElement.innerHTML = `
            <h1 class="ir">상품목록 페이지</h1>
            <ul class="product-list"></ul>
        `;
        const productPageHeader = document.createElement("h1");
        productPageHeader.setAttribute("class", "ir");
        productPageHeader.innerText = "상품목록 페이지";
        this.mainElement.appendChild(productPageHeader);

        const productList = document.createElement("ul");
        productList.setAttribute("class", "product-list");
        this.mainElement.appendChild(productList);

        // 컴포넌트 분리
        this.product.forEach((item) => {
            const productItem = document.createElement("li");
            productItem.setAttribute("class", "product-item");
            const productCard = new ProductCard(item);
            productItem.appendChild(productCard.render());
            productList.appendChild(productItem);
        });
        this.mainElement.append(productList);
    }

    render() {
        this.setProductList();
        return this.mainElement;
    }
}

export default ProductPage;
