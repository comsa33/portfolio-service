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
    });
});
