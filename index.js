// Feature toggling functionality
let activeFeature = null;

function toggleFeature(featureName) {
    const features = {
        'materials': document.getElementById('materialsSection'),
        'gpa': document.getElementById('gpaSection')
    };

    if (activeFeature === featureName) {
        features[featureName].style.display = 'none';
        activeFeature = null;
    } else {
        if (activeFeature) {
            features[activeFeature].style.display = 'none';
        }
        features[featureName].style.display = 'block';
        activeFeature = featureName;
    }
}

// Passwords and course data
const passwords = {
    '100-1': 'temperature',
    '100-2': 'humidity',
    '200-1': 'rainfall',
    '200-2': 'sunshine',
    '300-1': 'wind',
    '300-2': 'pressure'
};

const courseData = {
    '100-1': [
                {code: 'GST 111', name: 'Nigerian Peoples and Culture', link: 'https://drive.google.com/drive/folders/10kyGJ8jaB7VMTyMU9Lb43AKPRxUGy1Aw?usp=drive_link', type: 'Compulsory'},
                {code: 'MTH 101', name: 'Elementary Mathematics I', link: 'https://drive.google.com/drive/folders/1uZ868wXybkvQuysRq8vPEkUHrs4roq84?usp=drive_link', type: 'Compulsory'},
                {code: 'BIO 101', name: 'General Biology I', link: 'https://drive.google.com/drive/folders/14pZ9DUYOnmd2-OI_RxoDIcE67yuqwIox?usp=drive_link', type: 'Compulsory'},
                {code: 'BIO 107', name: 'General Biology Practical I', link: 'https://drive.google.com/drive/folders/1FWt1hfIJAn3O4SsOnM7AryQ4pgtIHQ3j?usp=drive_link', type: 'Compulsory'},
                {code: 'CHM 101', name: 'General Chemistry I', link: 'https://drive.google.com/drive/folders/1afCBx355uZfuhi322wksUHVWdzz0anuQ?usp=drive_link', type: 'Elective'},
                {code: 'CHM 107', name: 'General Chemistry Practical I', link: 'https://drive.google.com/drive/folders/1HeviNHzqwOjDxQO-ymhW3arG4QENHxck?usp=drive_link', type: 'Compulsory'},
                {code: 'MET 101', name: 'Introduction to Meteorology', link: 'https://drive.google.com/drive/folders/1C4ous0JFwjDnBykO3jZOiKwmA80Es3Z9?usp=drive_link', type: 'Compulsory'},
                {code: 'PHY 101', name: 'General Physics I', link: 'https://drive.google.com/drive/folders/14jkJAHRLQ0obGtIbeJzFSMbrpPvl_BHN?usp=drive_link', type: 'Compulsory'},
                {code: 'PHY 107', name: 'General Physics Practical I', link: 'https://drive.google.com/drive/folders/1a4Pt2eANYhqT3MbnXJlOb4SW6aum5nud?usp=drive_link', type: 'Elective'},
                {code: 'LAG-MET 131', name: 'Introdution to Climate Science and Development', link: 'https://drive.google.com/drive/folders/1OC2vXFvfompQs9NDUPFfjsFUh0Aqa5mq?usp=drive_link', type: 'Compulsory'},
                {code: 'LAG-MET 133', name: 'Climate and the terrestrial environments', link: 'https://drive.google.com/drive/folders/1OeMjxDu_RELwh2YfrmqswB91JaLxPoDx?usp=drive_link', type: 'Compulsory'}
                {code: 'GEO 109', name: 'Introduction to Hydrology', link: 'https://drive.google.com/drive/folders/1udWlHIMNwzcHrsph76-MvNf5d7aeqwLS?usp=drive_link', type: 'Compulsory'},
                {code: 'GEO 105', name: 'Introduction to Environmental Science', link: 'https://drive.google.com/drive/folders/1E5qS52V3rwDllRy9c9rOO9232S12peQ7?usp=drive_link', type: 'Elective'},
                {code: 'COS 101', name: 'Introdution to Computing Science', link: 'https://drive.google.com/drive/folders/1KrFRjs8gNZTqTe8qGfyfaJxyNZEOLAmw?usp=drive_link', type: 'Compulsory'},
            ],
            '100-2': [
                {code: 'MET 121', name: 'Man and Environment', link: '#', type: 'Compulsory'},
                {code: 'MET 122', name: 'Climate change and sustainable development', link: '#', type: 'Compulsory'},
                {code: 'MET 123', name: 'Meteorological Instrumentation II', link: '#', type: 'Compulsory'},
                {code: 'MET 124', name: 'Map Analysis and Meteorological Data Graphics', link: '#', type: 'Compulsory'},
                {code: 'CSC 120', name: 'COMPUTER AS A PROBLEM SOLVING TOOL', link: '#', type: 'Elective'},
                {code: 'CSC 121', name: 'SOFTWARE WORKSHOP II', link: '#', type: 'Elective'},
                {code: 'MAT 122', name: 'CALCULUS', link: '#', type: 'Compulsory'},
                {code: 'MAT 123', name: 'MECHANICS I', link: '#', type: 'Compulsory'},
            ],
            '200-1': [
                {code: 'GST 201', name: 'General African Studies I', link: 'https://drive.google.com/drive/folders/1sFyrDXY6cV0D8qKRHMnsygRWLQVkAc6P?usp=drive_link', type: 'Compulsory'},
                {code: 'MET 211', name: 'Atmospheric Environment II', link: 'https://drive.google.com/drive/folders/1ZmAO1MPOsubFFV5tCEZ-tdbzUihC2vM9?usp=drive_link', type: 'Compulsory'},
                {code: 'MET 212', name: 'Codes. Obsv. & Plotting', link: 'https://drive.google.com/drive/folders/1lLVycj6GS4flJ-WKhutoQpYhpJXwVj_c?usp=drive_link', type: 'Compulsory'},
                {code: 'GRY 230', name: 'Elements of Remote Sensing', link: 'https://drive.google.com/drive/folders/15zFxmtWw0N4vsTCW7wwqRuIV6aTRHg40?usp=sharing', type: 'Elective'},
                {code: 'GRY 212', name: 'Elements of Climatology and Climate Change', link: 'https://drive.google.com/drive/folders/12B4lUWSUUTSErfKWYb_QZGB9HFvbOMSX?usp=drive_link', type: 'Compulsory'},
                {code: 'MAT 233', name: 'Mathematical Methods I', link: 'https://drive.google.com/drive/folders/1AnCNBa-oBhPWxA96TR7oHm3nIO3rxry1?usp=drive_link', type: 'Compulsory'},
                {code: 'MAT 216', name: 'Numeric Analysis I', link: 'https://drive.google.com/drive/folders/1_q6DNuRVJHP4FAghHXxTNslglxYdq3Jk?usp=drive_link', type: 'Compulsory'},
                {code: 'PHS 216', name: 'Electronics I', link: 'https://drive.google.com/drive/folders/1MoZz3sURzlfqIm4l1d32ica3pJcM4EnQ?usp=drive_link', type: 'Elective'},
            ],
            '200-2': [
                {code: 'MET 101', name: 'Introduction to Meteorology', link: '#', type: 'Compulsory'},
                {code: 'MET 102', name: 'Atmospheric Physics', link: '#', type: 'Compulsory'},
                {code: 'CLM 101', name: 'Climate Systems', link: '#', type: 'Compulsory'},
            ],
            '300-1': [
                {code: 'MET 301', name: 'Advanced Meteorology', link: '#', type: 'Compulsory'},
                {code: 'MET 302', name: 'Climate Dynamics', link: '#', type: 'Compulsory'},
                {code: 'CLM 201', name: 'Climate Change Mitigation', link: '#', type: 'Elective'},
            ],
            '300-2': [
                {code: 'MET 311', name: 'Meteorological Modeling', link: '#', type: 'Compulsory'},
                {code: 'MET 312', name: 'Applied Climatology', link: '#', type: 'Compulsory'},
                {code: 'CLM 301', name: 'Climate Policy', link: '#', type: 'Elective'},
            ],
        };

