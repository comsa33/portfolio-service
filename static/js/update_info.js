function loadBasicInfoData() {
    // Fetch basic_info IDs and populate the dropdowns for all forms
    fetch("/api/basic_info")
    .then(response => response.json())
    .then(data => {
        const dropdownIds = ["basic_info_id"];
        
        dropdownIds.forEach((dropdownId) => {
            const basicInfoDropdown = document.getElementById(dropdownId);
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
        fetchCareers(basicInfoId);
    });
}

let careerData = {}; // 이곳에 모든 커리어 데이터를 저장합니다.
function fetchCareers(basicInfoId) {
    fetch(`/api/career?basic_info_id=${basicInfoId}`)
    .then(response => response.json())
    .then(data => {
        careerData = {}; // 초기화
        const careerSelect = document.getElementById("career_select");
        careerSelect.innerHTML = "";
        data.forEach(career => {
            const option = document.createElement("option");
            option.value = career.id;
            option.text = career.company_name_kor;
            careerSelect.appendChild(option);
            careerData[career.id] = career; // ID를 키로 하여 데이터 저장
        });

        // Show the career form
        document.getElementById("career_form").style.display = "block";
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
            document.getElementById("start_date").value = selectedCareer.start_date;
            document.getElementById("end_date").value = selectedCareer.end_date;
            document.getElementById("description_eng").value = selectedCareer.description_eng;
            document.getElementById("description_kor").value = selectedCareer.description_kor;
        }
    });
}

function updateCareer() {
    // Update career details
    document.getElementById("update_career").addEventListener("click", function() {
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
    loadBasicInfoData().then(() => {
        const initialBasicInfoId = parseInt(document.getElementById("basic_info_id").value);
        if (initialBasicInfoId) {
          fetchCareers(initialBasicInfoId);
        }
      });
    loadCareersbyBasicInfoId();
    loadCareerDataintoForm();
    updateCareer();

});
