const bookings = [
    {
        _id: "5fd8977b6e708a0b3c130200",
        reference: "R-2020-971797",
        vehicle: "5fd85d9c9ffe45173c3e44fa",
        user: "5fd85d9c9ffe45173c3e44dc",
        host: "5fd85d9c9ffe45173c3e44d4",
        status: "accepted",
        amount: 300,
        start_date: "2020-12-17",
        end_date: "2020-12-30",
        pick_up: "Bwari Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130201",
        reference: "R-2020-529268",
        vehicle: "5fd85d9c9ffe45173c3e44fb",
        user: "5fd85d9c9ffe45173c3e44dc",
        host: "5fd85d9c9ffe45173c3e44d5",
        status: "pending",
        amount: 500,
        start_date: "2020-12-20",
        end_date: "2020-12-24",
        pick_up: "Redeemed Street Dutse Baupma Abuja",
        isPaid: true,
        paidAt: "2020-12-20",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130202",
        reference: "R-2020-197615",
        vehicle: "5fd85d9c9ffe45173c3e44fc",
        user: "5fd85d9c9ffe45173c3e44dc",
        host: "5fd85d9c9ffe45173c3e44d5",
        status: "pending",
        amount: 800,
        start_date: "2020-12-17",
        end_date: "2020-12-31",
        pick_up: "Gwarinpa Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130203",
        reference: "R-2020-753664",
        vehicle: "5fd85d9c9ffe45173c3e44fd",
        user: "5fd85d9c9ffe45173c3e44dd",
        host: "5fd85d9c9ffe45173c3e44d5",
        status: "canceled",
        amount: "600",
        start_date: "2020-12-13",
        end_date: "2020-12-15",
        pick_up: "Jabi Lake Mall Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c130205",
        reference: "R-2020-955072",
        vehicle: "5fd85d9c9ffe45173c3e44fe",
        user: "5fd85d9c9ffe45173c3e44dd",
        host: "5fd85d9c9ffe45173c3e44d6",
        status: "finished",
        amount: 900,
        start_date: "2020-12-13",
        end_date: "2020-12-15",
        pick_up: "Central Business District Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130204",
        reference: "R-2020-178351",
        vehicle: "5fd85d9c9ffe45173c3e44ff",
        user: "5fd85d9c9ffe45173c3e44dd",
        host: "5fd85d9c9ffe45173c3e44d6",
        status: "rejected",
        amount: 500,
        start_date: "2020-12-05",
        end_date: "2020-12-09",
        pick_up: "Maitama Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c130206",
        reference: "R-2020-342954",
        vehicle: "5fd85d9c9ffe45173c3e4500",
        user: "5fd85d9c9ffe45173c3e44de",
        host: "5fd85d9c9ffe45173c3e44d7",
        status: "pending",
        amount: 900,
        start_date: "2020-12-29",
        end_date: "2021-01-03",
        pick_up: "Garki Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130207",
        reference: "R-2020-656021",
        vehicle: "5fd85d9c9ffe45173c3e4501",
        user: "5fd85d9c9ffe45173c3e44de",
        host: "5fd85d9c9ffe45173c3e44d7",
        status: "finished",
        amount: 450,
        start_date: "2020-12-28",
        end_date: "2020-12-31",
        pick_up: "Kuje Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130208",
        reference: "R-2020-241609",
        vehicle: "5fd85d9c9ffe45173c3e4502",
        user: "5fd85d9c9ffe45173c3e44de",
        host: "5fd85d9c9ffe45173c3e44d8",
        status: "pending",
        amount: 890,
        start_date: "2020-12-23",
        end_date: "2020-12-29",
        pick_up: "Abaji Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130209",
        reference: "R-2020-750251",
        vehicle: "5fd85d9c9ffe45173c3e4503",
        user: "5fd85d9c9ffe45173c3e44df",
        host: "5fd85d9c9ffe45173c3e44d8",
        status: "finished",
        amount: 1200,
        start_date: "2020-12-08",
        end_date: "2020-12-11",
        pick_up: "Wuse Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c13020a",
        reference: "R-2020-684152",
        vehicle: "5fd85d9c9ffe45173c3e4504",
        user: "5fd85d9c9ffe45173c3e44df",
        host: "5fd85d9c9ffe45173c3e44d8",
        status: "canceled",
        amount: 2000,
        start_date: "2020-11-06",
        end_date: "2020-11-09",
        pick_up: "Zuba, Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c13020b",
        reference: "R-2020-304021",
        vehicle: "5fd85d9c9ffe45173c3e4505",
        user: "5fd85d9c9ffe45173c3e44df",
        host: "5fd85d9c9ffe45173c3e44d9",
        status: "accepted",
        amount: 5000,
        start_date: "2020-12-25",
        end_date: "2020-12-28",
        pick_up: "Central business district Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c13020c",
        reference: "R-2020-663784",
        vehicle: "5fd85d9c9ffe45173c3e4506",
        user: "5fd85d9c9ffe45173c3e44df",
        host: "5fd85d9c9ffe45173c3e44d9",
        status: "pending",
        amount: 650,
        start_date: "2020-12-16",
        end_date: "2020-12-17",
        pick_up: "Mpape Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c13020d",
        reference: "R-2020-467692",
        vehicle: "5fd85d9c9ffe45173c3e4507",
        user: "5fd85d9c9ffe45173c3e44e0",
        host: "5fd85d9c9ffe45173c3e44d9",
        status: "rejected",
        amount: 500,
        start_date: "2020-12-14",
        end_date: "2020-12-15",
        pick_up: "Mpape Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c13020e",
        reference: "R-2020-609761",
        vehicle: "5fd85d9c9ffe45173c3e4508",
        user: "5fd85d9c9ffe45173c3e44e0",
        host: "5fd85d9c9ffe45173c3e44d9",
        status: "pending",
        amount: 800,
        start_date: "2020-12-18",
        end_date: "2020-12-20",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c13020f",
        reference: "R-2020-428842",
        vehicle: "5fd85d9c9ffe45173c3e4509",
        user: "5fd85d9c9ffe45173c3e44e0",
        host: "5fd85d9c9ffe45173c3e44da",
        status: "accepted",
        amount: 9000,
        start_date: "2020-12-21",
        end_date: "2020-12-25",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130210",
        reference: "R-2020-556587",
        vehicle: "5fd85d9c9ffe45173c3e450a",
        user: "5fd85d9c9ffe45173c3e44e1",
        host: "5fd85d9c9ffe45173c3e44da",
        status: "pending",
        amount: 780,
        start_date: "2020-12-13",
        end_date: "2020-12-18",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: true,
        paidAt: "2020-12-17",
        paymentResult: {
            id: "5fcf5a693eec6c2124437703",
            status: "success",
            update_time: "2020-12-09",
            email_address: "user@gmail.com"
        }
    },
    {
        _id: "5fd8977b6e708a0b3c130211",
        reference: "R-2020-552398",
        vehicle: "5fd85d9c9ffe45173c3e450b",
        user: "5fd85d9c9ffe45173c3e44e1",
        host: "5fd85d9c9ffe45173c3e44da",
        status: "canceled",
        amount: 6000,
        start_date: "2020-12-03",
        end_date: "2020-12-08",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c130212",
        reference: "R-2020-439513",
        vehicle: "5fd85d9c9ffe45173c3e450c",
        user: "5fd85d9c9ffe45173c3e44e1",
        host: "5fd85d9c9ffe45173c3e44db",
        status: "canceled",
        amount: 900,
        start_date: "2020-12-07",
        end_date: "2020-12-08",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c130213",
        reference: "R-2020-982128",
        vehicle: "5fd85d9c9ffe45173c3e450d",
        user: "5fd85d9c9ffe45173c3e44e1",
        host: "5fd85d9c9ffe45173c3e44db",
        status: "canceled",
        amount: 650,
        start_date: "2020-12-07",
        end_date: "2020-12-09",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: false
    },
    {
        _id: "5fd8977b6e708a0b3c130214",
        reference: "R-2020-451717",
        vehicle: "5fd85d9c9ffe45173c3e450d",
        user: "5fd85d9c9ffe45173c3e44e1",
        host: "5fd85d9c9ffe45173c3e44db",
        status: "rejected",
        amount: 550,
        start_date: "2020-12-05",
        end_date: "2020-12-07",
        pick_up: "Dutse Alhaji Abuja",
        isPaid: false
    }
];

export default bookings;