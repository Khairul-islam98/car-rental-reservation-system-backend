# Car Rental Reservation System

## Live link:

https://car-rental-reservation-system-six.vercel.app

## Key Features

- Authentication: The application is secured by JWT authentication method
- Authorization: Only authorized person can access the protected resources

### Models:

- User: name, email, role, password, phone, address
- Car: name, description, color, isElectric, status, features, pricePerHour, isDeleted
- Booking: date, user, car, startTime, endTime, totalCost

### Endpoints:

1. Sign Up: (POST) /api/auth/signup
2. Sign In: (POST) /api/auth/signin
3. Create a Car: (POST) /api/cars (Only accessible to the Admin)
4. Get All Cars: (GET) /api/cars
5. Get A Car: (GET) /api/cars/:id
6. Update A Car: (PUT) /api/cars/:id (Only Accessible to the Admin)
7. Delete A Car: (DELETE) [SOFT DELETE] /api/cars/:id (Only Accessible to the Admin)
8. Get All Bookings: (GET) /api/bookings (Accessible to the Admin)
9. Book a Car: (POST) /api/bookings (Only Accessible to the User)
10. Get User's Bookings: (GET) /api/bookings/my-bookings (Only Accessible To the User)
11. Return The Car: (PUT) /api/cars/return (Only Accessible To Admin)

# How to run the application locally

1. Clone the repository

```
https://github.com/Khairul-islam98/car-rental-reservation-system-backend.git
```

2. Project open

```
cd car-rental-reservation-system-backend
```

3. install the required packages

```
npm i
```

4. Add a .env file

```
PORT=
DATABASE_URL=
BCRYPT_SALT_ROUNDS=
JWT_ACCESS_SECRET=
```

5. Run the Application locally

```
npm run start:dev
```
