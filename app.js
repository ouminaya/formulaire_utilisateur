class Employer {
  constructor(
    firstname,
    lastname,
    phone,
    email,
    contract,
    birthday,
    exp,
    avatar
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.phone = phone;
    this.email = email;
    this.contract = contract;
    this.birthday = birthday;
    this.exp = exp;
    this.avatar = avatar;
  }

  getAgeFromBirthDay() {
    let currentYear = Number(new Date().getFullYear());
    let birthdayYear = Number(new Date(this.birthday).getFullYear());
    let age = parseInt(currentYear - birthdayYear);
    console.log(age);
    console.log(this.firstname + " a " + age + "ans.");
  }

  getList() {
    return [
      [this.avatar],
      [this.firstname + " " + this.lastname],
      [this.exp],
      [this.contract],
      [this.phone],
    ];
  }
}

let employers = [];
let form = document.querySelector("#form");
let tableBody = document.querySelector("#employersContainer");
listEmployer(employers, tableBody);

if (form) {
  form.addEventListener("input", function (e) {
    let birthday = document.querySelector('#birthday')
    console.log(e.target)
    console.log(birthday)

    if (e.target == birthday){
        let currentYear = Number(new Date().getFullYear());
        let birthdayYear = Number(new Date(birthday.value).getFullYear());
        let age = parseInt(currentYear - birthdayYear);
        console.log(age)
        if (age >= 18 && age <= 50) {
        

            birthday.style.borderColor = 'green'
        } else {
            birthday.style.borderColor = 'red'
        }

    }
  });
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formData = new FormData(form);
    let firstname = formData.get("firstname");
    let lastname = formData.get("lastname");
    let phone = formData.get("phone");
    let email = formData.get("email");
    let contract = formData.get("contract");
    let birthday = formData.get("birthday");
    let exp = formData.get("exp");
    let avatar = formData.get("avatar");

    let currentYear = Number(new Date().getFullYear());
    let birthdayYear = Number(new Date(birthday).getFullYear());
    let age = parseInt(currentYear - birthdayYear);
    if (age >= 18 && age <= 50) {
      employers.push(
        new Employer(
          firstname,
          lastname,
          phone,
          email,
          contract,
          birthday,
          exp,
          avatar
        )
      );
      listEmployer(employers, tableBody);
    }
  });
}

function listEmployer(employers, tableBody) {
  tableBody.innerHTML = "";
  for (let index = 0; index < employers.length; index++) {
    var newBlock = document.createElement("tr");
    for (let i = 0; i < employers[index].getList().length; i++) {
      let td = document.createElement("td");
      if (0 === i) {
        let image = document.createElement("img");
        image.src = employers[index].getList()[i][0];
        td.appendChild(image);
      } else {
        td.textContent = employers[index].getList()[i][0];
      }
      newBlock.appendChild(td);
    }
    let seeMore = document.createElement("i");
    seeMore.classList.add("fa-solid");
    seeMore.classList.add("fa-eye");
    seeMore.classList.add("see-more");
    seeMore.dataset.toggle = "modal";
    seeMore.dataset.target = "viewInfos";
    seeMore.setAttribute("data-bs-toggle", "modal");
    seeMore.setAttribute("data-bs-target", "#exampleModal");

    seeMore.addEventListener("click", () => {
      document.getElementById("monModal").innerHTML =
        "<p>" + "Téléphone: " + employers[index].phone + "</p>";
      document.getElementById("monModal").innerHTML +=
        "<p>" + "Email: " + employers[index].email + "</p>";
    });

    let td = document.createElement("td");
    td.appendChild(seeMore);
    newBlock.appendChild(td);
    tableBody.appendChild(newBlock);
  }
}
