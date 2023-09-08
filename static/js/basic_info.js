document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("basic-info-form");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        const formData = {
            first_name_eng: document.getElementById("first_name_eng").value,
            last_name_eng: document.getElementById("last_name_eng").value,
            first_name_kor: document.getElementById("first_name_kor").value,
            last_name_kor: document.getElementById("last_name_kor").value,
            birth_date: document.getElementById("birth_date").value,
            title_eng: document.getElementById("title_eng").value,
            title_kor: document.getElementById("title_kor").value,
            email: document.getElementById("email").value,
            phone: document.getElementById("phone").value,
            address_eng: document.getElementById("address_eng").value,
            address_kor: document.getElementById("address_kor").value,
            github: document.getElementById("github").value,
            linkedin: document.getElementById("linkedin").value,
            introduction_eng: document.getElementById("introduction_eng").value,
            introduction_kor: document.getElementById("introduction_kor").value,
            profile_image: document.getElementById("profile_image").value
        };

        fetch("/api/basic_info", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(formData)
        }).then(response => response.json())
          .then(data => {
            console.log("Success:", data);
            // 여기에 성공시 수행할 작업을 추가합니다.
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});
