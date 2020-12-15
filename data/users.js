const users = [
    {
        _id: "5fd85d9c9ffe45173c3e44d3",
        username: "admin",
        name: "Admin",
        email: "admin@gmail.com",
        phone: "111-111-111",
        role: "admin",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1600287614/FastFood%20Admin/o3q91psl9b2p5zu5db4c.jpg",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44d4",
        username: "user",
        name: "User",
        email: "user@gmail.com",
        phone: "222-222-222",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44d5",
        username: "chiaemi",
        name: "Chiamaka Ifeoma Opeyemi",
        email: "chiaemi@gmail.com",
        phone: "07081542206",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44d6",
        username: "kayodla",
        name: "Kayode Adeboye Tella",
        email: "kayodla@gmail.com",
        phone: "08101312057",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44d7",
        username: "toluwde",
        name: "Toluwani Cherechi Gbogboade",
        email: "toluwde@gmail.com",
        phone: "0909 992 9744",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44d8",
        username: "yusufwu",
        name: "Yusuf Egbochukwu",
        email: "yusufwu@gmail.com",
        phone: "2347066809379",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44d9",
        username: "lolaolwa",
        name: "Lola Olaoluwa",
        email: "lolaolwa@gmail.com",
        phone: "+2348029490206",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44da",
        username: "onomenkwu",
        name: "Onome Ndukwu",
        email: "onomenkwu@gmail.com",
        phone: "07037912203",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44db",
        username: "chimachi",
        name: "Chimamanda Simisola Uchechi",
        email: "chimachi@gmail.com",
        phone: "+2347055642043",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44dc",
        username: "akandide",
        name: "Akande Olufunmi Ayomide",
        email: "akandide@gmail.com",
        phone: "0905 166 0440",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44dd",
        username: "cherat",
        name: "Cherechi Jolayemi Latifat",
        email: "cherat@gmail.com",
        phone: "+234 815 415 1321",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44de",
        username: "rashenat",
        name: "Rasheedah Aminat",
        email: "rashenat@gmail.com",
        phone: "+234 804 400 2646",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44df",
        username: "titide",
        name: "Titilayo Ayomide",
        email: "titide@gmail.com",
        phone: "+234 709 958 3184",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e0",
        username: "makion",
        name: "Makinwa Sulaimon",
        email: "makion@gmail.com",
        phone: "07048871603",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e1",
        username: "ayebatuel",
        name: "Ayebatari Samuel",
        email: "ayebatuel@gmail.com",
        phone: "08052538370",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e2",
        username: "augustla",
        name: "Augustina Aminu Tella",
        email: "augustla@gmail.com",
        phone: "+234 803 842 3677",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e3",
        username: "chimameji",
        name: "Chimamanda Oladeji",
        email: "chimameji@gmail.com",
        phone: "09035829715",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e4",
        username: "King",
        name: "King Kong",
        email: "kong@gmail.com",
        phone: "333-333-333",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e5",
        username: "adaugola",
        name: "Adaugo Abiola",
        email: "adaugola@gmail.com",
        phone: "+234 708 435 0240",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    },
    {
        _id: "5fd85d9c9ffe45173c3e44e6",
        username: "iretitmi",
        name: "Ireti Tari Oluwakemi",
        email: "iretitmi@gmail.com",
        phone: "+234 810 479 6183",
        role: "user",
        image: "https://res.cloudinary.com/abdraqeeb/image/upload/v1602340141/Dispatch%20Users/ibc0hkyobju8bdiioe5n.png",
        password: "123456"
    }
];

export default users;