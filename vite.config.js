import { defineConfig } from 'vite'

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                index: 'index.html', // 기본 index.html
                login: 'src/login/login.html', // 추가 HTML 파일
                signup: 'src/signup/signup.html', // 추가 HTML 파일
                product_detail: 'src/productDetail/productDetail.html', // 추가 HTML 파일
                item_list: 'src/ItemList/itemList.html',
                cart: 'src/cart/prdBasket.html'
                // 필요한 다른 HTML 파일을 여기에 추가
            }
        }
    }
})
