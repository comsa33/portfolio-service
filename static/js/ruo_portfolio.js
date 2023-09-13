document.addEventListener("DOMContentLoaded", function() {
    let isEnglish = true;

    // Toggle text function
    const toggleText = (selector, attrEng, attrKor) => {
        document.querySelectorAll(selector).forEach(el => {
            el.innerHTML = isEnglish ? el.getAttribute(attrEng) : el.getAttribute(attrKor);
        });
    };

    // Initial toggle status
    document.getElementById('labelLanguage').textContent = isEnglish ? 'English' : '한글';

    // Toggle event listener
    document.getElementById('languageSwitch').addEventListener('change', function() {
        isEnglish = !isEnglish;
        document.getElementById('labelLanguage').textContent = isEnglish ? 'English' : '한글';

        // Toggle text for all elements
        toggleText('#fullName', 'data-eng', 'data-kor');
        toggleText('#jobTitle', 'data-eng', 'data-kor');
        toggleText('#email', 'data-eng', 'data-kor');
        toggleText('#phone', 'data-eng', 'data-kor');
        toggleText('#github', 'data-eng', 'data-kor');
        toggleText('#linkedin', 'data-eng', 'data-kor');
        toggleText('#address', 'data-eng', 'data-kor');
        toggleText('#introduction', 'data-eng', 'data-kor');
        toggleText('#educationTitle', 'data-eng', 'data-kor');
        toggleText('#educationList li', 'data-eng', 'data-kor');
        toggleText('#skillTitle', 'data-eng', 'data-kor');
        toggleText('#skillList li', 'data-eng', 'data-kor');
        toggleText('#careerTitle', 'data-eng', 'data-kor');
        toggleText('#careerList .career-item h3', 'data-eng', 'data-kor');
        toggleText('#careerList .project-item h4', 'data-eng', 'data-kor');
    });
});
