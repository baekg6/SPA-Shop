import { ProductItem } from "../components/Product/index.js";

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
        const productList = this.mainElement.querySelector(".product-list");
        this.product.forEach((item) => {
            const productItem = new ProductItem(item);
            productList.append(productItem.render());
        });
        console.log(this.mainElement);
    }

    render() {
        // render에서 출력을 진행하지 않을 예정

        // const container = document.createElement("div");
        // const element = document.createElement("h1");
        // element.innerText = "상품목록 페이지입니다.";

        // const anchor1 = document.createElement("a");
        // anchor1.href = "/detail/1";
        // anchor1.innerText = "1 상세페이지로 이동";

        // container.appendChild(anchor1);

        // const anchor2 = document.createElement("a");
        // anchor2.href = "/detail/2";
        // anchor2.innerText = "2 상세페이지로 이동";

        // container.appendChild(anchor2);

        // const anchor3 = document.createElement("a");
        // anchor3.href = "/detail/3";
        // anchor3.innerText = "3 상세페이지로 이동";

        // container.appendChild(anchor3);

        // container.appendChild(element);

        this.setProductList();
        return this.mainElement;
    }
}

export default ProductPage;
