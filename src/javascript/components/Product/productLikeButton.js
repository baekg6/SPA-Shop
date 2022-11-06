class ProductLikeButton {
    constructor(id) {
        this.productId = id;
        this.like = this.checkLikeList();
        console.log(this.like, this.productId);
    }

    checkLikeList() {
        if (!localStorage.getItem("likeList")) {
            localStorage.setItem("likeList", JSON.stringify([]));
        }
        const likeList = JSON.parse(localStorage.getItem("likeList"));
        return likeList.includes(this.productId);
    }

    // 클릭하면 좋아요 목록에 추가
    // 추가되어 있다면 "on"클래스를 버튼에 추가
    // 로컬 스토리지를 이용하여 클라이언트에서 저장
    addClickEvent(likeButton) {
        likeButton.addEventListener("click", (e) => {
            e.preventDefault(); //HTML 기본동작 방지(새로고침 등)
            e.stopPropagation(); //버블링 중단

            const likeList = JSON.parse(localStorage.getItem("likeList"));
            this.like = !this.like;
            // 범
            this.like && likeList.push(this.productId);
            const newLikeList = this.like ? likeList : likeList.filter((id) => id != this.productId);
            localStorage.setItem("likeList", JSON.stringify(newLikeList));

            this.like ? e.target.classList.add("on") : e.target.classList.remove("on");
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
