// 라디오 버튼 클릭 이벤트 처리
document.querySelectorAll('.custom-radio input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', function () {
        if (this.checked) {
            console.log('Radio button checked:', this.value);
        }
    });
});