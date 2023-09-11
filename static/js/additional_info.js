// 커리어 데이터를 불러와서 dropdown에 추가하는 함수
function loadCareerData() {
    fetch("/api/career")
    .then(response => response.json())
    .then(data => {
        const selectElement = document.getElementById("career_id");
        
        // Null 옵션 추가
        const nullOption = document.createElement("option");
        nullOption.value = "";
        nullOption.textContent = "개인 프로젝트";
        selectElement.appendChild(nullOption);

        data.forEach(career => {
            const option = document.createElement("option");
            option.value = career.id;
            option.textContent = career.company_name_kor;
            selectElement.appendChild(option);
        });
    })
    .catch(error => {
        console.error("An error occurred:", error);
    });
}

function loadBasicInfoData() {
    // Fetch basic_info IDs and populate the dropdowns for all forms
    fetch("/api/basic_info")
    .then(response => response.json())
    .then(data => {
        const dropdownIds = ["career_basic_info_id", "project_basic_info_id", "skill_basic_info_id", "education_basic_info_id"];
        
        dropdownIds.forEach((dropdownId) => {
            const basicInfoDropdown = document.getElementById(dropdownId);
            data.forEach(basicInfo => {
                const option = document.createElement("option");
                option.value = basicInfo.id;
                option.textContent = basicInfo.last_name_kor + basicInfo.first_name_kor;
                basicInfoDropdown.appendChild(option);
            });
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

function loadSkillData() {
        // Fetch skill IDs and populate the multiple select dropdown for project form
        fetch("/api/skill")
        .then(response => response.json())
        .then(data => {
            const skillDropdown = document.getElementById("skill_ids");
            data.forEach(skill => {
                const option = document.createElement("option");
                option.value = skill.id;
                option.textContent = skill.skill_name_kor;
                skillDropdown.appendChild(option);
            });
        })
        .catch(error => {
            console.error('An error occurred:', error);
        });
}

document.addEventListener("DOMContentLoaded", function() {
    // basic_info 데이터 로딩 로직 호출
    loadBasicInfoData();
    // 커리어 데이터 로딩 로직 호출
    loadCareerData();
    // 스킬 데이터 로딩 로직 호출
    loadSkillData();

    // Your code to handle form submission and send the data to the server
    document.getElementById("submit-career").addEventListener("click", function() {
        const careerData = {
            basic_info_id: document.getElementById("career_basic_info_id").value,  // 드롭다운에서 선택
            company_name_eng: document.getElementById("company_name_eng").value,
            company_name_kor: document.getElementById("company_name_kor").value,
            company_type_eng: document.getElementById("company_type_eng").value,
            company_type_kor: document.getElementById("company_type_kor").value,
            department_eng: document.getElementById("department_eng").value,
            department_kor: document.getElementById("department_kor").value,
            position_eng: document.getElementById("position_eng").value,
            position_kor: document.getElementById("position_kor").value,
            start_date: document.getElementById("career_start_date").value,
            end_date: document.getElementById("career_end_date").value,
            description_eng: document.getElementById("career_description_eng").value,
            description_kor: document.getElementById("career_description_kor").value
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
            basic_info_id: document.getElementById("project_basic_info_id").value,  // 드롭다운에서 선택
            career_id: document.getElementById("career_id").value,  // 드롭다운에서 선택
            project_name_eng: document.getElementById("project_name_eng").value,
            project_name_kor: document.getElementById("project_name_kor").value,
            project_main_type_eng: document.getElementById("project_main_type_eng").value,
            project_main_type_kor: document.getElementById("project_main_type_kor").value,
            project_sub_type_eng: document.getElementById("project_sub_type_eng").value,
            project_sub_type_kor: document.getElementById("project_sub_type_kor").value,
            start_date: document.getElementById("project_start_date").value,
            end_date: document.getElementById("project_end_date").value,
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
            const projectId = data.id; // 백엔드에서 보내주는 프로젝트 ID
            const skillIds = Array.from(document.getElementById("skill_ids").selectedOptions).map(option => option.value);
            
            fetch("/api/project_skill", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ project_id: projectId, skill_ids: skillIds })
            })
            .then(response => response.json())
            .then(data => {
                console.log("Project and Skill data saved:", data);
            });
        })
        .catch((error) => {
            console.error("Error:", error);
        });
    });

    document.getElementById("submit-skill").addEventListener("click", function() {
        const skillData = {
            basic_info_id: document.getElementById("skill_basic_info_id").value,  // 드롭다운에서 선택
            skill_name_eng: document.getElementById("skill_name_eng").value,
            skill_name_kor: document.getElementById("skill_name_kor").value,
            skill_type_eng: document.getElementById("skill_type_eng").value,
            skill_type_kor: document.getElementById("skill_type_kor").value,
            start_date: document.getElementById("skill_start_date").value,
            skill_level: document.getElementById("skill_level").value,
            description_eng: document.getElementById("skill_description_eng").value,
            description_kor: document.getElementById("skill_description_kor").value,
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
            basic_info_id: document.getElementById("education_basic_info_id").value,
            school_name_eng: document.getElementById("school_name_eng").value,
            school_name_kor: document.getElementById("school_name_kor").value,
            degree_eng: document.getElementById("degree_eng").value,
            degree_kor: document.getElementById("degree_kor").value,
            major_eng: document.getElementById("major_eng").value,
            major_kor: document.getElementById("major_kor").value,
            start_date: document.getElementById("education_start_date").value,
            end_date: document.getElementById("education_end_date").value,
            description_eng: document.getElementById("education_description_eng").value,
            description_kor: document.getElementById("education_description_kor").value,
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

