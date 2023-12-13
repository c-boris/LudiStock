User.create!(email: 'user1@gmail.com',password:'123456',admin:false);
User.create!(email: 'user2@gmail.com',password:'123456',admin:false);
User.create!(email: 'user3@gmail.com',password:'123456',admin:false);

Age.create!(value: 1, label: "0-12 month");
Age.create!(value: 2, label: "12-24 month");
Age.create!(value: 3, label: "2-3 years");
Age.create!(value: 4, label: "4-6 years");
Age.create!(value: 5, label: "7-9 years");
Age.create!(value: 6, label: "10 years and more");

State.create!(value: 1, label: "new");
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

path1='app/assets/photo-1.avif'
name1='photo-1.avif'
path2='app/assets/photo-2.avif'
name2='photo-2.avif'
path3='app/assets/photo-3.avif'
name3='photo-3.avif'
path4='app/assets/photo-train-1.avif'
name4='photo-train-1.avif'

listing = Listing.new(user_id: 1,title:"Mon premier jouet en bois",age_id:4,category_id:1,state_id:2,price:26,description:"Différentes formes: cubes, triangles, rectangles. 56 pièces au total.");
listing.header_image.attach(io: File.open(path1), filename: name1)
listing.save!
listing = Listing.new(user_id: 1,title:"Mes premières peluches",age_id:4,category_id:14,state_id:1,price:30,description:"Deux peluches de taille 36 cm.");
listing.header_image.attach(io: File.open(path2), filename: name2)
listing.save!
listing = Listing.new(user_id: 2,title:"Figurine de cow boy",age_id:4,category_id:14,state_id:1,price:12,description:"Une figurine de taille 22 cm.");
listing.header_image.attach(io: File.open(path3), filename: name3)
listing.save!
listing = Listing.new(user_id: 3,title:"Mon premier train en bois",age_id:5,category_id:1,state_id:2,price:22,description:"Train complet en bois avec 26 pièces, une locomotive et deux wagons + décors");
listing.header_image.attach(io: File.open(path4), filename: name4)
listing.save!
