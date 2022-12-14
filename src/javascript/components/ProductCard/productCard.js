import Component from '../../core/Component.js';
import { ProductImage, ProductName, ProductPrice, ProductLikeButton } from '../Product/index.js';

class ProductCard extends Component {
    render() {
        const product = document.createElement('a');
        product.setAttribute('href', `/detail/${this.props.item.id}`);
        product.setAttribute('class', 'product-item');

        const productImage = new ProductImage({ src: this.props.item.thumbnailImg });
        const productName = new ProductName({ name: this.props.item.productName }); //객체 형태로 전달
        const productPrice = new ProductPrice({
            price: this.props.item.price,
            discountRate: this.props.item.discountRate,
        });
        const productLikeButton = new ProductLikeButton({ productId: this.props.item.id });

        product.appendChild(productImage.render());
        product.appendChild(productName.render());
        product.appendChild(productPrice.render());
        product.appendChild(productLikeButton.initialize());

        return product;
    }
}

export default ProductCard;
