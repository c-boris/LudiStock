User.create!(email: 'user1@gmail.com',password:'123456');
User.create!(email: 'user2@gmail.com',password:'123456');
User.create!(email: 'user3@gmail.com',password:'123456');

Age.create!(value: 1, label: "0-12 month");
Age.create!(value: 2, label: "12-24 month");
Age.create!(value: 3, label: "2-3 years");
Age.create!(value: 4, label: "4-6 years");
Age.create!(value: 5, label: "7-9 years");
Age.create!(value: 6, label: "10 years and more");

State.create!(value: 1, label: "like new");
State.create!(value: 2, label: "very good condition");
State.create!(value: 3, label: "good condition");
State.create!(value: 4, label: "fair condition");

Category.create!(value: 1, label: "Wooden toys");
Category.create!(value: 2, label: "Educational games");
Category.create!(value: 3, label: "Puzzles");
Category.create!(value: 4, label: "Board games");
Category.create!(value: 5, label: "Creative hobbies");
Category.create!(value: 6, label: "Books");
Category.create!(value: 7, label: "Music");
Category.create!(value: 8, label: "Developmental toys");
Category.create!(value: 9, label: "Construction games");
Category.create!(value: 10, label: "Imitation toys");
Category.create!(value: 11, label: "Figures");
Category.create!(value: 12, label: "Trains and cars");
Category.create!(value: 13, label: "Comforters and cuddly toys");
Category.create!(value: 14, label: "Dolls");
Category.create!(value: 15, label: "Electronic toys");
Category.create!(value: 16, label: "Carriers and trotters");
Category.create!(value: 17, label: "Playmobil");
Category.create!(value: 18, label: "Lego and Duplo");



#Listing.create!(user_id: 1,title:"Mon premier train en bois",age_id:4,category_id:1,state_id:2,price:46,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 2,title:"Mon premier train en bois",age_id:3,category_id:2,state_id:3,price:40,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 2,title:"Mon premier train en bois",age_id:1,category_id:3,state_id:2,price:41,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 3,title:"Mon premier train en bois",age_id:4,category_id:4,state_id:2,price:46,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 3,title:"Mon premier train en bois",age_id:5,category_id:5,state_id:2,price:40,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 3,title:"Mon premier train en bois",age_id:6,category_id:10,state_id:3,price:36,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");

