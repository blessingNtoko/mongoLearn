const mongoose = require('mongoose');

mongoose.connect(`mongodb://localhost:27017/fruitsDB`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const fruitSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "You have a name right?"]
      },
    rating: {
        type: Number,
        min: 1,
        max: 10
    },
    review: String
});

const personSchema = new mongoose.Schema({
    name: String,
    age: Number
});

const Fruit = mongoose.model("Fruit", fruitSchema);
const Person = mongoose.model("Person", personSchema);

function insertMany(model, arr) {
    model.insertMany(arr, (err) => {
        if (err) {
            console.log(`An error has occured - insertMany() ->`, err);
        } else {
            console.log("Successfully saved all the records to the database");
            mongoose.connection.close();
        }
    });
}

function find(model) {
    model.find((err, data) => {
        if (err) {
            console.log(`An error occured - ${model}.find() ->`, err);
        } else {
            data.forEach(record => {
                if (record.name) {
                    console.log(record.name);
                } else {
                    console.log(record);
                }
            });

            mongoose.connection.close();
        };
    });
};

const peach = new Fruit({
    name: "Peach",
    rating: 9,
    review: "Delicious"
});

const plum = new Fruit({
    // name: "Plum",
    rating: 10,
    review: "Ok, ok, I like it"
});

const jane = new Person({
    name: "Jane Doe",
    age: 23
});

const jack = new Person({
    name: "Jack Doe",
    age: 32
});

const sarah = new Person({
    name: "Sarah Conner",
    age: 29
});

insertMany(Fruit, [peach, plum]);
// insertMany(Person, [jane, jack, sarah]);

// find(Fruit);