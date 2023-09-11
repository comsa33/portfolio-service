function loadBasicInfoData() {
    // Fetch basic_info IDs and populate the dropdowns for all forms
    fetch("/api/basic_info")
    .then(response => response.json())
    .then(data => {
        const dropdownIds = ["basic_info_id"];
        
        dropdownIds.forEach((dropdownId) => {
            const basicInfoDropdown = document.getElementById(dropdownId);
            
            // Add a default option
            const defaultOption = document.createElement("option");
            defaultOption.value = "";
            defaultOption.textContent = "선택해주세요";
            basicInfoDropdown.appendChild(defaultOption);
            
            data.forEach(basicInfo => {
                const option = document.createElement("option");
                option.value = basicInfo.id;
                option.textContent = basicInfo.title_kor + ' / ' + basicInfo.last_name_kor + basicInfo.first_name_kor;
                basicInfoDropdown.appendChild(option);
            });
        });
    })
    .catch(error => {
        console.error('An error occurred:', error);
    });
}

function loadCareersbyBasicInfoId() {
    const basicInfoDropdown = document.getElementById("basic_info_id");

    // Load careers when a basic_info_id is selected
    basicInfoDropdown.addEventListener("change", function() {
        const basicInfoId = this.value;
        fetchCareersAndProjects(basicInfoId);
        fetchSkills(basicInfoId);
        fetchEducations(basicInfoId);
        // Show the career form
        document.getElementById("career_form").style.display = "block";
        document.getElementById("project_form").style.display = "block";
        document.getElementById("skill_form").style.display = "block";
        document.getElementById("education_form").style.display = "block";
    });
}

let careerData = {};  // 모든 커리어 데이터 저장
let projectData = {}; // 모든 프로젝트 데이터 저장

function fetchCareersAndProjects(basicInfoId) {
    // 커리어 정보 불러오기
    fetch(`/api/career?basic_info_id=${basicInfoId}`)
    .then(response => response.json())
    .then(data => {
        populateSelectBoxes(data, "career");
    });

    // 프로젝트 정보 불러오기
    fetch(`/api/project?basic_info_id=${basicInfoId}`)
    .then(response => response.json())
    .then(data => {
        populateSelectBoxes(data, "project");
    });
}

function populateSelectBoxes(data, type) {
    let selectElementId = type === "career" ? "career_select" : "project_select";
    
    if (type === "career") {
        careerData = {};
    } else {
        projectData = {};
    }

    const selectElement = document.getElementById(selectElementId);
    selectElement.innerHTML = "";

    // Add a default option
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "선택해주세요";
    selectElement.appendChild(defaultOption);

    // 실제 데이터로부터 옵션 추가
    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.id;
        option.textContent = type === "career" ? item.company_name_kor : item.project_name_kor;
        selectElement.appendChild(option);
        
        // Update the actual data storage
        if (type === "career") {
            careerData[item.id] = item;
        } else {
            projectData[item.id] = item;
        }
    });
}

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

let skillData = {};  // 모든 스킬 데이터 저장

function fetchSkills(basicInfoId) {
    fetch(`/api/skill?basic_info_id=${basicInfoId}`)
    .then(response => response.json())
    .then(data => {
        populateSkillSelectBox(data);
    });
}

function populateSkillSelectBox(data) {
    const selectElement = document.getElementById("skill_select");
    selectElement.innerHTML = "";
    
    skillData = {}; // 데이터 초기화
    
    // Null 옵션 추가
    const nullOption = document.createElement("option");
    nullOption.value = "";
    nullOption.textContent = "선택하세요";
    selectElement.appendChild(nullOption);

    // 실제 데이터로부터 옵션 추가
    data.forEach(skill => {
        const option = document.createElement("option");
        option.value = skill.id;
        option.textContent = skill.skill_name_eng;
        selectElement.appendChild(option);
        
        // 스킬 데이터 저장
        skillData[skill.id] = skill;
    });
}

