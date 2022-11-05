class ProductLikeButton {
    constructor(id) {
        this.productId = id;
        this.like = this.clickedLikeList();
        console.log(this.like);
    }

    clickedLikeList() {
        if (!localStorage.getItem("likeList")) {
            localStorage.setItem("likeList", JSON.stringify([]));
        }
        const likeList = JSON.parse(localStorage.getItem("likeList"));
        return likeList.includes(this.productId);
    }

    addClickEvent(likeButton) {
        likeButton.addEventListener("click", (e) => {
            e.preventDefault(); //HTML 기본동작 방지(새로고침 등)
            e.stopPropagation(); //버블링 중단
            const likeList = JSON.parse(localStorage.getItem("likeList"));
            if (this.like) {
                localStorage.setItem("likeList", JSON.stringify(likeList.filter((id) => id !== this.productId)));
                likeButton.classList.remove("on");
                this.like = false;
            } else {
                localStorage.setItem("likeList", JSON.stringify([...likeList, this.productId]));
                likeButton.classList.add("class", "on");
                this.like = true;
            }
        });
    }

    render() {
        const likeButton = document.createElement("button");
        likeButton.setAttribute("class", "like-btn");
        this.like && likeButton.classList.add("on");

        const likeButtonIr = document.createElement("span");
        likeButtonIr.setAttribute("class", "ir");
        likeButtonIr.textContent = "좋아요 버튼";

        this.addClickEvent(likeButton);

        likeButton.appendChild(likeButtonIr);
        return likeButton;
    }
}

export default ProductLikeButton;
