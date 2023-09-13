document.addEventListener("DOMContentLoaded", function() {
    let isEnglish = true;

    // Toggle text function without Markdown
    const toggleTextWithoutMarkdown = (selector, attrEng, attrKor) => {
        document.querySelectorAll(selector).forEach(el => {
            el.innerHTML = isEnglish ? el.getAttribute(attrEng) : el.getAttribute(attrKor);
        });
    };

    // Toggle text function with Markdown
    const toggleTextWithMarkdown = (selector, attrEng, attrKor) => {
        document.querySelectorAll(selector).forEach(el => {
            const text = isEnglish ? el.getAttribute(attrEng) : el.getAttribute(attrKor);
            el.innerHTML = marked.marked(text);
        });
    };

    // 여기에 초기에 한 번 실행할 로직을 추가
    const initMarkdown = () => {
        // 예를 들어, #introduction 항목을 처리
        const el = document.getElementById('introduction');
        const text = el.getAttribute('data-eng'); // 또는 현재 언어에 맞는 속성을 선택
        el.innerHTML = marked.marked(text);
    };

    // 학교 정보 토글 함수 추가
    const toggleSchoolDescription = () => {
        const schoolItems = document.querySelectorAll('.school-item');
        schoolItems.forEach(item => {
            const toggleIcon = item.querySelector('.toggle-icon');
            const description = item.querySelector('.school-description');
            
            toggleIcon.addEventListener('click', function() {
                if (description.style.display === 'none' || description.style.display === '') {
                    description.style.display = 'block';
                    toggleIcon.classList.add('rotated');
                } else {
                    description.style.display = 'none';
                    toggleIcon.classList.remove('rotated');
                }
                
                const text = isEnglish ? description.getAttribute('data-eng') : description.getAttribute('data-kor');
                description.innerHTML = text;  // 필요하면 여기에 marked.marked(text)를 사용
            });
        });
    };

    // 초기 실행 함수에 추가
    const initMarkdownAndToggle = () => {
        initMarkdown();
        toggleSchoolDescription();  // 이 함수를 호출해서 학교 정보 토글 기능을 초기화
    };

    // 초기 실행
    initMarkdownAndToggle();
    
    // Initial toggle status
    document.getElementById('labelLanguage').textContent = isEnglish ? 'English' : '한글';

    // Toggle event listener
    document.getElementById('languageSwitch').addEventListener('change', function() {
        isEnglish = !isEnglish;
        document.getElementById('labelLanguage').textContent = isEnglish ? 'English' : '한글';

        // Toggle text for all elements without Markdown
        toggleTextWithoutMarkdown('#fullName', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#jobTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#address', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#educationTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#educationList li', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#skillTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#skillList li', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#careerTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#careerList .career-item h3', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#careerList .project-item h4', 'data-eng', 'data-kor');

        // Toggle text for Markdown elements
        toggleTextWithMarkdown('#introduction', 'data-eng', 'data-kor');
        toggleSchoolDescription();
    });
});
