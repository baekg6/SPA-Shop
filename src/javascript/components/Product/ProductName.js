import Component from "../../core/Component.js";

class ProductName extends Component {
    // 컴포넌트와 구조가 같으면 constructor 생략 가능
    render() {
        const productName = document.createElement("strong");
        productName.setAttribute("class", "product-name");
        productName.innerText = this.props.name;
        return productName;
    }
}

export default ProductName;
