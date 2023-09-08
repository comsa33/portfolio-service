document.addEventListener("DOMContentLoaded", function() {
    // Fetch basic_info IDs and populate the dropdowns for all forms
    fetch("/api/basic_info")
    .then(response => response.json())
    .then(data => {
        const dropdownIds = ["career-basic-info-id", "project-basic-info-id", "skill-basic-info-id", "education-basic-info-id"];
        
        dropdownIds.forEach((dropdownId) => {
            const basicInfoDropdown = document.getElementById(dropdownId);
            data.forEach(basicInfo => {
                const option = document.createElement("option");
                option.value = basicInfo.id;
                option.textContent = basicInfo.first_name_eng + " " + basicInfo.last_name_eng;
                basicInfoDropdown.appendChild(option);
            });
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
    
    // Your code to handle form submission and send the data to the server
    document.getElementById("submit-career").addEventListener("click", function() {
        event.preventDefault(); // 기본 submit 동작을 막음
        console.log("Submit career clicked"); // 이 로그가 보이는지 확인
        const careerData = {
            basic_info_id: document.getElementById("career-basic-info-id").value,  // 드롭다운에서 선택
            company_name_eng: document.getElementById("company_name_eng").value,
            company_name_kor: document.getElementById("company_name_kor").value,
            company_type_eng: document.getElementById("company_type_eng").value,
            company_type_kor: document.getElementById("company_type_kor").value,
            department_eng: document.getElementById("department_eng").value,
            department_kor: document.getElementById("department_kor").value,
            position_eng: document.getElementById("position_eng").value,
            position_kor: document.getElementById("position_kor").value,
            start_date: document.getElementById("career-start-date").value,
            end_date: document.getElementById("career-end-date").value,
            description_eng: document.getElementById("career-description-eng").value,
            description_kor: document.getElementById("career-description-kor").value
        };
    
        fetch("/api/career", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(careerData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Career data saved:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });

    document.getElementById("submit-project").addEventListener("click", function() {
        const projectData = {
            basic_info_id: document.getElementById("project-basic-info-id").value,  // 드롭다운에서 선택
            project_name_eng: document.getElementById("project_name_eng").value,
            project_name_kor: document.getElementById("project_name_kor").value,
            project_main_type_eng: document.getElementById("project_main_type_eng").value,
            project_main_type_kor: document.getElementById("project_main_type_kor").value,
            project_sub_type_eng: document.getElementById("project_sub_type_eng").value,
            project_sub_type_kor: document.getElementById("project_sub_type_kor").value,
            start_date: document.getElementById("project-start-date").value,
            end_date: document.getElementById("project-end-date").value,
            no_of_team_members: document.getElementById("no_of_team_members").value,
            team_name_eng: document.getElementById("team_name_eng").value,
            team_name_kor: document.getElementById("team_name_kor").value,
            summary_eng: document.getElementById("summary_eng").value,
            summary_kor: document.getElementById("summary_kor").value,
            role_description_eng: document.getElementById("role_description_eng").value,
            role_description_kor: document.getElementById("role_description_kor").value,
            issue_description_eng: document.getElementById("issue_description_eng").value,
            issue_description_kor: document.getElementById("issue_description_kor").value,
            project_link: document.getElementById("project_link").value,
            code_link: document.getElementById("code_link").value,
            project_image: document.getElementById("project_image").value
        };
    
        fetch("/api/project", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(projectData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Project data saved:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });

    document.getElementById("submit-skill").addEventListener("click", function() {
        const skillData = {
            basic_info_id: document.getElementById("skill-basic-info-id").value,  // 드롭다운에서 선택
            skill_name_eng: document.getElementById("skill_name_eng").value,
            skill_name_kor: document.getElementById("skill_name_kor").value,
            skill_type_eng: document.getElementById("skill_type_eng").value,
            skill_type_kor: document.getElementById("skill_type_kor").value,
            start_date: document.getElementById("skill-start-date").value,
            skill_level: document.getElementById("skill-level").value,
            description_eng: document.getElementById("description_eng").value,
            description_kor: document.getElementById("description_kor").value,
            skill_image: document.getElementById("skill_image").value
        };
    
        fetch("/api/skill", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(skillData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Skill data saved:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });    

    document.getElementById("submit-education").addEventListener("click", function() {
        const educationData = {
            basic_info_id: document.getElementById("education-basic-info-id").value,
            school_name_eng: document.getElementById("school_name_eng").value,
            school_name_kor: document.getElementById("school_name_kor").value,
            degree_eng: document.getElementById("degree_eng").value,
            degree_kor: document.getElementById("degree_kor").value,
            major_eng: document.getElementById("major_eng").value,
            major_kor: document.getElementById("major_kor").value,
            start_date: document.getElementById("education-start-date").value,
            end_date: document.getElementById("education-end-date").value,
            description_eng: document.getElementById("education-description-eng").value,
            description_kor: document.getElementById("education-description-kor").value,
            logo_image: document.getElementById("logo_image").value
        };
    
        fetch("/api/education", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(educationData)
        })
        .then(response => response.json())
        .then(data => {
            console.log("Education data saved:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });
});

