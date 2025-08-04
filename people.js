class Person {
    
    static population = 0;
    static averageLifeExpectancy = 73;

    static increaseLifeExpectancy(years) {
        Person.averageLifeExpectancy += years;
    }
    
    constructor(name, age, employer) {
        this.name = name;
        this.age = age;
        this.employer = employer;


        Person.population += 1;
    }

    introduce() {
        console.log(`Hello, my name is ${this.name}. I am ${this.age} years old and I work for ${this.employer}.`);         
    }

     eat(food) {
        console.log(`${this.name} is eating ${food}. Yum!`);
}
}

const personOne = new Person('Alice', 30, 'TechCorp');
const personTwo = new Person('Bob', 25, 'HealthInc');

class laFosseTrainer extends Person {
    constructor(name, age) {
        super(name, age, 'LaFosse');
    } 
    
    teach (cohort) {
        console.log(`${this.name} is teaching the ${cohort} cohort.`);
    }
}



const emile = new laFosseTrainer('Emile', 35);
const shaun = new laFosseTrainer('Shaun', 40);
const simon = new laFosseTrainer('Simon', 45);

console.log(Person.averageLifeExpectancy); // 73
Person.increaseLifeExpectancy(5); // 78
console.log(Person.averageLifeExpectancy); // 78