let currentSemester = null;
let currentCourseLink = '';

function showCourses() {
    const select = document.getElementById('semesterSelect');
    currentSemester = select.value;
    if (currentSemester) {
        document.getElementById('modalTitle').textContent = `Password for ${select.options[select.selectedIndex].text}`;
        document.getElementById('passwordModal').style.display = 'flex';
        document.getElementById('errorMessage').style.display = 'none';
        document.getElementById('passwordInput').value = '';
    }
}

function checkPassword() {
    const enteredPassword = document.getElementById('passwordInput').value;
    if (enteredPassword === passwords[currentSemester]) {
        if (currentCourseLink) {
            accessCourse();
        } else {
            displayCourses();
        }
        closeModal();
    } else {
        document.getElementById('errorMessage').style.display = 'block';
    }
}

function displayCourses() {
    const container = document.getElementById('coursesContainer');
    container.innerHTML = '';
    
    courseData[currentSemester].forEach(course => {
        const button = document.createElement('a');
        button.className = 'course-btn';
        button.innerHTML = `<div class="course-code">${course.code}</div> ${course.name}`;
        button.href = course.link;
        button.target = "_blank";
        container.appendChild(button);
    });
    container.style.display = 'grid';
}

function showSearchResults() {
    const searchInput = document.getElementById('courseSearch').value.toLowerCase();
    const resultsContainer = document.getElementById('resultsContainer');
    resultsContainer.innerHTML = '';
    
    if (searchInput) {
        const filteredCourses = Object.entries(courseData).flatMap(([semester, courses]) => 
            courses.filter(course => course.code.toLowerCase().includes(searchInput))
                .map(course => ({ ...course, semester }))
        );
        
        if (filteredCourses.length === 0) {
            resultsContainer.innerHTML = '<div class="result-item">No courses found.</div>';
        } else {
            filteredCourses.forEach(course => {
                const resultItem = document.createElement('div');
                resultItem.className = 'result-item';
                resultItem.textContent = `${course.code} - ${course.name} (${course.semester})`;
                resultItem.onclick = () => {
                    currentSemester = course.semester;
                    currentCourseLink = course.link;
                    document.getElementById('modalTitle').textContent = `Enter Password for ${course.code} (${course.semester})`;
                    document.getElementById('passwordModal').style.display = 'flex';
                    document.getElementById('errorMessage').style.display = 'none';
                    document.getElementById('passwordInput').value = '';
                };
                resultsContainer.appendChild(resultItem);
            });
        }
        resultsContainer.style.display = 'block';
    } else {
        resultsContainer.style.display = 'none';
    }
}

