var form = document.getElementById('resumeform');
var resumeDisplayElement = document.getElementById('resumeoutput');
var shareablelinkcontainer = document.getElementById('shareablelink-container');
var shareableLinkElement = document.getElementById('shareablelink');
var downloadPdfButton = document.getElementById('downloadpdf');
form.addEventListener('submit', function (event) {
    var _a;
    event.preventDefault();
    var username = document.getElementById('username').value;
    var firstname = document.getElementById('firstname').value;
    var lastname = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var number = document.getElementById('number').value;
    var location = document.getElementById('location').value;
    var Education = document.getElementById('Education').value;
    var Skills = document.getElementById('Skills').value;
    var Experience = document.getElementById('Experience').value;
    var imageFile = (_a = document.getElementById('image').files) === null || _a === void 0 ? void 0 : _a[0];
    var imageDataURL = '';
    if (imageFile) {
        var reader_1 = new FileReader();
        reader_1.onload = function () {
            imageDataURL = reader_1.result;
            var resumeHTML = "\n\n      <h2><b>Congrats your First Generated!</b></h2>\n        <div>\n          <img src=\"".concat(imageDataURL, "\" alt=\"Profile Image\" style=\"width=\"150px\"  border: 2px solid black; object-fit: cover; height=\"150px\" class=\"image\" \">\n          </div>\n        <p><strong>First Name:</strong> ").concat(firstname, "</p><br>\n        <p><strong>Last Name:</strong> ").concat(lastname, "</p><br>\n        <p><strong>Email:</strong> ").concat(email, "</p><br>\n        <p><strong>Phone Number:</strong> ").concat(number, "</p><br>\n        <p><strong>Location:</strong> ").concat(location, "</p><br>\n        <p><strong>Education:</strong> ").concat(Education, "</p><br>\n        <p><strong>Skills:</strong> ").concat(Skills, "</p><br>\n        <p><strong>Experience:</strong> ").concat(Experience, "</p><br>\n      ");
            resumeDisplayElement.innerHTML = resumeHTML;
            var shareableURL = "".concat(window.location.origin).concat(window.location.pathname, "?username=").concat(encodeURIComponent(username));
            shareablelinkcontainer.style.display = "block";
            shareableLinkElement.textContent = "Click here to view your resume";
            shareableLinkElement.href = shareableURL;
        };
        reader_1.readAsDataURL(imageFile);
    }
});
downloadPdfButton.addEventListener("click", function () {
    var options = {
        margin: 0.5,
        filename: 'Generated_Resume.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    };
    html2pdf().set(options).from(resumeDisplayElement).save();
});
//////
window.addEventListener("DOMContentLoaded", function () {
    var urlparams = new URLSearchParams(window.location.search);
    var username = urlparams.get("username");
    if (username) {
        var savedResumeData = localStorage.getItem(username);
        if (savedResumeData) {
            var resumeData = JSON.parse(savedResumeData);
            document.getElementById('username').value = username;
            document.getElementById('firstname').value = resumeData.firstname;
            document.getElementById('lastname').value = resumeData.lastname;
            document.getElementById('email').value = resumeData.email;
            document.getElementById('number').value = resumeData.number;
            document.getElementById('location').value = resumeData.location;
            document.getElementById('Education').value = resumeData.Education;
            document.getElementById('Skills').value = resumeData.Skills;
            document.getElementById('Experience').value = resumeData.Experience;
        }
    }
});
