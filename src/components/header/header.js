class NikeHeader extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}
	connectedCallback() {
		this.shadowRoot.innerHTML = `<style>
		/* css reset */
		h1,
		h2 {
			font-size: unset;
			margin: unset;
			padding: unset;
			font-weight: unset;
		}

		button {
			padding: unset;
		}

		a {
			margin: unset;
			text-decoration: none;
		}

		/* Web Design */

		.header {
			display: flex;
			max-height: 60px;
			gap: 5px;
			margin-left: 14px;
			margin-right: 24px;
		}

		.header .main-page {
			margin-right: auto;
		}

		.header--img {
			/* 헤더 로고를 제외한 나머지 이미지들 설정 */
			width: 36px;
			height: 36px;
			margin-top: auto;
			margin-bottom: auto;
		}

		.header--img:hover {
			background-color: #e5e5e5;
			border-radius: 20px;
			cursor: pointer;
		}

		.header--img.logo {
			/* 헤더 로고 이미지 설정 */
			
			width: 76px;
			height: 60px;
		}

		.header--img.logo:hover {
			background-color: #fff;
			cursor: pointer;
		}

		.header--img.menu {
			/* 메뉴 버튼에 대한 설정 */
			border: none;
			background-color: #fff;
			cursor: pointer;
		}

		.header--img.menu:hover {
			background-color: #e5e5e5;
			border-radius: 20px;
			cursor: pointer;
		}

		/* 메뉴 선택 */
		#sideMenu,
		#submenu,
		#submenu1,
		#submenu2,
		#submenu3,
		#submenu4,
		#submenu5 {
			position: fixed;
			right: -1500px;
			top: 0;
			width: 310px;
			height: 100%;
			background-color: #fff;
			color: #fff;
			padding: 20px;
			transition: right 0.6s ease-out;
			z-index: 2;
		}

		.menu-list p {
			color: black;
		}

		#sideMenu.menu-active,
		#sideMenu2.menu-active,
		#sideMenu3.menu-active,
		#sideMenu4.menu-active,
		#sideMenu5.menu-active {
			right: 0;
			/* background-color: #fff; */
		}

		/* 오버레이 스타일 */
		#overlay {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			background-color: rgba(0, 0, 0, 0);
			transition: background-color 0.5s ease;
			z-index: 1; /* 메뉴 뒤에 깔림 */
			pointer-events: none;
			opacity: 50%;
		}

		#overlay.overlay-active {
			background-color: #acacac; /* 배경을 어둡게 만듦 */
			pointer-events: auto; /* 메뉴 외부 클릭 시 가능하게 설정 */
		}

		.menu-exit {
			border: none;
			background-color: #fff;
			cursor: pointer;
			display: block;
			margin-left: auto;
		}

		/* 서브메뉴의 기본 상태는 화면 밖에 위치 */
		.submenu {
			right: -1300px;
		}

		/* 서브메뉴 활성화 시 화면 안으로 슬라이드 */
		#submenu.submenu-active,
		#submenu2.submenu-active,
		#submenu3.submenu-active,
		#submenu4.submenu-active,
		#submenu5.submenu-active {
			right: 0;
			color: black;
		}

		.menu-member {
			margin-top: 47px;
			margin-bottom: 43px;
			margin-left: 41px;
			display: flex;
			gap: 19px;
		}

		.sign-up {
			border: none;
			background-color: #111;
			cursor: pointer;
			width: 91px;
			height: 40px;
			color: #fff;
			border-radius: 30px;
			font-size: 16px;
			font-weight: 400;
		}

		.sign-up:hover {
			opacity: 40%;
		}

		.sign-in {
			appearance: none;
			border: 1px solid #cacacb;
			background-color: #fff;
			cursor: pointer;
			width: 77px;
			height: 40px;
			color: #111;
			border-radius: 30px;
			font-size: 16px;
			font-weight: 400;
		}

		.sign-in:hover {
			background-color: rgba(50, 50, 50, 0.8);
		}

		.content__button {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 260px;
			height: 36px;
			margin-left: 43px;
			font-size: 24px;
			font-weight: 400px;
			color: #111;
			border: none;
			background-color: #fff;
			margin-bottom: 24px;
			cursor: pointer;
		}

		.content__button:hover {
			opacity: 50%;
		}

		.footer__button {
			display: flex;
			align-items: center;
			border: none;
			background-color: #fff;
			width: 310px;
			height: 44px;
			font-size: 16px;
			font-weight: 400px;
			padding-left: 40px;
			color: #111;
			gap: 12px;
			cursor: pointer;
		}

		.footer__button:hover {
			opacity: 50%;
		}

		.footer__button.cart {
			/* 장바구니 아이콘의 경우 크기가 달라 별도 설정 */
			display: flex;
			align-items: center;
			border: none;
			background-color: #fff;
			width: 310px;
			height: 44px;
			font-size: 16px;
			font-weight: 400px;
			padding-left: 33px;
			color: #111;
			gap: 6px;
			cursor: pointer;
		}

		.footer__button:nth-child(1) {
			margin-top: 35px;
		}

		/* 서브 메뉴들 디자인 */
		.submenu-header {
			display: flex;
			justify-content: space-between;
			align-items: center;
		}

		.submenu-exitbutton {
			border: none;
			background-color: #fff;
			cursor: pointer;
		}

		.submenu-backbutton {
			display: flex;
			border: none;
			background-color: #fff;
			align-items: center;
			cursor: pointer;
		}

		.submenu-backbutton:hover {
			opacity: 50%;
		}

		.submenu-backbutton h2 {
			font-size: 16px;
			font-weight: 500;
			color: rgb(17, 17, 17);
			margin-left: 5px;
		}

		.submenu-content {
			margin-top: 20px;
			padding-left: 10px;
		}

		.submenu-content h1 {
			margin-top: 50px;
			margin-bottom: 50px;
			font-size: 24px;
			font-weight: 500;
			color: rgb(17, 17, 17);
		}

		.submenu-content p {
			margin-top: 20px;
			margin-bottom: 20px;
			font-size: 16px;
			font-weight: 500;
			color: rgb(112, 112, 114);
			cursor: pointer;
		}
	</style>
	<div class="header">
		<a href="../../../index.html" class="main-page">
			<img
				src="/logo/LOGO.svg"
				alt="나이키 로고"
				class="header--img logo"
			/>
		</a>
		<img
			src="/icons/menuicon/IconSearch.svg"
			alt="검색"
			class="header--img search"
		/>
		<img
			src="/icons/menuicon/IconProfile.svg"
			alt="프로필"
			class="header--img profile"
		/>
		<img
			src="/icons/menuicon/IconCart.svg"
			alt="장바구니"
			class="header--img cart"
		/>
		<button id="menuToggle" class="header--img menu">
			<img src="/icons/menuicon/IconMenu.svg" alt="메뉴" />
		</button>
		<!-- 아래부터 메뉴 내부 디자인 -->
		<div id="overlay"></div>
		<div id="sideMenu" class="menu-list">
			<div class="menu-header">
				<button class="menu-exit" id="menu-exit">
					<img
						src="/icons/exit/IconExitGray.svg"
						alt="닫기 버튼"
					/>
				</button>
				<div class="menu-member">
					<a href="./src/features/member/signup.html">
     					<button class="sign-up">가입하기</button>
    				</a>
					<a href="./src/features/member/login.html">
      					<button class="sign-in">로그인</button>
    				</a>
				</div>
			</div>
			<div class="menu-content">
				<button class="content__button new" id="newfeatured">
					<h1>New & Featured</h1>
					<img
						src="/icons/menuicon/IconNext.svg"
						alt="다음 버튼"
					/>
				</button>
				<button class="content__button men" id="man">
					<h1>Men</h1>
					<img
						src="/icons/menuicon/IconNext.svg"
						alt="다음 버튼"
					/>
				</button>
				<button class="content__button women" id="woman">
					<h1>Women</h1>
					<img
						src="/icons/menuicon/IconNext.svg"
						alt="다음 버튼"
					/>
				</button>
				<button class="content__button kid" id="kid">
					<h1>Kids</h1>
					<img
						src="/icons/menuicon/IconNext.svg"
						alt="다음 버튼"
					/>
				</button>
				<button class="content__button sale" id="sale">
					<h1>Sale</h1>
					<img
						src="/icons/menuicon/IconNext.svg"
						alt="다음 버튼"
					/>
				</button>
			</div>
			<div id="submenu" class="submenu">
				<div class="submenu-header">
					<button class="submenu-backbutton" id="backbutton">
						<img
							src="/icons/menuicon/IconBack.svg"
							alt="뒤로 가기 버튼"
						/>
						<h2>전체</h2>
					</button>
					<button class="submenu-exitbutton" id="menu-exit2">
						<img
							src="/icons/exit/IconExitGray.svg"
							alt="닫기 버튼"
						/>
					</button>
				</div>
				<div class="submenu-content">
					<h1>New & Featured</h1>
					<a href="./src/features/item/itemList.html">
    					<p>신제품 전체</p>
  					</a>
					<p>베스트 셀러</p>
					<p>ACG 아웃핏</p>
					<p>플리스</p>
					<p>가을 에센셜</p>
				</div>
			</div>
			<div id="submenu2" class="submenu">
				<div class="submenu-header">
					<button class="submenu-backbutton">
						<img
							src="/icons/menuicon/IconBack.svg"
							alt="뒤로 가기 버튼"
							id="backbutton2"
						/>
						<h2>전체</h2>
					</button>
					<button class="submenu-exitbutton" id="menu-exit3">
						<img
							src="/icons/exit/IconExitGray.svg"
							alt="닫기 버튼"
						/>
					</button>
				</div>
				<div class="submenu-content">
					<h1>Men</h1>
					<a href="./src/features/item/itemList.html">
    					<p>신제품 전체</p>
  					</a>
					<p>베스트 셀러</p>
					<p>신발 전체</p>
					<p>의류 전체</p>
					<p>KNT 컬렉션</p>
				</div>
			</div>
			<div id="submenu3" class="submenu">
				<div class="submenu-header">
					<button class="submenu-backbutton" id="backbutton3">
						<img
							src="/icons/menuicon/IconBack.svg"
							alt="뒤로 가기 버튼"
						/>
						<h2>전체</h2>
					</button>
					<button class="submenu-exitbutton" id="menu-exit4">
						<img
							src="/icons/exit/IconExitGray.svg"
							alt="닫기 버튼"
						/>
					</button>
				</div>
				<div class="submenu-content">
					<h1>Women</h1>
					<p>신제품 전체</p>
					<p>베스트 셀러</p>
					<p>신발 전체</p>
					<p>의류 전체</p>
					<p>코르테즈</p>
				</div>
			</div>
			<div id="submenu4" class="submenu">
				<div class="submenu-header">
					<button class="submenu-backbutton" id="backbutton4">
						<img
							src="/icons/menuicon/IconBack.svg"
							alt="뒤로 가기 버튼"
						/>
						<h2>전체</h2>
					</button>
					<button class="submenu-exitbutton" id="menu-exit5">
						<img
							src="/icons/exit/IconExitGray.svg"
							alt="닫기 버튼"
						/>
					</button>
				</div>
				<div class="submenu-content">
					<h1>Kids</h1>
					<p>신제품 전체</p>
					<p>베스트 셀러</p>
					<p>신발 전체</p>
					<p>베이비 (160mm이하)</p>
					<p>리틀키즈 (165-220mm)</p>
					<p>주니어 (225-250mm)</p>
					<p>의류 전체</p>
				</div>
			</div>
			<div id="submenu5" class="submenu">
				<div class="submenu-header">
					<button class="submenu-backbutton" id="backbutton5">
						<img
							src="/icons/menuicon/IconBack.svg"
							alt="뒤로 가기 버튼"
						/>
						<h2>전체</h2>
					</button>
					<button class="submenu-exitbutton" id="menu-exit6">
						<img
							src="/icons/exit/IconExitGray.svg"
							alt="닫기 버튼"
						/>
					</button>
				</div>
				<div class="submenu-content">
					<h1>Sale</h1>
					<p>All Sales</p>
					<p>Sale 신발</p>
					<p>Sale 의류</p>
					<p>Sale 용품</p>
				</div>
			</div>
			<div class="menu-footer">
				<button class="footer__button">
					<img
						src="/icons/menuicon/IconCs.svg"
						alt="고객센터 버튼"
					/>
					<h1>고객센터</h1>
				</button>
				<button class="footer__button cart">
					<img
						src="/icons/menuicon/IconCart.svg"
						alt="장바구니 버튼"
					/>
					<h1>장바구니</h1>
				</button>
				<button class="footer__button">
					<img src="/icons/menuicon/IconOrder.svg" />
					<h1>주문</h1>
				</button>
				<button class="footer__button">
					<img
						src="/icons/menuicon/IconStore.svg"
						alt="매장찾기 버튼"
					/>
					<h1>매장 찾기</h1>
				</button>
			</div>
		</div>
	</div>`
		this.menuToggle()
		this.overlay()
		this.activeSidemenu()
		this.activeSidemenu2()
		this.activeSidemenu3()
		this.activeSidemenu4()
		this.activeSidemenu5()
		this.closeMenu()
		this.backMenu()
	}

	menuToggle() {
		const menuToggle = this.shadowRoot.getElementById('menuToggle')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const overlay = this.shadowRoot.getElementById('overlay')
		menuToggle.addEventListener('click', function () {
			sideMenu.classList.add('menu-active')
			overlay.classList.add('overlay-active')
		})
	}

	overlay() {
		const submenuList = this.shadowRoot.querySelectorAll('.submenu')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const overlay = this.shadowRoot.getElementById('overlay')
		overlay.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
	}

	activeSidemenu() {
		const newfeatured = this.shadowRoot.getElementById('newfeatured')
		const submenu = this.shadowRoot.getElementById('submenu')
		newfeatured.addEventListener('click', function () {
			submenu.classList.add('submenu-active')
		})
	}

	activeSidemenu2() {
		const man = this.shadowRoot.getElementById('man')
		const submenu2 = this.shadowRoot.getElementById('submenu2')
		man.addEventListener('click', function () {
			submenu2.classList.add('submenu-active')
		})
	}

	activeSidemenu3() {
		const woman = this.shadowRoot.getElementById('woman')
		const submenu3 = this.shadowRoot.getElementById('submenu3')
		woman.addEventListener('click', function () {
			submenu3.classList.add('submenu-active')
		})
	}

	activeSidemenu4() {
		const kid = this.shadowRoot.getElementById('kid')
		const submenu4 = this.shadowRoot.getElementById('submenu4')
		kid.addEventListener('click', function () {
			submenu4.classList.add('submenu-active')
		})
	}

	activeSidemenu5() {
		const sale = this.shadowRoot.getElementById('sale')
		const submenu5 = this.shadowRoot.getElementById('submenu5')
		sale.addEventListener('click', function () {
			submenu5.classList.add('submenu-active')
		})
	}

	closeMenu() {
		const submenuList = this.shadowRoot.querySelectorAll('.submenu')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const overlay = this.shadowRoot.getElementById('overlay')
		const exit = this.shadowRoot.getElementById('menu-exit')
		const exit2 = this.shadowRoot.getElementById('menu-exit2')
		const exit3 = this.shadowRoot.getElementById('menu-exit3')
		const exit4 = this.shadowRoot.getElementById('menu-exit4')
		const exit5 = this.shadowRoot.getElementById('menu-exit5')
		const exit6 = this.shadowRoot.getElementById('menu-exit6')
		exit.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit2.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit3.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit4.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit5.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
		exit6.addEventListener('click', function () {
			sideMenu.classList.remove('menu-active')
			overlay.classList.remove('overlay-active')
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
		})
	}

	backMenu() {
		const submenuList = this.shadowRoot.querySelectorAll('.submenu')
		const sideMenu = this.shadowRoot.getElementById('sideMenu')
		const back = this.shadowRoot.getElementById('backbutton')
		const back2 = this.shadowRoot.getElementById('backbutton2')
		const back3 = this.shadowRoot.getElementById('backbutton3')
		const back4 = this.shadowRoot.getElementById('backbutton4')
		const back5 = this.shadowRoot.getElementById('backbutton5')
		back.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back2.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back3.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back4.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
		back5.addEventListener('click', function () {
			submenuList.forEach(value => {
				value.classList.remove('submenu-active')
			})
			sideMenu.classList.add('menu-active') // 메인 메뉴 다시 열기
		})
	}
}

customElements.define('nike-header', NikeHeader)
