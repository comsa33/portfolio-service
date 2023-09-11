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
    let targetData = type === "career" ? careerData : projectData;
    let selectElementId = type === "career" ? "career_select" : "project_select";
    
    targetData = {}; // 초기화
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
        targetData[item.id] = item; // ID를 키로 하여 데이터 저장
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
    updateCareer();

});
