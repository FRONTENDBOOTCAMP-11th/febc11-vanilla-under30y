class NikeFooter extends HTMLElement {
	constructor() {
		super()
		this.attachShadow({ mode: 'open' })
	}
	connectedCallback() {
		this.shadowRoot.innerHTML = ` <style>
      /* Css Reset */
      a {
        text-decoration: unset;
        color: unset;
      }
  
      p {
        margin: unset;
        padding: unset;
      }
  
      /* Web Design */
      .footer-wrapper {
        margin-top: 48px;
        margin-bottom: 70px;
      }
  
      .footer-wrapper::before {
        display: block;
        content: '';
        border: solid 1px #e5e5e5;
        min-width: 312px;
        margin: auto;
        margin-left: 24px;
        margin-right: 24px;
      }
  
      .drop-box::after {
        /* 각 안내 카테고리를 구분하는 선 */
        display: block;
        content: '';
        border: solid 1px #e5e5e5;
        min-width: 312px;
        margin: auto;
      }
  
      .drop-box {
        min-width: 312px;
        margin-left: 24px;
        margin-right: 24px;
      }
  
      .drop-box .content p {
        /* p 태그만 지칭.. 유지보수성-- */
        padding-top: 10px;
      }
  
      .drop-box details {
        /* overflow: hidden; */
        /* padding-left: 10px;
          padding-right: 15px; */
        font-size: 14px;
        font-weight: 500;
        color: rgb(112, 112, 114);
      }
  
      .drop-box summary {
        list-style: none;
        cursor: pointer;
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 14px;
        font-weight: 400;
        color: #111;
      }
  
      .drop-box summary::after {
        /* 선택 시 화살표 애니메이션 */
        content: url(../../assets/icons/carticon/Down.svg);
        transition: 0.5s transform;
      }
  
      .drop-box details[open] summary::after {
        transform: rotateZ(-180deg);
      }
  
      .drop-box span {
        position: relative;
        display: flex;
        align-items: center;
        height: 4rem;
      }
  
      .drop-box div.content {
        box-sizing: border-box;
        max-height: 0;
        overflow: hidden;
        font-size: 14px;
        font-weight: 400;
        color: #707072;
        transition: max-height 500ms ease-out;
      }
  
      .drop-box div.content p:last-child {
        margin-bottom: 30px;
      }
  
      .drop-box details[open] + div.content {
        max-height: 800px;
        transition: max-height 1000ms ease-out;
      }
  
      .footer__policy {
        /* 개인정보처리방침 */
        font-size: 14px;
        font-weight: 400;
        color: #707072;
        margin-bottom: 26px;
        padding: 24px;
      }
  
      .footer__policy p {
        /* p 태그만 지칭.. 유지보수성-- */
        padding-top: 6.25px;
        padding-bottom: 7.25px;
      }
  
      .footer__policy .person {
        font-weight: bold;
      }
  
      .footer__company-info::before {
        display: block;
        content: '';
        border: solid 1px #e5e5e5;
        min-width: 312px;
        margin: auto;
      }
  
      .footer__company-info {
        padding: 24px;
        font-size: 14px;
        font-weight: 400;
        color: #707072;
        line-height: 1.75;
      }
  
      .footer__company-info a {
        text-decoration: underline;
        text-decoration-color: #707072;
      }
  
      .footer__company-info p {
        padding-top: 24px;
        padding-bottom: 47.75px;
      }
    </style>
    <div class="footer-wrapper">
      <div class="drop-box">
        <details>
          <summary>
            <span>안내</span>
          </summary>
        </details>
        <div class="content">
          <p>
            <a href="https://www.nike.com/kr/membership"> 멤버 가입</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/retail">매장 찾기</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/stories">나이키 저널</a>
          </p>
        </div>
      </div>
      <div class="drop-box">
        <details>
          <summary>
            <span>고객센터</span>
          </summary>
        </details>
        <div class="content">
          <p>
            <a href="https://www.nike.com/kr/orders/details/"> 주문배송조회</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/help/a/returns-policy">반품 정책</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/help/a/payment-options">결제 방법</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/help/a/an">공지사항</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/help/#contact">문의하기</a>
          </p>
        </div>
      </div>
      <div class="drop-box">
        <details>
          <summary>
            <span>회사소개</span>
          </summary>
        </details>
        <div class="content">
          <p>
            <a href="https://about.nike.com/en/"> About Nike</a>
          </p>
          <p>
            <a href="https://about.nike.com/en/newsroom">소식</a>
          </p>
          <p>
            <a href="https://jobs.nike.com/">채용</a>
          </p>
          <p>
            <a href="https://investors.nike.com/Home/default.aspx">투자자</a>
          </p>
          <p>
            <a href="https://www.nike.com/kr/sustainability">지속가능성</a>
          </p>
        </div>
      </div>
      <div class="footer">
        <!-- 이용 약관 및 개인정보처리방침 -->
        <div class="footer__policy">
          <p>© 2024 Nike, Inc. All Rights Reserved</p>
          <p>이용약관</p>
          <p class="person">개인정보처리방침</p>
          <p>위치정보이용약관</p>
          <p>영상정보처리기기 운영 방침</p>
        </div>
        <!-- 회사 정보 -->
        <div class="footer__company-info">
          <p>
            (유)나이키코리아 대표 Kimberlee Lynn Chang Mendes, 킴벌리 린 창 멘데스
            | 서울 강남구 테헤란로 152 강남파이낸스센터 30층 | 통신판매업신고번호
            2011-서울강남-03461 | 등록번호 220-88-09068<br />
            <a href="#">사업자 정보 확인</a><br />고객센터 전화 문의
            <a href="#">080-022-0182</a> FAX 02-6744-5880 | 이메일
            <a href="#">service@nike.co.kr</a>
            | <br />호스팅서비스사업자 (유)나이키코리아
          </p>
        </div>
      </div>
    </div>
      `
	}
}

customElements.define('nike-footer', NikeFooter)
