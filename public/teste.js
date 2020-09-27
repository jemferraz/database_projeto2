[
    {
        "Nome": "Flávio Oliveira",
        "Cargo": "Desenvolvedor Front-end",
        "Idade": 32,
        "Experiencia": 6,
        "Skills": [ "HTML", "CSS", "JavaScript", "React", "Angular"],
        "Salario": 14000.00
    },
    {
        "Nome": "Tony Stark",
        "Cargo": "Cientista de Dados",
        "Idade": 35,
        "Experiencia": 11,
        "Categoria": "Sênior",
        "Skills": ["Python","R", "TensorFlow", "Keras", "SQL", "NoSQL"]
    },
    {
        "Nome": "Glória Menezes",
        "Cargo": "Desenvolvedor Front-end",
        "Idade": 28,
        "Experiencia": 4,
        "Skills": ["HTML", "CSS", "JavaScript", "React", "Vue"]
    },
    {
        "Nome": "Peter Park",
        "Cargo": "Desenvolvedor Back-end",
        "Idade": 26,
        "Experiencia": 2,
        "Categoria": "Júnior",
        "Skills": ["Node","PHP", "Laravel", "SQL", "NoSQL"],
        "Salario" : 10500.00        
    },
    {
        "Nome": "Mary Jane Watson",
        "Cargo": "Desenvolvedor Back-end",
        "Idade": 27,
        "Experiencia": 2,
        "Skills": ["Node", "GraphQL", "SQL", "NoSQL"],
        "Salario": 10500.00
    }
]

db.devs.aggregate([
    {
        $group : {
            _id: "$Cargo",
            avgAge : {$avg: "$Idade"},
            maxAge : {$max: "$Idade"}
        } 
    },
    {}
])


//9
db.restaurants.find({$and : [{"grades.score": {$gt: 80}}, {"grades.score": {$lt: 100}}]}, {restaurant_id: 1, name: 1, cuisine: 1, _id: 0, zip_code: 1}).pretty()

//10
db.restaurants.find({"grades.score": {$gt: 100}}, {restaurant_id: 1, name: 1, cuisine: 1, _id: 0, zip_code: 1}).count()

//11
db.restaurants.find({"address.coord.0": {$lt: -95.754168}}, {restaurant_id: 1, name: 1, cuisine: 1, _id: 0, zip_code: 1}).pretty()

//12
db.restaurants.find({$and : [{"cuisine": {$ne: "American "}}, {"grades.score": {$gt: 70}}, {"address.coord.0": {$lt: -65.754168}} ]}, {restaurant_id: 1, name: 1, cuisine: 1, _id: 0, zip_code: 1}).pretty()

//13
db.restaurants.find({$and : [{"cuisine": {$ne: "American "}}, {"grades.score": {$gt: 70}}, {"address.coord.1": {$lt: -65.754168}} ]}, {restaurant_id: 1, name: 1, cuisine: 1, _id: 0, zip_code: 1}).pretty()

//14
db.restaurants.find({$and : [{"borough": "Bronx"}, {"cuisine" : {$in: ["American ", "Chinese"] } }]}, {restaurant_id: 1, name: 1, cuisine: 1, _id: 0, zip_code: 1}).sort({cuisine: 1}).pretty()

//15




db.devs.update(
    { Nome: "Peter Park"},
    { $set : { Nome : "Peter Parker", Categoria : "Pleno"} }
)

db.devs.update(
    { Cargo: "Desenvolvedor Back-end"},
    { $set : { Salario : 20000 } },
    { multi: true}
)

db.devs.update(
    { Nome: "Mary Jane Watson"},
    { $set : { Categoria : "Pleno" } }
)

db.devs.remove({"_id" : ObjectId("5f694482671001b47418a3aa") })