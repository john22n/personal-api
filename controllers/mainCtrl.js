var user = require('../user.js');
var skills = require('../skills.js');

module.exports = {
    showUser: function(req, res){
        return res.status(200).json(user);
},
    getName: function(req, res) {
        return res.status(200).json({"name":user.name});
    },
    getLocation: function (req, res) {
        return res.status(200).json({"location": user.location});

    },
    getOccupations: function(req, res) {
        var order = req.query.order;
        return res.status(200).json((order === 'desc') ? user.occupations.sort((a,b)=>a-b) : user.occupations.sort((a,b)=>a-b).reverse());
        // res.status(200).json({"occupations": user.occupations});
    },
    getLatestOccupation: function(req, res) {
        return res.status(200).json({"occupations":user.occupations.slice(-1)});
    },
    getHobbies: function(req, res) {
        var type = req.params.type;
        var filtered = user.hobbies.filter(function(hobbie) {
            return hobbie.type === type;
        });
        return res.status(200).json(filtered);
    },
    getFamily: function(req, res) {
        return res.status(200).json({"family": user.family})
    },
    getGender: function(req, res) {
        var gender = req.params.gender;
        var filtered = user.family.filter(function(fam) {
            return fam.gender === gender;
        });
        return res.status(200).json(filtered);
    },
    getRest: function(req, res) {
        console.log(req.query.rating);
        var rating = req.query.rating;
        if (req.query.rating) {
            var rests = user.restaurants.filter(function(val) {
                if (val.rating >= rating) {
                    return true
                } else {
                    return false
                }
            })
        } else {
            var rests = user.restaurants;
        }
        return res.status(200).json({"restaurants": rests});
    },
    getRestName: function(req, res) {
        var name = req.params.name;
        var filtered = user.restaurants.filter(function(food) {
            return food.name === name;
        });
        return res.status(200).json(filtered);
    },
    changeName: function(req, res) {
        var name = req.params.name;
        user.name = name;
        return res.status(200).json({"name": user.name});
    },
    changeLocation: function(req, res) {
        var newLocation = req.params.place;
        user.location = newLocation;
        return res.status(200).json(user.location);

    },
    addHobbie: function(req, res) {
        user.hobbies.push(req.query);
        res.status(200).json(user.hobbies);
    },
    //post


    postOccupation: function(req, res) {
        user.occupations.push(req.query);
        return res.status(200).json(user.occupations);
    },
    postFam: function(req, res) {
        user.family.push(req.query);
        return res.status(200).json(user.family);
    },
    postRestaurants: function(req, res) {
        user.restaurants.push(req.query);
        return res.status(200).json(user.restaurants);
    },
    getSkillz: function(req, res) {
        var experience = req.query.experience;
        if(experience) {
            var filtered = skills.filter(function (value) {
                return value.experience.includes(experience);
            });
        }
            else {
                return res.status(200).json(skills);
        }
        console.log(filtered);
        return res.status(200).json(filtered);

    },
    postSkill: function(req, res) {
        var id = req.body.id;
        var name = req.body.name;
        var experience = req.body.experience;
        skills.push(
            {
                "id": id,
                "name": name,
                "experience": experience
            }
        );
        res.status(200).json(skills);
    }






};