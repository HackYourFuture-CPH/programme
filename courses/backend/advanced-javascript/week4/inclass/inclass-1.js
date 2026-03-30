// Data
const names = ["Paul", "Andersen", "Jesus", "Christopher", "Helena"]
const friendships = [
    [false, true,  false, false, true],
    [true,  false, true,  false, true],
    [false, true,  false, true,  true],
    [false, false, true,  false, true],
    [true,  true,  true,  true,  false]
]

// Template / Blueprint
class Person{
    constructor(name){
        this.name = name
        this.friends = []
    }

    makeFriend(person) {
        this.friends.push(person)
    }

    toString() {
        return `Person { name: ${this.name} }`
    }
}

// instantiation
const people = names.map(name => new Person(name))

friendships.forEach((friendship_row, ii) => {
    console.log(`${ii} - ${friendship_row}, ${people[ii]}`)
    console.log(people[ii])
    friendship_row.forEach((friendship, jj) => {
        if(friendship) {
            people[ii].makeFriend(people[jj])
        }
    })
})
// person_A.makeFriend(person_B)
// person_B.makeFriend(person_A)

console.log(people)