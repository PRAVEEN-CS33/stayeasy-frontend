export const accommodationsData = [
    {
        accommodation_id: 1,
        accommodation_name: "Green Valley PG",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5000 },
            { rent_amount: 6000 }
        ],
        preferred_by: "Students"
    },
    {
        accommodation_id: 2,
        accommodation_name: "Sunshine Hostel",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5000 }
        ],
        preferred_by: "Working Professionals"
    },
    {
        accommodation_id: 3,
        accommodation_name: "BlueSky Residency",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5500 },
            { rent_amount: 7000 }
        ],
        preferred_by: "Students"
    },
    {
        accommodation_id: 4,
        accommodation_name: "Cozy Corner PG",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 4700 }
        ],
        preferred_by: "Ladies"
    },
    {
        accommodation_id: 5,
        accommodation_name: "Palm Stay",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5200 }
        ],
        preferred_by: "Men"
    },
    {
        accommodation_id: 6,
        accommodation_name: "Dream Nest",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5800 },
            { rent_amount: 7500 }
        ],
        preferred_by: "All"
    },
    {
        accommodation_id: 7,
        accommodation_name: "Urban Hive PG",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 4800 }
        ],
        preferred_by: "Working Professionals"
    },
    {
        accommodation_id: 8,
        accommodation_name: "Skyline Living",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5300 }
        ],
        preferred_by: "Students"
    },
    {
        accommodation_id: 9,
        accommodation_name: "Hillview Hostel",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 5700 }
        ],
        preferred_by: "Ladies"
    },
    {
        accommodation_id: 10,
        accommodation_name: "Comfort Stay",
        sharingRents: [
            { rent_amount: 3500 },
            { rent_amount: 4900 }
        ],
        preferred_by: "All"
    }
];

export const bookingsData = [
    {
        id: 1,
        user_name: "John Doe",
        accommodation: "Green Valley PG",
        booking_status: "Confirmed",
        booking_date: "2025-04-10",
        check_in: "2025-04-15",
        check_out: "2025-04-20",
        amount: 5000
    },
    {
        id: 2,
        user_name: "Priya Sharma",
        accommodation: "Sunshine Hostel",
        booking_status: "Pending",
        booking_date: "2025-04-09",
        check_in: "2025-04-18",
        check_out: "2025-04-25",
        amount: 3000
    },
    {
        id: 3,
        user_name: 'Will jack',
        accommodation: "Dream Nest",
        booking_status: "Cancelled",
        booking_date: "2025-04-08",
        check_in: "2025-04-12",
        check_out: "2025-04-19",
        amount: 0
    },
    {
        id: 4,
        user_name: "Emily Watson",
        accommodation: "BlueSky Residency",
        booking_status: "Confirmed",
        booking_date: "2025-04-07",
        check_in: "2025-04-14",
        check_out: "2025-04-21",
        amount: 6200
    },
    {
        id: 5,
        user_name: "Akash Mehta",
        accommodation: "Urban Hive PG",
        booking_status: "Pending",
        booking_date: "2025-04-06",
        check_in: "2025-04-16",
        check_out: "2025-04-23",
        amount: 4000
    }
];

export const scheduleData = [
    {
        owner_id: 101,
        user_name: "Ravi Kumar",
        accommodation_name: "Green Valley PG",
        visit_date: "2025-04-12",
        scheduled_time: "10:30 AM",
        status: "Scheduled",
        contact: "9876543210",
        remarks: "Will come with parents",
        amount: 0
    },
    {
        owner_id: 102,
        user_name: "Meena Iyer",
        accommodation_name: "BlueSky Residency",
        visit_date: "2025-04-13",
        scheduled_time: "02:00 PM",
        status: "Visited",
        contact: "9765432109",
        remarks: "",
        amount: 0
    },
    {
        owner_id: 103,
        user_name: "Ankit Sharma",
        accommodation_name: "Urban Hive PG",
        visit_date: "2025-04-14",
        scheduled_time: "11:00 AM",
        status: "Cancelled",
        contact: "9876501234",
        remarks: "Rescheduled to next week",
        amount: 0
    },
    {
        owner_id: 104,
        user_name: "Priyanka Desai",
        accommodation_name: "Sunshine Hostel",
        visit_date: "2025-04-15",
        scheduled_time: "01:30 PM",
        status: "Scheduled",
        contact: "9845012345",
        remarks: "Coming with a friend",
        amount: 0
    },
    {
        owner_id: 105,
        user_name: "Arjun Reddy",
        accommodation_name: "Dream Nest",
        visit_date: "2025-04-16",
        scheduled_time: "09:00 AM",
        status: "Visited",
        contact: "9900123456",
        remarks: "Liked the place",
        amount: 0
    }
];
export const testAnalyticsData = {
    Bookings: {
        "Total Bookings Today": 2,
        "Total bookings this week": 16,
        "Total bookings this month": 50,
        "Total canceled bookings this month": 4,
        "Most booked property this month": {
            accommodation_id: 1,
            total: 25,
        },
        "Least booked property this month": {
            accommodation_id: 2,
            total: 5,
        },
        "Average stay days per booking": "4.25",
        "Longest stay booking this month": {
            booking_id: 36,
            accommodation_id: 1,
            user_id: 1,
            max: 10,
        },
        "Most common check-in day": 3,
    },
    Revenue: {
        "Total revenue this month": "99002.00",
        "Average rent per booking": "9000.18",
    },
    GuestEngagement: {
        "Most common booking preference": "Couples",
        "Visits converted into bookings this month": 3,
        "Percentage of scheduled visits converted to bookings": 15,
    },
    Visits: {
        "Total visits scheduled today": 2,
        "Total visits scheduled this week": 3,
        "Most visited property": {
            accommodation_id: 1,
            total: 20,
        },
        "Least visited property": {
            accommodation_id: 2,
            total: 5,
        },
    },
    PropertyPerformance: {
        "Overall occupancy rate": 75, // A numeric value; in your chart, it's plotted on a 0-100 scale
        "Highest occupancy rate property": {
            rate: 90,
            Accommodation: 1,
        },
        "Lowest occupancy rate property": {
            rate: 30,
            Accommodation: 2,
        },
        "Average booking lead days": "21.60",
        "Properties fully booked at least once per month": [1, 2, 3],
    },
    Reviews: {
        "New reviews received this month": 22,
        "Average rating across all properties": "4.55",
        "Highest-rated property": {
            accommodation_id: 1,
            total: 22,
            avg_rating: "4.55",
        },
        "Lowest-rated property": {
            accommodation_id: 2,
            total: 10,
            avg_rating: "3.90",
        },
    },
};


