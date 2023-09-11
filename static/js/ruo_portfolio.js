document.addEventListener("DOMContentLoaded", function() {
    let isEnglish = true;
    
    document.getElementById('languageToggle').addEventListener('click', function() {
        isEnglish = !isEnglish;

        const toggleText = (selector, attrEng, attrKor) => {
            document.querySelectorAll(selector).forEach(el => {
                el.textContent = isEnglish ? el.getAttribute(attrEng) : el.getAttribute(attrKor);
            });
        };

        // Toggle text for all elements
        toggleText('#fullName', 'data-eng', 'data-kor');
        toggleText('#educationTitle', 'data-eng', 'data-kor');
        toggleText('#educationList li', 'data-eng', 'data-kor');
        toggleText('#skillTitle', 'data-eng', 'data-kor');
        toggleText('#skillList li', 'data-eng', 'data-kor');
        toggleText('#careerTitle', 'data-eng', 'data-kor');
        toggleText('#careerList .career-item h3', 'data-eng', 'data-kor');
        toggleText('#careerList .project-item h4', 'data-eng', 'data-kor');
    });
});