function closeModal() {
    document.getElementById('passwordModal').style.display = 'none';
    currentCourseLink = '';
}

function accessCourse() {
    window.open(currentCourseLink, '_blank');
    closeModal();
}
 // GPA Calculator functionality
const courseCredits = {
	'100-1': {
		'GST 111': 2,
		'MTH 101': 2,
		'BIO 101': 2,
		'COS 101': 3,
		'BIO 107': 1,
		'CHM 101': 2,
		'CHM 107': 1,
		'MET 101': 2,
		'PHY 101': 2,
		'PHY 107': 1,
		'GEO 105': 2,
		'GEO 109': 2,
		'LAG-MET 131': 2,
		'LAG-MET 113': 2
	},
	'100-2': {
		'MET 121': 2,
		'MET 122': 2,
		'MET 123': 2,
		'MET 124': 2,
		'CSC 120': 3,
		'CSC 121': 3,
		'MAT 122': 3,
		'MAT 123': 3,
	},
	'200-1': {
		'GST 201': 2,
		'MET 211': 2,
		'MET 212': 2,
		'GRY 230': 2,
		'GRY 212': 2,
		'MAT 233': 3,
		'MAT 216': 3,
		'PHS 216': 2,
	},
	'200-2': {
		'MET 101': 3,
		'MET 102': 3,
		'CLM 101': 3,
	},
	'300-1': {
		'MET 301': 3,
		'MET 302': 3,
		'CLM 201': 3,
	},
	'300-2': {
		'MET 311': 3,
		'MET 312': 3,
		'CLM 301': 3,
	},
};

const gradePoints = {
	'A': 5, 'B': 4, 'C': 3, 'D': 2, 'E': 1, 'F': 0
};

function loadCoursesForGPA() {
	const semester = document.getElementById('gpaSemester').value;
	const courseList = document.getElementById('gpaCourseList');
	courseList.innerHTML = '';

	if (courseData[semester]) {
		courseData[semester].forEach(course => {
			// Skip GST courses
			if (course.code.startsWith('GST')) {
				return; // Skip this iteration
			}

			const units = courseCredits[semester][course.code] || 3; // Get units for the course
			const courseDiv = document.createElement('div');
			courseDiv.className = 'gpa-course';
			courseDiv.innerHTML = `
				<div style="flex: 1">${units} Units - ${course.code} - ${course.name} (${course.type})</div>
				<select class="grade-select" id="grade-${course.code}">
					<option value="">Select Grade</option>
					${Object.keys(gradePoints).map(grade => 
						`<option value="${grade}">${grade}</option>`
					).join('')}
				</select>
			`;
			courseList.appendChild(courseDiv);
		});
	}
}

function calculateGPA() {
	const semester = document.getElementById('gpaSemester').value;
	const courses = courseData[semester] || [];
	let totalQualityPoints = 0;
	let totalUnits = 0;

	courses.forEach(course => {
		// Skip GST courses
		if (course.code.startsWith('GST')) {
			return; // Skip this iteration
		}

		const gradeSelect = document.getElementById(`grade-${course.code}`);
		const grade = gradeSelect.value.toUpperCase();
		const units = courseCredits[semester][course.code] || 3;
		
		if (grade && gradePoints[grade] !== undefined) {
			totalQualityPoints += units * gradePoints[grade];
			totalUnits += units;
		}
	});

	if (totalUnits === 0) {
		document.getElementById('gpaResult').textContent = 'Please select grades for at least one course';
		return;
	}

	const gpa = totalQualityPoints / totalUnits;
	document.getElementById('gpaResult').textContent = 
		`Your GPA: ${gpa.toFixed(2)} (${totalUnits} units)`;
}




function openUrl() {
	window.location.href = 'blog.html';
}