export const adminBookingsData = [
    {
        id: 1,
        accomId: "A001",
        accomName: "Sunset Villa",
        userId: "U101",
        userName: "Rahul Sharma",
        checkIn: "2025-04-20",
        checkOut: "2025-04-25",
        Amount: 12000,
        bookingDate: "2025-04-10",
        paymentStatus: "Paid",
        status: "pending",
        typeId: "T001",
        slots: 2,
        actions: ""
    },
    {
        id: 2,
        accomId: "A002",
        accomName: "Hilltop Resort",
        userId: "U102",
        userName: "Sneha Iyer",
        checkIn: "2025-04-15",
        checkOut: "2025-04-18",
        Amount: 8000,
        bookingDate: "2025-04-05",
        paymentStatus: "Unpaid",
        status: "confirmed",
        typeId: "T002",
        slots: 1,
        actions: ""
    },
    {
        id: 3,
        accomId: "A003",
        accomName: "Ocean View Homestay",
        userId: "U103",
        userName: "Ankit Verma",
        checkIn: "2025-04-22",
        checkOut: "2025-04-28",
        Amount: 15000,
        bookingDate: "2025-04-11",
        paymentStatus: "Paid",
        status: "canceled",
        typeId: "T003",
        slots: 3,
        actions: ""
    },
    {
        id: 4,
        accomId: "A004",
        accomName: "Green Leaf Cottage",
        userId: "U104",
        userName: "Pooja Nair",
        checkIn: "2025-04-30",
        checkOut: "2025-05-03",
        Amount: 9500,
        bookingDate: "2025-04-12",
        paymentStatus: "Paid",
        status: "confirmed",
        typeId: "T004",
        slots: 2,
        actions: ""
    },
    {
        id: 5,
        accomId: "A005",
        accomName: "Palm Tree Bungalow",
        userId: "U105",
        userName: "Ravi Kumar",
        checkIn: "2025-04-18",
        checkOut: "2025-04-21",
        Amount: 10000,
        bookingDate: "2025-04-09",
        paymentStatus: "Unpaid",
        status: "pending",
        typeId: "T005",
        slots: 1,
        actions: ""
    },
    {
        id: 6,
        accomId: "A006",
        accomName: "City Lights Apartment",
        userId: "U106",
        userName: "Neha Agarwal",
        checkIn: "2025-04-25",
        checkOut: "2025-04-28",
        Amount: 11000,
        bookingDate: "2025-04-13",
        paymentStatus: "Paid",
        status: "confirmed",
        typeId: "T006",
        slots: 2,
        actions: ""
    },
    {
        id: 7,
        accomId: "A007",
        accomName: "Lakeview Residency",
        userId: "U107",
        userName: "Kunal Mehta",
        checkIn: "2025-05-01",
        checkOut: "2025-05-04",
        Amount: 13000,
        bookingDate: "2025-04-14",
        paymentStatus: "Paid",
        status: "pending",
        typeId: "T007",
        slots: 3,
        actions: ""
    },
    {
        id: 8,
        accomId: "A008",
        accomName: "Mountain Top Cabin",
        userId: "U108",
        userName: "Divya Suresh",
        checkIn: "2025-04-19",
        checkOut: "2025-04-22",
        Amount: 12500,
        bookingDate: "2025-04-07",
        paymentStatus: "Unpaid",
        status: "canceled",
        typeId: "T008",
        slots: 1,
        actions: ""
    },
    {
        id: 9,
        accomId: "A009",
        accomName: "Riverside Haven",
        userId: "U109",
        userName: "Manoj Pillai",
        checkIn: "2025-04-23",
        checkOut: "2025-04-27",
        Amount: 10500,
        bookingDate: "2025-04-08",
        paymentStatus: "Paid",
        status: "confirmed",
        typeId: "T009",
        slots: 2,
        actions: ""
    },
    {
        id: 10,
        accomId: "A010",
        accomName: "Heritage Guest House",
        userId: "U110",
        userName: "Aarti Joshi",
        checkIn: "2025-04-26",
        checkOut: "2025-04-29",
        Amount: 9800,
        bookingDate: "2025-04-11",
        paymentStatus: "Unpaid",
        status: "pending",
        typeId: "T010",
        slots: 1,
        actions: ""
    }
];

