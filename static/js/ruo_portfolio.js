function toggleSchoolInfo() {
    // 모든 'school-item' 클래스를 가진 요소를 가져옵니다.
    const schoolItems = document.querySelectorAll('.school-item');
  
    // 각 학교 항목에 대해 이벤트 리스너를 추가합니다.
    schoolItems.forEach((schoolItem) => {
        const toggleIcon = schoolItem.querySelector('.toggle-icon-wrapper i');
        const toggleContainer = schoolItem.querySelector('.toggle-icon-wrapper');
        const schoolDescription = schoolItem.querySelector('.school-description');
  
        // 토글 아이콘을 클릭했을 때의 이벤트
        toggleContainer.addEventListener('click', function() {
            // 정보가 표시되어 있는지 확인하고 표시 상태를 변경합니다.
            if (schoolDescription.style.display === 'none' || schoolDescription.style.display === '') {
            schoolDescription.style.display = 'block';
            
            // Font Awesome 아이콘을 변경합니다.
            toggleIcon.classList.remove('fa-chevron-right');
            toggleIcon.classList.add('fa-chevron-down');
        
            } else {
            schoolDescription.style.display = 'none';
            
            // Font Awesome 아이콘을 변경합니다.
            toggleIcon.classList.remove('fa-chevron-down');
            toggleIcon.classList.add('fa-chevron-right');
            }
        });
    });
}

  
document.addEventListener("DOMContentLoaded", function() {
    let isEnglish = true;

    // Initialize tabs
    var corporateTab = new bootstrap.Tab(document.getElementById('corporate-tab'));
    var personalTab = new bootstrap.Tab(document.getElementById('personal-tab'));


    // Toggle text function without Markdown
    const toggleTextWithoutMarkdown = (selector, attrEng, attrKor) => {
        document.querySelectorAll(selector).forEach(el => {
            if (!el.classList.contains('no-toggle')) {
                el.innerHTML = isEnglish ? el.getAttribute(attrEng) : el.getAttribute(attrKor);
            }
        });
    };

    // Toggle text function with Markdown
    const toggleTextWithMarkdown = (selector, attrEng, attrKor) => {
        document.querySelectorAll(selector).forEach(el => {
            const text = isEnglish ? el.getAttribute(attrEng) : el.getAttribute(attrKor);
            el.innerHTML = marked.marked(text);
        });
    };
    
    // Initialize tooltip globally
    document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(tooltipEl => {
        new bootstrap.Tooltip(tooltipEl);
    });
    

    // 언어가 토글될 때마다 툴팁의 title을 업데이트하는 함수
    const updateTooltipTitle = () => {
        document.querySelectorAll('[data-bs-toggle="tooltip"]').forEach(el => {
            const title = isEnglish ? el.getAttribute('data-eng') : el.getAttribute('data-kor');
            el.setAttribute('data-bs-original-title', title);
            // Dispose the existing tooltip
            var tooltipInstance = bootstrap.Tooltip.getInstance(el);
            if (tooltipInstance) {
                tooltipInstance.dispose();
            }
            // Initialize the new tooltip
            new bootstrap.Tooltip(el);
        });
    }

    // 여기에 초기에 한 번 실행할 로직을 추가
    const initMarkdown = () => {
        // 예를 들어, #introduction 항목을 처리
        const el = document.getElementById('introduction');
        const text = el.getAttribute('data-eng'); // 또는 현재 언어에 맞는 속성을 선택
        el.innerHTML = marked.marked(text);
        
        // school-description 항목을 처리
        const schoolDescriptions = document.querySelectorAll('.school-description');
        schoolDescriptions.forEach((el) => {
            const text = el.getAttribute('data-eng'); // 또는 현재 언어에 맞는 속성을 선택
            el.innerHTML = marked.marked(text);
        });
    };

    initMarkdown();

    // Initial toggle status
    document.getElementById('labelLanguage').innerHTML = isEnglish ? '<i class="fas fa-globe"></i> KOR' : '<i class="fas fa-globe"></i> ENG';

    // Toggle event listener
    document.getElementById('languageSwitch').addEventListener('change', function() {
        isEnglish = !isEnglish;
        document.getElementById('labelLanguage').innerHTML = isEnglish ? '<i class="fas fa-globe"></i> KOR' : '<i class="fas fa-globe"></i> ENG';

        // Toggle text for all elements without Markdown
        toggleTextWithoutMarkdown('#fullName', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#userTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#address', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#educationTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('.school-main-info', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#skillTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#skillType', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('.skill-name', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#careerTitle', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#corporate-tab', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#personal-tab', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#company-name-department', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#company-position', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#project-sub-type', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#project-name', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#project-summary', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#project-role-description', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#project-issue-description', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#project-link a', 'data-eng', 'data-kor');
        toggleTextWithoutMarkdown('#code-link a', 'data-eng', 'data-kor');
        

        // Toggle text for Markdown elements
        toggleTextWithMarkdown('#introduction', 'data-eng', 'data-kor');
        toggleTextWithMarkdown('#school-description', 'data-eng', 'data-kor');

        // 언어를 토글할 때 툴팁의 title도 업데이트
        updateTooltipTitle();
    });

    toggleSchoolInfo();
});
