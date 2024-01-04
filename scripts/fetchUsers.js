
//number of users **************************************************************************
async function getNumberOfUsers(){
    
    try {
    const url = `https://dummyjson.com/users`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Connection error to dummyDB`);
    }

    const data = await response.json();

    if (Array.isArray(data.users)) {
      let numb = data.users.length;
      return numb;
    } else {
      console.error("A resposta da API não é um array: ", data);
    }
  } catch (error) {
    console.error("Erro: ", error);
  }
};
getNumberOfUsers();


//get average age **************************************************************************
async function getAverageAge(){
    
    try {
    const url = `https://dummyjson.com/users`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Connection error to dummyDB`);
    }

    const data = await response.json();

    if (Array.isArray(data.users)) {
      
      const users = data.users;
      let sumOfAges = 0;
      users.forEach(user => {
        sumOfAges += user.age;
      });
      const averageAge = Math.round(sumOfAges / users.length);
      return averageAge;

    } else {
      console.error("A resposta da API não é um array: ", data);
    }
  } catch (error) {
    console.error("Erro on average age: ", error);
  }
};
getAverageAge();


//get gender of users **************************************************************************
async function getGenderOfUsers(){
    
    try {
    const url = `https://dummyjson.com/users`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Connection error to dummyDB`);
    }

    const data = await response.json();

    if (Array.isArray(data.users)) {
      
      const users = data.users;
      let genderCount = {
      male:0,
      female: 0,
      };
      users.forEach(user => {

        if (user.gender == 'male') {
        genderCount.male++;
      }
      else{
        genderCount.female++;
      }
    
      });
      
      return genderCount;

    } else {
      console.error("A resposta da API não é um array: ", data);
    }
    } catch (error) {
      console.error("Erro on gender count: ", error);
    }
};
getGenderOfUsers();


//get blood type **************************************************************************
async function getBloodtype(){
    
    try {
    const url = `https://dummyjson.com/users`;
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Connection error to dummyDB`);
    }

    const data = await response.json();

    if (Array.isArray(data.users)) {
      
      const users = data.users;
      
      let genderCount = {
      A_minus:0,
      A_plus: 0,
      B_minus: 0,
      B_plus: 0,
      O_minus: 0,
      O_plus:0,
      AB_minus:0,
      AB_plus:0,
      };
      users.forEach(user => {
        
        switch (user.bloodGroup) {
          case 'A−':
            genderCount.A_minus++;
            break;
          case 'A+':
            genderCount.A_plus++;
            break;
          case 'B−':
            genderCount.B_minus++;
            break;
          case 'B+':
            genderCount.B_plus++;
            break;
          case 'O−':
            genderCount.O_minus++;
            break;
          case 'O+':
            genderCount.O_plus++;
            break;
          case 'AB−':
            genderCount.AB_minus++;
            break;
                  
          default:
            genderCount.AB_plus++;
            break;
        }
    
      });
      
      return genderCount;

    } else {
      console.error("A resposta da API não é um array: ", data);
    }
    } catch (error) {
      console.error("Error on blood type: ", error);
    }
};
getBloodtype();

//expor list to route **************************************************************************
export default async function exportList() {
  const data = {
    //fazer fetch


  }  
  try {
    const numberOfUsers = await getNumberOfUsers();
    const averageAgeOfUsers = await getAverageAge();
    const genderOfUsers = await getGenderOfUsers();
    const bloodTypeOfUsers = await getBloodtype();
    let myObj = {
      "Number of users": numberOfUsers,
      "Average age of users": averageAgeOfUsers,
      "Gender of users": genderOfUsers,
      "Blood type of users": bloodTypeOfUsers,
    };
    return myObj;

    } catch (error) {
    console.error("Error in export list: ", error); 
    }
};

