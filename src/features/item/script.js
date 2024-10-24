class NikeHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("nike-header");
    const clone = template.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("nike-header", NikeHeader);

class NikeFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    const template = document.getElementById("nike-footer");
    const clone = template.content.cloneNode(true);
    this.shadowRoot.appendChild(clone);
  }
}

customElements.define("nike-footer", NikeFooter);

// document.querySelectorAll('details').forEach(details => {
// 	const summary = details.querySelector('summary')
// 	const summaryContent = details.querySelector('.summaryContent')

// 	summary.addEventListener('click', function (event) {
// 		event.preventDefault()

// 		if (details.open) {
// 			// 닫힐 때 애니메이션 적용
// 			const contentHeight = summaryContent.scrollHeight
// 			details.style.transition = 'none'
// 			details.style.maxHeight = contentHeight + 'px'

// 			// 리플로우 강제 발생
// 			requestAnimationFrame(() => {
// 				details.style.transition = 'max-height 200ms ease-in-out'
// 				details.style.maxHeight = '95px'
// 			})

// 			// 애니메이션이 끝난 후에 open 속성 제거
// 			setTimeout(() => {
// 				details.removeAttribute('open')
// 				details.style.maxHeight = ''
// 			}, 200)
// 		} else {
// 			// 열릴 때 애니메이션 적용
// 			details.setAttribute('open', '')
// 			const contentHeight = summaryContent.scrollHeight
// 			details.style.transition = 'none'
// 			details.style.maxHeight = '95px'

// 			requestAnimationFrame(() => {
// 				details.style.transition = 'max-height 200ms ease-in-out'
// 				details.style.maxHeight = contentHeight + 'px'
// 			})

// 			// 애니메이션 완료 후 max-height 초기화
// 			setTimeout(() => {
// 				details.style.maxHeight = '100vh'
// 			}, 200)
// 		}
// 	})
// })


// 제품 상세 정보 보기 페이지 토글 용
 function showModal() {
	document.getElementById('background').classList.add('show-background');
	document.getElementById('productDetail').classList.add('show-modal');
}

function hideModal() {
	document.getElementById('background').classList.remove('show-background');
	document.getElementById('productDetail').classList.remove('show-modal');
}