let educationData = {};  // 모든 학력 데이터 저장

function fetchEducations(basicInfoId) {
    fetch(`/api/education?basic_info_id=${basicInfoId}`)
    .then(response => response.json())
    .then(data => {
        populateEducationSelectBox(data);
    });
}

function populateEducationSelectBox(data) {
    const selectElement = document.getElementById("education_select");
    selectElement.innerHTML = "";
    
    educationData = {}; // 데이터 초기화
    
    // Null 옵션 추가
    const nullOption = document.createElement("option");
    nullOption.value = "";
    nullOption.textContent = "선택하세요";
    selectElement.appendChild(nullOption);

    // 실제 데이터로부터 옵션 추가
    data.forEach(education => {
        const option = document.createElement("option");
        option.value = education.id;
        option.textContent = education.school_name_kor;
        selectElement.appendChild(option);
        
        // 학력 데이터 저장
        educationData[education.id] = education;
    });
}

function loadCareerDataintoForm() {
    // Load career details into the form when a career is selected
    document.getElementById("career_select").addEventListener("change", function() {
        const careerId = parseInt(this.value);

        if (careerData.hasOwnProperty(careerId)) {
            const selectedCareer = careerData[careerId];
            // Populate the form fields
            document.getElementById("company_name_eng").value = selectedCareer.company_name_eng;
            document.getElementById("company_name_kor").value = selectedCareer.company_name_kor;
            document.getElementById("company_type_eng").value = selectedCareer.company_type_eng;
            document.getElementById("company_type_kor").value = selectedCareer.company_type_kor;
            document.getElementById("department_eng").value = selectedCareer.department_eng;
            document.getElementById("department_kor").value = selectedCareer.department_kor;
            document.getElementById("position_eng").value = selectedCareer.position_eng;
            document.getElementById("position_kor").value = selectedCareer.position_kor;

            // Convert and format the date fields
            const startDateObject = new Date(selectedCareer.start_date);
            const formattedStartDate = startDateObject.toISOString().split('T')[0];

            const endDateObject = new Date(selectedCareer.end_date);
            const formattedEndDate = endDateObject.toISOString().split('T')[0];

            document.getElementById("start_date").value = formattedStartDate;
            document.getElementById("end_date").value = formattedEndDate;
            
            document.getElementById("description_eng").value = selectedCareer.description_eng;
            document.getElementById("description_kor").value = selectedCareer.description_kor;
        }
    });
}

function loadProjectDataIntoForm() {
    // Load project details into the form when a project is selected
    document.getElementById("project_select").addEventListener("change", function() {
        const projectId = parseInt(this.value);

        if (projectData.hasOwnProperty(projectId)) {
            const selectedProject = projectData[projectId];
            // career_id를 설정합니다.
            const careerId = selectedProject.career_id;
            if (careerId === null || careerId === undefined) {
                document.getElementById("career_id").value = ''; // 빈 문자열로 설정
            } else {
                document.getElementById("career_id").value = careerId;
            }

            // Populate the form fields
            document.getElementById("project_name_eng").value = selectedProject.project_name_eng;
            document.getElementById("project_name_kor").value = selectedProject.project_name_kor;
            document.getElementById("project_main_type_eng").value = selectedProject.project_main_type_eng;
            document.getElementById("project_main_type_kor").value = selectedProject.project_main_type_kor;
            document.getElementById("project_sub_type_eng").value = selectedProject.project_sub_type_eng;
            document.getElementById("project_sub_type_kor").value = selectedProject.project_sub_type_kor;

            // Convert and format the date fields
            const startDateObject = new Date(selectedProject.start_date);
            const formattedStartDate = startDateObject.toISOString().split('T')[0];

            const endDateObject = new Date(selectedProject.end_date);
            const formattedEndDate = endDateObject.toISOString().split('T')[0];

            document.getElementById("start_date_project").value = formattedStartDate;
            document.getElementById("end_date_project").value = formattedEndDate;

            document.getElementById("no_of_team_members").value = selectedProject.no_of_team_members;
            document.getElementById("team_name_eng").value = selectedProject.team_name_eng;
            document.getElementById("team_name_kor").value = selectedProject.team_name_kor;
            document.getElementById("summary_eng").value = selectedProject.summary_eng;
            document.getElementById("summary_kor").value = selectedProject.summary_kor;
            document.getElementById("role_description_eng").value = selectedProject.role_description_eng;
            document.getElementById("role_description_kor").value = selectedProject.role_description_kor;
            document.getElementById("issue_description_eng").value = selectedProject.issue_description_eng;
            document.getElementById("issue_description_kor").value = selectedProject.issue_description_kor;
            document.getElementById("project_link").value = selectedProject.project_link;
            document.getElementById("code_link").value = selectedProject.code_link;
            document.getElementById("project_image").value = selectedProject.project_image;
        }

        loadSkills();
        // Load the skills for the project
        loadCurrentProjectSkills(projectId);
    });
}

