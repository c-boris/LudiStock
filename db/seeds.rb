
Listing.create!(user_id: 4,title:"Mon premier train en bois",age_id:4,category_id:1,state_id:2,price:46,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
listing = Listing.last
listing.header_image.attach(io: File.open(Rails.root.join('app/assets/peluche-1.avif')), filename: 'peluche-1.avif');
#Listing.create!(user_id: 2,title:"Mon premier train en bois",age_id:3,category_id:2,state_id:3,price:40,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 2,title:"Mon premier train en bois",age_id:1,category_id:3,state_id:2,price:41,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 3,title:"Mon premier train en bois",age_id:4,category_id:4,state_id:2,price:46,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 3,title:"Mon premier train en bois",age_id:5,category_id:5,state_id:2,price:40,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");
#Listing.create!(user_id: 3,title:"Mon premier train en bois",age_id:6,category_id:10,state_id:3,price:36,description:"Rails en bois. Une locomotive et deux wagons. Décors disponibles.");

