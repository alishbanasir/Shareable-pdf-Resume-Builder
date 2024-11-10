const form = document.getElementById("resumeform") as HTMLFormElement;
const resumeDisplayElement = document.getElementById(
  "resumeoutput"
) as HTMLDivElement;
const shareablelinkcontainer = document.getElementById(
  "shareablelink-container"
) as HTMLDivElement;
const shareableLinkElement = document.getElementById(
  "shareablelink"
) as HTMLAnchorElement;
const downloadPdfButton = document.getElementById(
  "downloadpdf"
) as HTMLButtonElement;

form.addEventListener("submit", (event: Event) => {
  event.preventDefault();

  const username = (document.getElementById("username") as HTMLInputElement)
    .value;
  const firstname = (document.getElementById("firstname") as HTMLInputElement)
    .value;
  const lastname = (document.getElementById("lastname") as HTMLInputElement)
    .value;
  const email = (document.getElementById("email") as HTMLInputElement).value;
  const number = (document.getElementById("number") as HTMLInputElement).value;
  const location = (document.getElementById("location") as HTMLInputElement)
    .value;
  const Education = (document.getElementById("Education") as HTMLInputElement)
    .value;
  const Skills = (document.getElementById("Skills") as HTMLInputElement).value;
  const Experience = (document.getElementById("Experience") as HTMLInputElement)
    .value;

  const imageFile = (document.getElementById("image") as HTMLInputElement)
    .files?.[0];
  let imageDataURL = "";

  if (imageFile) {
    const reader = new FileReader();
    reader.onload = () => {
      imageDataURL = reader.result as string;

      const resumeHTML = `

      <h2><b>Congrats your First Generated!</b></h2>
        <div>
          <img src="${imageDataURL}" alt="Profile Image" style="width="150px"  border: 2px solid black; object-fit: cover; height="150px" class="image" ">
          </div>
        <p><strong>First Name:</strong> ${firstname}</p><br>
        <p><strong>Last Name:</strong> ${lastname}</p><br>
        <p><strong>Email:</strong> ${email}</p><br>
        <p><strong>Phone Number:</strong> ${number}</p><br>
        <p><strong>Location:</strong> ${location}</p><br>
        <p><strong>Education:</strong> ${Education}</p><br>
        <p><strong>Skills:</strong> ${Skills}</p><br>
        <p><strong>Experience:</strong> ${Experience}</p><br>
      `;
      resumeDisplayElement.innerHTML = resumeHTML;

      const shareableURL = `${window.location.origin}${
        window.location.pathname
      }?username=${encodeURIComponent(username)}`;
      shareablelinkcontainer.style.display = "block";
      shareableLinkElement.textContent = "Click here to view your resume";
      shareableLinkElement.href = shareableURL;
    };
    reader.readAsDataURL(imageFile);
  }
});

downloadPdfButton.addEventListener("click", () => {
  const options = {
    margin: 0.5,
    filename: "Generated_Resume.pdf",
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  };

  html2pdf().set(options).from(resumeDisplayElement).save();
});


window.addEventListener("DOMContentLoaded", () => {
  const urlparams = new URLSearchParams(window.location.search);
  const username = urlparams.get("username");

  if (username) {
    const savedResumeData = localStorage.getItem(username);
    if (savedResumeData) {
      const resumeData = JSON.parse(savedResumeData);
      (document.getElementById("username") as HTMLInputElement).value =
        username;
      (document.getElementById("firstname") as HTMLInputElement).value =
        resumeData.firstname;
      (document.getElementById("lastname") as HTMLInputElement).value =
        resumeData.lastname;
      (document.getElementById("email") as HTMLInputElement).value =
        resumeData.email;
      (document.getElementById("number") as HTMLInputElement).value =
        resumeData.number;
      (document.getElementById("location") as HTMLInputElement).value =
        resumeData.location;
      (document.getElementById("Education") as HTMLInputElement).value =
        resumeData.Education;
      (document.getElementById("Skills") as HTMLInputElement).value =
        resumeData.Skills;
      (document.getElementById("Experience") as HTMLInputElement).value =
        resumeData.Experience;
    }
  }
});
