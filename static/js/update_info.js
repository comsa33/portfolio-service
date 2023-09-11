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
        // Show the career form
        document.getElementById("career_form").style.display = "block";
        document.getElementById("project_form").style.display = "block";
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
            event.preventDefault();
            const selectedProject = projectData[projectId];
            // career_id를 설정합니다.
            const careerId = selectedProject.career_id || null;  // null 체크를 추가
            document.getElementById("career_id").value = careerId;
            
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

document.addEventListener("DOMContentLoaded", function() {
    loadBasicInfoData();
    loadCareersbyBasicInfoId();
    loadCareerDataintoForm();
    loadCareerData();
    loadProjectDataIntoForm();
    updateCareer();

});