function loadSkillDataIntoForm() {
    // Load skill details into the form when a skill is selected
    document.getElementById("skill_select").addEventListener("change", function() {
        const skillId = parseInt(this.value);

        if (skillData.hasOwnProperty(skillId)) {
            const selectedSkill = skillData[skillId];
            // Populate the form fields
            document.getElementById("skill_name_eng").value = selectedSkill.skill_name_eng;
            document.getElementById("skill_name_kor").value = selectedSkill.skill_name_kor;
            document.getElementById("skill_type_eng").value = selectedSkill.skill_type_eng;
            document.getElementById("skill_type_kor").value = selectedSkill.skill_type_kor;

            // Convert and format the start date field
            const startDateObject = new Date(selectedSkill.start_date);
            const formattedStartDate = startDateObject.toISOString().split('T')[0];
            document.getElementById("skill_start_date").value = formattedStartDate;
            
            document.getElementById("skill_level").value = selectedSkill.skill_level;
            document.getElementById("skill_level_output").textContent = selectedSkill.skill_level;
            
            document.getElementById("skill_description_eng").value = selectedSkill.description_eng;
            document.getElementById("skill_description_kor").value = selectedSkill.description_kor;
            document.getElementById("skill_image").value = selectedSkill.skill_image;
        }
    });
}

function loadEducationDataIntoForm() {
    // Load education details into the form when an education is selected
    document.getElementById("education_select").addEventListener("change", function() {
        const educationId = parseInt(this.value);

        if (educationData.hasOwnProperty(educationId)) {
            const selectedEducation = educationData[educationId];
            
            // Populate the form fields
            document.getElementById("school_name_eng").value = selectedEducation.school_name_eng;
            document.getElementById("school_name_kor").value = selectedEducation.school_name_kor;
            document.getElementById("degree_eng").value = selectedEducation.degree_eng;
            document.getElementById("degree_kor").value = selectedEducation.degree_kor;
            document.getElementById("major_eng").value = selectedEducation.major_eng;
            document.getElementById("major_kor").value = selectedEducation.major_kor;

            // Convert and format the start date and end date fields
            const startDateObject = new Date(selectedEducation.start_date);
            const formattedStartDate = startDateObject.toISOString().split('T')[0];
            document.getElementById("education_start_date").value = formattedStartDate;

            const endDateObject = new Date(selectedEducation.end_date);
            const formattedEndDate = endDateObject.toISOString().split('T')[0];
            document.getElementById("education_end_date").value = formattedEndDate;
            
            document.getElementById("education_description_eng").value = selectedEducation.description_eng;
            document.getElementById("education_description_kor").value = selectedEducation.description_kor;
            document.getElementById("education_logo_image").value = selectedEducation.logo_image;
        }
    });
}

