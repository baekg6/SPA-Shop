import Component from "../../core/Component.js";

class ProductPrice extends Component {
    render() {
        const productPriceContainer = document.createElement("div");
        productPriceContainer.setAttribute("class", "product-price");

        const productPrice = document.createElement("strong");
        productPrice.setAttribute("class", "price m-price");

        const priceType = document.createElement("span");
        priceType.innerText = "원";
        productPriceContainer.appendChild(productPrice);

        if (this.discountRate > 0) {
            /*
             * 1. 할인된 금액 계산
             * 2. this.price에 할인율 계산된 금액을 입력
             * 3. 할인 관련 요소를 추가
             */

            const discountRateContainer = document.createElement("div");
            discountRateContainer.setAttribute("class", "price-discount");

            const originPrice = document.createElement("strong");
            originPrice.setAttribute("class", "price-strikethrough");
            originPrice.innerText = this.props.price;

            const discountRateDisplay = document.createElement("strong");
            discountRateDisplay.setAttribute("class", "discount-rate");
            discountRateDisplay.innerText = this.props.discountRate + "%";

            this.props.price = this.props.price - this.props.price * 0.01 * this.props.discountRate;

            discountRateContainer.appendChild(originPrice);
            originPrice.appendChild(priceType.cloneNode(true));
            discountRateContainer.appendChild(discountRateDisplay);
            productPriceContainer.appendChild(discountRateContainer);
        }

        productPrice.innerText = this.props.price;
        productPrice.appendChild(priceType);

        return productPriceContainer;
    }
}

export default ProductPrice;