export const adminAccommodations = [
    {
        accommodation_id: "A001",
        accommodation_name: "Sunset Villa",
        accommodation_types: "Villa",
        description: "A beautiful villa with an ocean view, perfect for relaxation.",
        address: "123 Sunset Blvd",
        city: "Goa",
        state: "Goa",
        pincode: "403001",
        gender_types: "All",
        preferred_by: "Couples, Families",
        actions: ""
    },
    {
        accommodation_id: "A002",
        accommodation_name: "Hilltop Resort",
        accommodation_types: "Resort",
        description: "A luxurious hilltop resort with spa and adventure activities.",
        address: "456 Hilltop Rd",
        city: "Manali",
        state: "Himachal Pradesh",
        pincode: "175131",
        gender_types: "All",
        preferred_by: "Adventure Seekers, Families",
        actions: ""
    },
    {
        accommodation_id: "A003",
        accommodation_name: "Ocean View Homestay",
        accommodation_types: "Homestay",
        description: "A cozy homestay with a scenic ocean view.",
        address: "789 Beachside Ave",
        city: "Kochi",
        state: "Kerala",
        pincode: "682001",
        gender_types: "Female",
        preferred_by: "Solo Female Travelers",
        actions: ""
    },
    {
        accommodation_id: "A004",
        accommodation_name: "Green Leaf Cottage",
        accommodation_types: "Cottage",
        description: "A rustic cottage surrounded by nature, perfect for a weekend getaway.",
        address: "101 Green Leaf St",
        city: "Shimla",
        state: "Himachal Pradesh",
        pincode: "171001",
        gender_types: "All",
        preferred_by: "Nature Lovers",
        actions: ""
    },
    {
        accommodation_id: "A005",
        accommodation_name: "Palm Tree Bungalow",
        accommodation_types: "Bungalow",
        description: "A luxurious bungalow with palm trees and a private pool.",
        address: "102 Palm Ave",
        city: "Kerala",
        state: "Kerala",
        pincode: "695014",
        gender_types: "Male",
        preferred_by: "Business Travelers, Solo Travelers",
        actions: ""
    },
    {
        accommodation_id: "A006",
        accommodation_name: "City Lights Apartment",
        accommodation_types: "Apartment",
        description: "A modern apartment located in the heart of the city.",
        address: "202 City Lights Blvd",
        city: "Mumbai",
        state: "Maharashtra",
        pincode: "400001",
        gender_types: "All",
        preferred_by: "Urban Travelers",
        actions: ""
    },
    {
        accommodation_id: "A007",
        accommodation_name: "Lakeview Residency",
        accommodation_types: "Residency",
        description: "A luxurious lakeside residency with world-class amenities.",
        address: "303 Lakeview Rd",
        city: "Nainital",
        state: "Uttarakhand",
        pincode: "263001",
        gender_types: "All",
        preferred_by: "Couples, Honeymooners",
        actions: ""
    },
    {
        accommodation_id: "A008",
        accommodation_name: "Mountain Top Cabin",
        accommodation_types: "Cabin",
        description: "A charming mountain cabin ideal for a peaceful retreat.",
        address: "404 Mountain Top",
        city: "Mussoorie",
        state: "Uttarakhand",
        pincode: "248179",
        gender_types: "All",
        preferred_by: "Adventure Seekers, Nature Lovers",
        actions: ""
    },
    {
        accommodation_id: "A009",
        accommodation_name: "Riverside Haven",
        accommodation_types: "Guest House",
        description: "A peaceful guest house by the river, ideal for relaxation.",
        address: "505 Riverside St",
        city: "Rishikesh",
        state: "Uttarakhand",
        pincode: "249201",
        gender_types: "All",
        preferred_by: "Yoga Enthusiasts, Solo Travelers",
        actions: ""
    },
    {
        accommodation_id: "A010",
        accommodation_name: "Heritage Guest House",
        accommodation_types: "Guest House",
        description: "A traditional guest house located in a historical neighborhood.",
        address: "606 Heritage Rd",
        city: "Jaipur",
        state: "Rajasthan",
        pincode: "302001",
        gender_types: "All",
        preferred_by: "History Buffs, Solo Travelers",
        actions: ""
    }
];