function updateCareer() {
    // Update career details
    document.getElementById("update_career").addEventListener("click", function() {
        // event.preventDefault(); 
        const formData = {
            id: parseInt(document.getElementById("career_select").value),  // Add this line if you want to update an existing career
            basic_info_id: parseInt(document.getElementById("basic_info_id").value),
            company_name_eng: document.getElementById("company_name_eng").value,
            company_name_kor: document.getElementById("company_name_kor").value,
            company_type_eng: document.getElementById("company_type_eng").value,
            company_type_kor: document.getElementById("company_type_kor").value,
            department_eng: document.getElementById("department_eng").value,
            department_kor: document.getElementById("department_kor").value,
            position_eng: document.getElementById("position_eng").value,
            position_kor: document.getElementById("position_kor").value,
            start_date: document.getElementById("start_date").value,
            end_date: document.getElementById("end_date").value,
            description_eng: document.getElementById("description_eng").value,
            description_kor: document.getElementById("description_kor").value,
        };

        // Make an AJAX request to update the data
        $.ajax({
            url: '/api/career',  // your API endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success (e.g., show a success message, reload the career list, etc.)
                alert('Career successfully updated.');
                console.log('Career successfully updated.');
            },
            error: function(response) {
                // Handle error (e.g., show an error message)
                // Handle error
                const serverMessage = response.responseJSON ? response.responseJSON.error : 'An error occurred.';
                alert('Failed to update career: ' + serverMessage);
                console.error('Server Error:', serverMessage);
            }
        });
    });
}

function updateProject() {
    // Update project details
    document.getElementById("update_project").addEventListener("click", function() {
        event.preventDefault();
        const formData = {
            id: parseInt(document.getElementById("project_select").value), // To update an existing project
            basic_info_id: parseInt(document.getElementById("basic_info_id").value),
            career_id: document.getElementById("career_id").value === "" ? null : parseInt(document.getElementById("career_id").value),
            project_name_eng: document.getElementById("project_name_eng").value,
            project_name_kor: document.getElementById("project_name_kor").value,
            project_main_type_eng: document.getElementById("project_main_type_eng").value,
            project_main_type_kor: document.getElementById("project_main_type_kor").value,
            project_sub_type_eng: document.getElementById("project_sub_type_eng").value,
            project_sub_type_kor: document.getElementById("project_sub_type_kor").value,
            start_date: document.getElementById("start_date_project").value,
            end_date: document.getElementById("end_date_project").value,
            no_of_team_members: parseInt(document.getElementById("no_of_team_members").value),
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

        // Make an AJAX request to update the data
        $.ajax({
            url: '/api/project',  // your API endpoint for project
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Handle success (e.g., show a success message, reload the project list, etc.)
                alert('Project successfully updated.');
                console.log('Project successfully updated.');
            },
            error: function(response) {
                // Handle error (e.g., show an error message)
                const serverMessage = response.responseJSON ? response.responseJSON.error : 'An error occurred.';
                alert('Failed to update project: ' + serverMessage);
                console.error('Server Error:', serverMessage);
            }
        });
    });
}

function updateSkill() {
    // Update skill details
    document.getElementById("update_skill").addEventListener("click", function(event) {
        event.preventDefault();
        const formData = {
            id: parseInt(document.getElementById("skill_select").value),
            basic_info_id: parseInt(document.getElementById("basic_info_id").value),
            skill_name_eng: document.getElementById("skill_name_eng").value,
            skill_name_kor: document.getElementById("skill_name_kor").value,
            skill_type_eng: document.getElementById("skill_type_eng").value,
            skill_type_kor: document.getElementById("skill_type_kor").value,
            start_date: document.getElementById("skill_start_date").value,
            skill_level: parseInt(document.getElementById("skill_level").value),
            description_eng: document.getElementById("skill_description_eng").value,
            description_kor: document.getElementById("skill_description_kor").value,
            skill_image: document.getElementById("skill_image").value
        };

        // Make an AJAX request to update the data
        $.ajax({
            url: '/api/skill',  // your API endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('Skill successfully updated.');
                console.log('Skill successfully updated.');
            },
            error: function(response) {
                const serverMessage = response.responseJSON ? response.responseJSON.error : 'An error occurred.';
                alert('Failed to update skill: ' + serverMessage);
                console.error('Server Error:', serverMessage);
            }
        });
    });
}

