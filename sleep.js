// Sleep 함수 정의 (ms 단위로 지연)
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  
  // 사용 예시
  async function demo() {
    console.log("Start");
    
    // 2초 잠들기
    await sleep(2000);
    
    console.log("End after 2 seconds");
  }
  
  demo();