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
    age: Number,
    favouriteFruit: fruitSchema
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

const watermelon = new Fruit({
    name: "Watermelon",
    rating: 10,
    review: "Yaaaaaaaaaaaaaasssss"
});

watermelon.save();


Person.updateOne({_id: "606dca9ffcf33e17fce0fa72"}, {favouriteFruit: watermelon}, (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Updated successfully");
        mongoose.connection.close();

    }
});

// Fruit.deleteOne({_id: "606dca9ffcf33e17fce0fa6e"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Deleted successfully");
//         mongoose.connection.close();
//     }
// });

// Person.deleteMany({name: "John Doe"}, (err) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log("Successfully deleted all specified instances");
//     }
// });

// find(Person);