function updateEducation() {
    // Update education details
    document.getElementById("update_education").addEventListener("click", function(event) {
        event.preventDefault();
        const formData = {
            id: parseInt(document.getElementById("education_select").value),
            basic_info_id: parseInt(document.getElementById("basic_info_id").value),
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
            logo_image: document.getElementById("education_logo_image").value
        };

        // Make an AJAX request to update the data
        $.ajax({
            url: '/api/education',  // your API endpoint
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                alert('Education successfully updated.');
                console.log('Education successfully updated.');
            },
            error: function(response) {
                const serverMessage = response.responseJSON ? response.responseJSON.error : 'An error occurred.';
                alert('Failed to update education: ' + serverMessage);
                console.error('Server Error:', serverMessage);
            }
        });
    });
}

// 서버에서 스킬 목록을 불러와서 #project_skills에 추가
function loadSkills() {
    $.get("/api/skill", function(data) {
        data.forEach(function(skill) {
            const option = $("<option>").val(skill.id).text(skill.skill_name_eng);
            $("#project_skills").append(option);
        });
    });
}

// 서버에서 프로젝트에 현재 연결된 스킬을 불러옴
function loadCurrentProjectSkills(projectId) {
    $.get(`/api/project/${projectId}/skills`, function(data) {
        $("#current_project_skills").empty();
        data.forEach(function(skill) {
            const listItem = $("<li>").text(skill.skill_name_eng);
            $("#current_project_skills").append(listItem);
        });
    });
}

function addSkillToProject(projectId, skillIds) {
    $.ajax({
        url: '/api/project_skill',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ project_id: projectId, skill_ids: skillIds }),
        success: function(data) {
            loadCurrentProjectSkills(projectId);
        },
        error: function(xhr, status, error) {
            console.error(`Failed to add skill: ${error}`);
        }
    });
}

function removeSkillFromProject(projectId, skillIds) {
    $.ajax({
        url: '/api/project_skill',
        method: 'DELETE',
        contentType: 'application/json',
        data: JSON.stringify({ project_id: projectId, skill_ids: skillIds }),
        success: function(data) {
            loadCurrentProjectSkills(projectId);
        },
        error: function(xhr, status, error) {
            console.error(`Failed to remove skill: ${error}`);
        }
    });
}

document.addEventListener("DOMContentLoaded", function() {
    loadBasicInfoData();
    loadCareersbyBasicInfoId();
    loadCareerDataintoForm();
    loadCareerData();
    loadProjectDataIntoForm();
    loadSkillDataIntoForm();
    loadEducationDataIntoForm();

    // 스킬을 프로젝트에 추가
    $("#add_skill_to_project").click(function() {
        const projectId = parseInt($("#project_select").val());
        const selectedSkillIds = $("#project_skills").val();

        if (selectedSkillIds.length === 0 || isNaN(projectId)) {
            alert("Please select a project and at least one skill to add.");
            return;
        }

        addSkillToProject(projectId, selectedSkillIds);
    });

    // 스킬을 프로젝트에서 제거
    $("#remove_skill_from_project").click(function() {
        const projectId = parseInt($("#project_select").val());
        const selectedSkillIds = $("#project_skills").val();

        if (selectedSkillIds.length === 0 || isNaN(projectId)) {
            alert("Please select a project and at least one skill to remove.");
            return;
        }

        removeSkillFromProject(projectId, selectedSkillIds);
    });

    updateCareer();
    updateProject();
    updateSkill();
    updateEducation();
});
