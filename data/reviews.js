const reviews = [
    {
        _id: "5fd8977b6e708a0b3c130215",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e5",
        vehicle: "5fd85d9c9ffe45173c3e44fa"
    },
    {
        _id: "5fd8977b6e708a0b3c130216",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 3,
        user: "5fd85d9c9ffe45173c3e44e5",
        vehicle: "5fd85d9c9ffe45173c3e44fa"
    },
    {
        _id: "5fd8977b6e708a0b3c130217",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 2,
        user: "5fd85d9c9ffe45173c3e44e5",
        vehicle: "5fd85d9c9ffe45173c3e44fa"
    },
    {
        _id: "5fd8977b6e708a0b3c130218",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 4,
        user: "5fd85d9c9ffe45173c3e44e4",
        vehicle: "5fd85d9c9ffe45173c3e44fa"
    },
    {
        _id: "5fd8977b6e708a0b3c130219",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e4",
        vehicle: "5fd85d9c9ffe45173c3e44fa"
    },
    {
        _id: "5fd8977b6e708a0b3c13021a",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e4",
        vehicle: "5fd85d9c9ffe45173c3e44fc"
    },
    {
        _id: "5fd8977b6e708a0b3c13021b",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 4,
        user: "5fd85d9c9ffe45173c3e44e3",
        vehicle: "5fd85d9c9ffe45173c3e44fc"
    },
    {
        _id: "5fd8977b6e708a0b3c13021c",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 2,
        user: "5fd85d9c9ffe45173c3e44e3",
        vehicle: "5fd85d9c9ffe45173c3e44fc"
    },
    {
        _id: "5fd8977b6e708a0b3c13021d",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 1,
        user: "5fd85d9c9ffe45173c3e44e3",
        vehicle: "5fd85d9c9ffe45173c3e44fc"
    },
    {
        _id: "5fd8977b6e708a0b3c13021e",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e3",
        vehicle: "5fd85d9c9ffe45173c3e44fd"
    },
    {
        _id: "5fd8977b6e708a0b3c13021f",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 4,
        user: "5fd85d9c9ffe45173c3e44e3",
        vehicle: "5fd85d9c9ffe45173c3e44fd"
    },
    {
        _id: "5fd8977b6e708a0b3c130220",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 3,
        user: "5fd85d9c9ffe45173c3e44e2",
        vehicle: "5fd85d9c9ffe45173c3e44fd"
    },
    {
        _id: "5fd8977b6e708a0b3c130221",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 2,
        user: "5fd85d9c9ffe45173c3e44e2",
        vehicle: "5fd85d9c9ffe45173c3e44fd"
    },
    {
        _id: "5fd8977b6e708a0b3c130222",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e2",
        vehicle: "5fd85d9c9ffe45173c3e44fe"
    },
    {
        _id: "5fd8977b6e708a0b3c130223",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e1",
        vehicle: "5fd85d9c9ffe45173c3e44fe"
    },
    {
        _id: "5fd8977b6e708a0b3c130224",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e1",
        vehicle: "5fd85d9c9ffe45173c3e44fe"
    },
    {
        _id: "5fd8977b6e708a0b3c130225",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e1",
        vehicle: "5fd85d9c9ffe45173c3e44fe"
    },
    {
        _id: "5fd8977b6e708a0b3c130226",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 5,
        user: "5fd85d9c9ffe45173c3e44e0",
        vehicle: "5fd85d9c9ffe45173c3e44ff"
    },
    {
        _id: "5fd8977b6e708a0b3c130227",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 3,
        user: "5fd85d9c9ffe45173c3e44df",
        vehicle: "5fd85d9c9ffe45173c3e44ff"
    },
    {
        _id: "5fd8977b6e708a0b3c130228",
        title: "Lorem ipsum",
        text: "Lorem ipsum dolor sit amet, consectetur adipisicing elit.",
        rating: 3,
        user: "5fd85d9c9ffe45173c3e44de",
        vehicle: "5fd85d9c9ffe45173c3e44ff"
    },
];

export default reviews;