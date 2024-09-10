import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from "../components/Header";
import Footer from "../components/Footer";
import CenterLogo from '../components/CenterLogo.js';
import PageContainer from '../components/PageContainer.js';
import CustomCard from '../components/CustomCard.js';
import ProfileAvatar from '../components/ProfileAvatar';
import ProfileActions from '../components/ProfileActions';
import ChangePasswordDialog from '../components/ChangePasswordDialog';
import ChangeImageDialog from '../components/ChangeImageDialog';
import ReservationList from '../components/ReservationList';
import { Grid } from '@mui/material';
import { AuthContext } from '../contexts/authContext/index.jsx';
import { load_docs, push_img, pull_img_url, store_doc, get_docs_by_attribute, delete_doc_by_attribute, update_doc, load_docs_by_attributes, delete_doc } from '../services/firebase/persistenceManager.js';
import { auth } from '../services/firebase/confFirebase.js';

const Profile = () => {
    const { doSignInWithEmailAndPassword, doPasswordChange, doUpdateProfile } = useContext(AuthContext);
    const [currentUser, setCurrentUser] = useState(auth.currentUser);
    const {isAdmin} = useContext(AuthContext);
    const [openPassword, setOpenPassword] = useState(false);
    const [openImg, setOpenImg] = useState(false);
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRep, setNewPasswordRep] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [oldPasswordError, setOldPasswordError] = useState('');
    const [googleError, setGoogleError] = useState('');
    const [success, setSuccess] = useState('');
    const [img, setImg] = useState({});
    const [reservations, setReservations] = useState([]);
    const navigate = useNavigate();

   /* 
    const reservations = [
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr',parkingName: 'Central Parking', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-10-01 15:00', CheckOut: '2023-10-02 15:30', plate: 'ABC123', totalCost: 20.00, Services:[{name:'Car Wash', price: 20.00}, {name:'Valet Parking', price: 50.00}], uid: currentUser.uid },
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr', parkingName: 'Downtown Garage', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-11-15 16:00', CheckOut: '2025-11-16 16:30', plate: 'XYZ789', totalCost: 35.00, Services:[{name:'Tire Inflation',price: 10.00}, {name:'Battery Check', price: 60.00}], uid: currentUser.uid  },
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr', parkingName: 'Airport Lot A', parkingSpot: {name:'Car1', size: 'Car'}, CheckIn: '2023-12-05 17:00', CheckOut: '2023-12-07 18:00', plate: 'JKL456', totalCost: 50.00, Services:[{name:'Interior Cleaning',price: 30.00}, {name:'Premium Spot', price: 70.00}], uid: currentUser.uid  },
        { parkingId: 'bUvHDar4FkvSKzWc8Ljr', parkingName: 'City Center Parking', parkingSpot: {name:'Car2', size: 'Car'}, CheckIn: '2023-09-20 09:00', CheckOut: '2025-09-21 09:10', plate: 'MNO321', totalCost: 10.00, Services: [{name:'Helmet Storage',price: 40.00}, {name:'Bike Wash', price: 80.00}], uid: currentUser.uid  },
    ];
    

    const parks = [
    {
        "name": "City Center Parking Rome",
        "description": "Secure parking near famous landmarks.",
        "location": {
            "address": "Via Roma 10",
            "city": "Rome",
            "state": "ITA",
            "latitude": 41.902782,
            "longitude": 12.496366
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car1",
                "size": "Car"
            },
            {
                "name": "Moto1",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Helmet Storage",
                "price": 40
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.2
    },
    {
        "name": "Milano Centrale Parking",
        "description": "Affordable parking near Milano Centrale train station.",
        "location": {
            "address": "Piazza Duca d'Aosta",
            "city": "Milan",
            "state": "ITA",
            "latitude": 45.485562,
            "longitude": 9.204722
        },
        "timePrice": 2.5,
        "parkingSlots": [
            {
                "name": "Car2",
                "size": "Car"
            },
            {
                "name": "Truck1",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 60
            },
            {
                "name": "Interior Vacuuming",
                "price": 25
            },
            {
                "name": "Battery Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Napoli Seaside Parking",
        "description": "Spacious parking near the bay of Naples.",
        "location": {
            "address": "Via Partenope 25",
            "city": "Naples",
            "state": "ITA",
            "latitude": 40.839653,
            "longitude": 14.252431
        },
        "timePrice": 2.8,
        "parkingSlots": [
            {
                "name": "Car3",
                "size": "Car"
            },
            {
                "name": "Moto2",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Oil Change",
                "price": 50
            },
            {
                "name": "Full Detailing",
                "price": 120
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Florence Historical Center Parking",
        "description": "Exclusive parking in Florence's historical center.",
        "location": {
            "address": "Via dei Calzaiuoli 18",
            "city": "Florence",
            "state": "ITA",
            "latitude": 43.769562,
            "longitude": 11.255814
        },
        "timePrice": 3.2,
        "parkingSlots": [
            {
                "name": "Truck2",
                "size": "Truck"
            },
            {
                "name": "Car4",
                "size": "Car"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Wheel Alignment",
                "price": 100
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Downtown London Parking",
        "description": "Prime parking in downtown London.",
        "location": {
            "address": "10 Downing St",
            "city": "London",
            "state": "GBR",
            "latitude": 51.503363,
            "longitude": -0.127625
        },
        "timePrice": 5,
        "parkingSlots": [
            {
                "name": "Car5",
                "size": "Car"
            },
            {
                "name": "Moto3",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Fuel Refill",
                "price": 100
            },
            {
                "name": "Interior Vacuuming",
                "price": 35
            },
            {
                "name": "Battery Charging",
                "price": 20
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "New York Times Square Parking",
        "description": "Parking right in the heart of Times Square.",
        "location": {
            "address": "123 Main St",
            "city": "New York",
            "state": "USA",
            "latitude": 40.712776,
            "longitude": -74.005974
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car6",
                "size": "Car"
            },
            {
                "name": "Truck3",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 40
            },
            {
                "name": "Parking Guidance",
                "price": 10
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Seoul Namsan Parking",
        "description": "Convenient parking near Namsan Seoul Tower.",
        "location": {
            "address": "Namsan Seoul Tower",
            "city": "Seoul",
            "state": "KOR",
            "latitude": 37.551169,
            "longitude": 126.988226
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car16",
                "size": "Car"
            },
            {
                "name": "Moto9",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Interior Vacuuming",
                "price": 25
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Toronto CN Tower Parking",
        "description": "Parking near the iconic CN Tower in Toronto.",
        "location": {
            "address": "301 Front St W",
            "city": "Toronto",
            "state": "CAN",
            "latitude": 43.642566,
            "longitude": -79.387057
        },
        "timePrice": 5,
        "parkingSlots": [
            {
                "name": "Car17",
                "size": "Car"
            },
            {
                "name": "Truck7",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 70
            },
            {
                "name": "Full Detailing",
                "price": 120
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Vienna City Hall Parking",
        "description": "Parking with easy access to Vienna's City Hall.",
        "location": {
            "address": "Wiener Rathaus",
            "city": "Vienna",
            "state": "AUT",
            "latitude": 48.208174,
            "longitude": 16.373819
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car18",
                "size": "Car"
            },
            {
                "name": "Moto10",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Battery Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Lisbon Belem Parking",
        "description": "Close to the Belem Tower and other attractions.",
        "location": {
            "address": "Belem Tower",
            "city": "Lisbon",
            "state": "PRT",
            "latitude": 38.697556,
            "longitude": -9.206189
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car19",
                "size": "Car"
            },
            {
                "name": "Truck8",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Exterior Wax",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 20
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "San Francisco Golden Gate Parking",
        "description": "Parking with views of the Golden Gate Bridge.",
        "location": {
            "address": "Golden Gate Bridge",
            "city": "San Francisco",
            "state": "USA",
            "latitude": 37.819929,
            "longitude": -122.478255
        },
        "timePrice": 5.5,
        "parkingSlots": [
            {
                "name": "Car20",
                "size": "Car"
            },
            {
                "name": "Moto11",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 35
            },
            {
                "name": "Valet Parking",
                "price": 60
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Buenos Aires Plaza de Mayo Parking",
        "description": "Parking near Plaza de Mayo and other landmarks.",
        "location": {
            "address": "Plaza de Mayo",
            "city": "Buenos Aires",
            "state": "ARG",
            "latitude": -34.608329,
            "longitude": -58.371208
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car21",
                "size": "Car"
            },
            {
                "name": "Moto12",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Battery Charging",
                "price": 15
            },
            {
                "name": "Tire Check",
                "price": 10
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Hong Kong Victoria Harbour Parking",
        "description": "Scenic parking near Victoria Harbour.",
        "location": {
            "address": "Victoria Harbour",
            "city": "Hong Kong",
            "state": "HKG",
            "latitude": 22.29676,
            "longitude": 114.173825
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car22",
                "size": "Car"
            },
            {
                "name": "Truck9",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 75
            },
            {
                "name": "Full Detailing",
                "price": 130
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.9
    },
    {
        "name": "Seoul Namsan Parking",
        "description": "Convenient parking near Namsan Seoul Tower.",
        "location": {
            "address": "Namsan Seoul Tower",
            "city": "Seoul",
            "state": "KOR",
            "latitude": 37.551169,
            "longitude": 126.988226
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car16",
                "size": "Car"
            },
            {
                "name": "Moto9",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Interior Vacuuming",
                "price": 25
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Toronto CN Tower Parking",
        "description": "Parking near the iconic CN Tower in Toronto.",
        "location": {
            "address": "301 Front St W",
            "city": "Toronto",
            "state": "CAN",
            "latitude": 43.642566,
            "longitude": -79.387057
        },
        "timePrice": 5,
        "parkingSlots": [
            {
                "name": "Car17",
                "size": "Car"
            },
            {
                "name": "Truck7",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 70
            },
            {
                "name": "Full Detailing",
                "price": 120
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Vienna City Hall Parking",
        "description": "Parking with easy access to Vienna's City Hall.",
        "location": {
            "address": "Wiener Rathaus",
            "city": "Vienna",
            "state": "AUT",
            "latitude": 48.208174,
            "longitude": 16.373819
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car18",
                "size": "Car"
            },
            {
                "name": "Moto10",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Battery Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Lisbon Belem Parking",
        "description": "Close to the Belem Tower and other attractions.",
        "location": {
            "address": "Belem Tower",
            "city": "Lisbon",
            "state": "PRT",
            "latitude": 38.697556,
            "longitude": -9.206189
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car19",
                "size": "Car"
            },
            {
                "name": "Truck8",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Exterior Wax",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 20
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "San Francisco Golden Gate Parking",
        "description": "Parking with views of the Golden Gate Bridge.",
        "location": {
            "address": "Golden Gate Bridge",
            "city": "San Francisco",
            "state": "USA",
            "latitude": 37.819929,
            "longitude": -122.478255
        },
        "timePrice": 5.5,
        "parkingSlots": [
            {
                "name": "Car20",
                "size": "Car"
            },
            {
                "name": "Moto11",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 35
            },
            {
                "name": "Valet Parking",
                "price": 60
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Buenos Aires Plaza de Mayo Parking",
        "description": "Parking near Plaza de Mayo and other landmarks.",
        "location": {
            "address": "Plaza de Mayo",
            "city": "Buenos Aires",
            "state": "ARG",
            "latitude": -34.608329,
            "longitude": -58.371208
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car21",
                "size": "Car"
            },
            {
                "name": "Moto12",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Battery Charging",
                "price": 15
            },
            {
                "name": "Tire Check",
                "price": 10
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Hong Kong Victoria Harbour Parking",
        "description": "Scenic parking near Victoria Harbour.",
        "location": {
            "address": "Victoria Harbour",
            "city": "Hong Kong",
            "state": "HKG",
            "latitude": 22.29676,
            "longitude": 114.173825
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car22",
                "size": "Car"
            },
            {
                "name": "Truck9",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 75
            },
            {
                "name": "Full Detailing",
                "price": 130
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.9
    },
    {
        "name": "Seoul Namsan Parking",
        "description": "Convenient parking near Namsan Seoul Tower.",
        "location": {
            "address": "Namsan Seoul Tower",
            "city": "Seoul",
            "state": "KOR",
            "latitude": 37.551169,
            "longitude": 126.988226
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car16",
                "size": "Car"
            },
            {
                "name": "Moto9",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Interior Vacuuming",
                "price": 25
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Toronto CN Tower Parking",
        "description": "Parking near the iconic CN Tower in Toronto.",
        "location": {
            "address": "301 Front St W",
            "city": "Toronto",
            "state": "CAN",
            "latitude": 43.642566,
            "longitude": -79.387057
        },
        "timePrice": 5,
        "parkingSlots": [
            {
                "name": "Car17",
                "size": "Car"
            },
            {
                "name": "Truck7",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 70
            },
            {
                "name": "Full Detailing",
                "price": 120
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Vienna City Hall Parking",
        "description": "Parking with easy access to Vienna's City Hall.",
        "location": {
            "address": "Wiener Rathaus",
            "city": "Vienna",
            "state": "AUT",
            "latitude": 48.208174,
            "longitude": 16.373819
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car18",
                "size": "Car"
            },
            {
                "name": "Moto10",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Battery Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Lisbon Belem Parking",
        "description": "Close to the Belem Tower and other attractions.",
        "location": {
            "address": "Belem Tower",
            "city": "Lisbon",
            "state": "PRT",
            "latitude": 38.697556,
            "longitude": -9.206189
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car19",
                "size": "Car"
            },
            {
                "name": "Truck8",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Exterior Wax",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 20
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "San Francisco Golden Gate Parking",
        "description": "Parking with views of the Golden Gate Bridge.",
        "location": {
            "address": "Golden Gate Bridge",
            "city": "San Francisco",
            "state": "USA",
            "latitude": 37.819929,
            "longitude": -122.478255
        },
        "timePrice": 5.5,
        "parkingSlots": [
            {
                "name": "Car20",
                "size": "Car"
            },
            {
                "name": "Moto11",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 35
            },
            {
                "name": "Valet Parking",
                "price": 60
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Buenos Aires Plaza de Mayo Parking",
        "description": "Parking near Plaza de Mayo and other landmarks.",
        "location": {
            "address": "Plaza de Mayo",
            "city": "Buenos Aires",
            "state": "ARG",
            "latitude": -34.608329,
            "longitude": -58.371208
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car21",
                "size": "Car"
            },
            {
                "name": "Moto12",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Battery Charging",
                "price": 15
            },
            {
                "name": "Tire Check",
                "price": 10
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Hong Kong Victoria Harbour Parking",
        "description": "Scenic parking near Victoria Harbour.",
        "location": {
            "address": "Victoria Harbour",
            "city": "Hong Kong",
            "state": "HKG",
            "latitude": 22.29676,
            "longitude": 114.173825
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car22",
                "size": "Car"
            },
            {
                "name": "Truck9",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Valet Parking",
                "price": 75
            },
            {
                "name": "Full Detailing",
                "price": 130
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.9
    },
    {
        "name": "Florence Duomo Parking",
        "description": "Parking close to the iconic Florence Cathedral.",
        "location": {
            "address": "Piazza del Duomo",
            "city": "Florence",
            "state": "ITA",
            "latitude": 43.773083,
            "longitude": 11.255813
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car23",
                "size": "Car"
            },
            {
                "name": "Moto13",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Interior Vacuuming",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Venice St. Mark's Square Parking",
        "description": "Parking near the historic St. Mark's Square.",
        "location": {
            "address": "Piazza San Marco",
            "city": "Venice",
            "state": "ITA",
            "latitude": 45.434211,
            "longitude": 12.338045
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car24",
                "size": "Car"
            },
            {
                "name": "Truck10",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Valet Parking",
                "price": 50
            },
            {
                "name": "Helmet Storage",
                "price": 20
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Milan Cathedral Parking",
        "description": "Parking near the famous Milan Cathedral.",
        "location": {
            "address": "Piazza del Duomo",
            "city": "Milan",
            "state": "ITA",
            "latitude": 45.464211,
            "longitude": 9.191383
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car25",
                "size": "Car"
            },
            {
                "name": "Moto14",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 22
            },
            {
                "name": "Exterior Wax",
                "price": 30
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Naples Pompeii Parking",
        "description": "Convenient parking for visitors to Pompeii.",
        "location": {
            "address": "Via Villa dei Misteri",
            "city": "Naples",
            "state": "ITA",
            "latitude": 40.749413,
            "longitude": 14.481829
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car26",
                "size": "Car"
            },
            {
                "name": "Moto15",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 18
            },
            {
                "name": "Interior Vacuuming",
                "price": 12
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "Siena Piazza del Campo Parking",
        "description": "Parking with easy access to Piazza del Campo.",
        "location": {
            "address": "Piazza del Campo",
            "city": "Siena",
            "state": "ITA",
            "latitude": 43.318328,
            "longitude": 11.330357
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car27",
                "size": "Car"
            },
            {
                "name": "Truck11",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Polishing",
                "price": 25
            },
            {
                "name": "Battery Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Turin Mole Antonelliana Parking",
        "description": "Parking close to the Mole Antonelliana in Turin.",
        "location": {
            "address": "Via Montebello",
            "city": "Turin",
            "state": "ITA",
            "latitude": 45.070339,
            "longitude": 7.686864
        },
        "timePrice": 4.2,
        "parkingSlots": [
            {
                "name": "Car28",
                "size": "Car"
            },
            {
                "name": "Moto16",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Valet Parking",
                "price": 55
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Bologna Piazza Maggiore Parking",
        "description": "Parking in the central Piazza Maggiore area.",
        "location": {
            "address": "Piazza Maggiore",
            "city": "Bologna",
            "state": "ITA",
            "latitude": 44.493671,
            "longitude": 11.342651
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car29",
                "size": "Car"
            },
            {
                "name": "Truck12",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 15
            },
            {
                "name": "Exterior Wax",
                "price": 25
            },
            {
                "name": "Tire Check",
                "price": 10
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.2
    },
    {
        "name": "Palermo Teatro Massimo Parking",
        "description": "Parking near the grand Teatro Massimo.",
        "location": {
            "address": "Piazza Verdi",
            "city": "Palermo",
            "state": "ITA",
            "latitude": 38.115692,
            "longitude": 13.361267
        },
        "timePrice": 2.8,
        "parkingSlots": [
            {
                "name": "Car30",
                "size": "Car"
            },
            {
                "name": "Moto17",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 18
            },
            {
                "name": "Interior Vacuuming",
                "price": 12
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 10
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "Rome Colosseum Parking",
        "description": "Parking located near the historic Colosseum.",
        "location": {
            "address": "Piazza del Colosseo",
            "city": "Rome",
            "state": "ITA",
            "latitude": 41.89021,
            "longitude": 12.492231
        },
        "timePrice": 4.5,
        "parkingSlots": [
            {
                "name": "Car31",
                "size": "Car"
            },
            {
                "name": "Moto18",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Valet Parking",
                "price": 60
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Naples Piazza del Plebiscito Parking",
        "description": "Parking close to Piazza del Plebiscito in Naples.",
        "location": {
            "address": "Piazza del Plebiscito",
            "city": "Naples",
            "state": "ITA",
            "latitude": 40.848253,
            "longitude": 14.265658
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car32",
                "size": "Car"
            },
            {
                "name": "Truck13",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 22
            },
            {
                "name": "Interior Vacuuming",
                "price": 18
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Genoa Aquarium Parking",
        "description": "Parking near the famous Genoa Aquarium.",
        "location": {
            "address": "Piazzale A. De Gasperi",
            "city": "Genoa",
            "state": "ITA",
            "latitude": 44.407946,
            "longitude": 8.933956
        },
        "timePrice": 3.2,
        "parkingSlots": [
            {
                "name": "Car33",
                "size": "Car"
            },
            {
                "name": "Moto19",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Exterior Wax",
                "price": 28
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "Verona Arena Parking",
        "description": "Parking near the famous Verona Arena.",
        "location": {
            "address": "Piazza Bra",
            "city": "Verona",
            "state": "ITA",
            "latitude": 45.438255,
            "longitude": 10.994573
        },
        "timePrice": 3.8,
        "parkingSlots": [
            {
                "name": "Car34",
                "size": "Car"
            },
            {
                "name": "Moto20",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 20
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Bari Old Town Parking",
        "description": "Parking in the heart of Bari's Old Town.",
        "location": {
            "address": "Via Sparano",
            "city": "Bari",
            "state": "ITA",
            "latitude": 41.117143,
            "longitude": 16.871872
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car35",
                "size": "Car"
            },
            {
                "name": "Truck14",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 18
            },
            {
                "name": "Exterior Wax",
                "price": 22
            },
            {
                "name": "Tire Check",
                "price": 12
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Trieste Piazza Unità Parking",
        "description": "Parking with a view of Piazza Unità d'Italia in Trieste.",
        "location": {
            "address": "Piazza Unità d'Italia",
            "city": "Trieste",
            "state": "ITA",
            "latitude": 45.649526,
            "longitude": 13.776818
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car36",
                "size": "Car"
            },
            {
                "name": "Moto21",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Valet Parking",
                "price": 60
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Assisi Basilica Parking",
        "description": "Parking near the Basilica of Saint Francis of Assisi.",
        "location": {
            "address": "Piazza San Francesco",
            "city": "Assisi",
            "state": "ITA",
            "latitude": 43.070773,
            "longitude": 12.617467
        },
        "timePrice": 3.2,
        "parkingSlots": [
            {
                "name": "Car37",
                "size": "Car"
            },
            {
                "name": "Moto22",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Interior Vacuuming",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Pescara Beachfront Parking",
        "description": "Convenient parking along the Pescara beachfront.",
        "location": {
            "address": "Lungomare Papa Giovanni XXIII",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.463787,
            "longitude": 11.835014
        },
        "timePrice": 3,
        "parkingSlots": [
            {
                "name": "Car38",
                "size": "Car"
            },
            {
                "name": "Moto23",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 18
            },
            {
                "name": "Interior Vacuuming",
                "price": 12
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Pescara Central Station Parking",
        "description": "Parking near the main train station in Pescara.",
        "location": {
            "address": "Piazza della Stazione",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.46385,
            "longitude": 11.8608
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car39",
                "size": "Car"
            },
            {
                "name": "Truck15",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Valet Parking",
                "price": 45
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.2
    },
    {
        "name": "Pescara Port Parking",
        "description": "Parking available near Pescara's port area.",
        "location": {
            "address": "Molo Nord",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.4645,
            "longitude": 11.839055
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car40",
                "size": "Car"
            },
            {
                "name": "Moto24",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 22
            },
            {
                "name": "Exterior Wax",
                "price": 30
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "Pescara University Parking",
        "description": "Parking near the University of Pescara.",
        "location": {
            "address": "Viale Pindaro",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.464457,
            "longitude": 11.851267
        },
        "timePrice": 2.8,
        "parkingSlots": [
            {
                "name": "Car41",
                "size": "Car"
            },
            {
                "name": "Truck16",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 15
            },
            {
                "name": "Interior Vacuuming",
                "price": 10
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 12
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.1
    },
    {
        "name": "Pescara Hospital Parking",
        "description": "Parking for visitors and staff at Pescara Hospital.",
        "location": {
            "address": "Via Roma",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.462882,
            "longitude": 11.841981
        },
        "timePrice": 3.2,
        "parkingSlots": [
            {
                "name": "Car42",
                "size": "Car"
            },
            {
                "name": "Moto25",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Interior Vacuuming",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.3
    },
    {
        "name": "Pescara Shopping Mall Parking",
        "description": "Parking near a popular shopping mall in Pescara.",
        "location": {
            "address": "Via Carlo Maresca",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.462768,
            "longitude": 11.832176
        },
        "timePrice": 3.5,
        "parkingSlots": [
            {
                "name": "Car43",
                "size": "Car"
            },
            {
                "name": "Moto26",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 22
            },
            {
                "name": "Valet Parking",
                "price": 50
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Pescara Trade Fair Parking",
        "description": "Parking available for visitors to the Pescara Trade Fair.",
        "location": {
            "address": "Via Aterno",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.47035,
            "longitude": 11.845685
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car44",
                "size": "Car"
            },
            {
                "name": "Truck17",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Pescara Park and Ride",
        "description": "Park and ride facility for commuters near Pescara.",
        "location": {
            "address": "Via delle Caserme",
            "city": "Pescara",
            "state": "ITA",
            "latitude": 42.46993,
            "longitude": 11.860586
        },
        "timePrice": 2.5,
        "parkingSlots": [
            {
                "name": "Car45",
                "size": "Car"
            },
            {
                "name": "Moto27",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 15
            },
            {
                "name": "Interior Vacuuming",
                "price": 12
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.2
    },
    {
        "name": "Paris Eiffel Tower Parking",
        "description": "Convenient parking near the iconic Eiffel Tower in Paris.",
        "location": {
            "address": "Champ de Mars",
            "city": "Paris",
            "state": "FRA",
            "latitude": 48.858844,
            "longitude": 2.294351
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car46",
                "size": "Car"
            },
            {
                "name": "Moto28",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Valet Parking",
                "price": 70
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "London Buckingham Palace Parking",
        "description": "Parking near Buckingham Palace in London.",
        "location": {
            "address": "Buckingham Palace Road",
            "city": "London",
            "state": "GBR",
            "latitude": 51.501364,
            "longitude": -0.14189
        },
        "timePrice": 5.5,
        "parkingSlots": [
            {
                "name": "Car47",
                "size": "Car"
            },
            {
                "name": "Truck18",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Barcelona Sagrada Familia Parking",
        "description": "Parking close to the famous Sagrada Familia in Barcelona.",
        "location": {
            "address": "Carrer de Provença",
            "city": "Barcelona",
            "state": "ESP",
            "latitude": 41.403638,
            "longitude": 2.174355
        },
        "timePrice": 4.5,
        "parkingSlots": [
            {
                "name": "Car48",
                "size": "Car"
            },
            {
                "name": "Moto29",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 22
            },
            {
                "name": "Exterior Wax",
                "price": 28
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Rome Vatican Museums Parking",
        "description": "Parking near the Vatican Museums in Rome.",
        "location": {
            "address": "Viale Vaticano",
            "city": "Rome",
            "state": "ITA",
            "latitude": 41.906487,
            "longitude": 12.453781
        },
        "timePrice": 5,
        "parkingSlots": [
            {
                "name": "Car49",
                "size": "Car"
            },
            {
                "name": "Truck19",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 18
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Amsterdam Rijksmuseum Parking",
        "description": "Parking near the Rijksmuseum in Amsterdam.",
        "location": {
            "address": "Museumstraat",
            "city": "Amsterdam",
            "state": "NLD",
            "latitude": 52.360006,
            "longitude": 4.885282
        },
        "timePrice": 4,
        "parkingSlots": [
            {
                "name": "Car50",
                "size": "Car"
            },
            {
                "name": "Moto30",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Exterior Wax",
                "price": 25
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 15
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Berlin Brandenburg Gate Parking",
        "description": "Parking close to the Brandenburg Gate in Berlin.",
        "location": {
            "address": "Pariser Platz",
            "city": "Berlin",
            "state": "DEU",
            "latitude": 52.516275,
            "longitude": 13.377722
        },
        "timePrice": 5,
        "parkingSlots": [
            {
                "name": "Car51",
                "size": "Car"
            },
            {
                "name": "Truck20",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Valet Parking",
                "price": 55
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Vienna Schönbrunn Palace Parking",
        "description": "Parking near the Schönbrunn Palace in Vienna.",
        "location": {
            "address": "Schönbrunner Schlossstraße",
            "city": "Vienna",
            "state": "AUT",
            "latitude": 48.184741,
            "longitude": 16.312794
        },
        "timePrice": 4.5,
        "parkingSlots": [
            {
                "name": "Car52",
                "size": "Car"
            },
            {
                "name": "Moto31",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 22
            },
            {
                "name": "Interior Vacuuming",
                "price": 14
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Prague Old Town Square Parking",
        "description": "Parking near the historic Old Town Square in Prague.",
        "location": {
            "address": "Staroměstské náměstí",
            "city": "Prague",
            "state": "CZE",
            "latitude": 50.087465,
            "longitude": 14.421253
        },
        "timePrice": 3.8,
        "parkingSlots": [
            {
                "name": "Car53",
                "size": "Car"
            },
            {
                "name": "Moto32",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 18
            },
            {
                "name": "Valet Parking",
                "price": 40
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "New York Times Square Parking",
        "description": "Central parking near Times Square in New York City.",
        "location": {
            "address": "Broadway",
            "city": "New York",
            "state": "USA",
            "latitude": 40.758,
            "longitude": -73.9855
        },
        "timePrice": 8,
        "parkingSlots": [
            {
                "name": "Car54",
                "size": "Car"
            },
            {
                "name": "Moto33",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 35
            },
            {
                "name": "Valet Parking",
                "price": 80
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Los Angeles Hollywood Parking",
        "description": "Convenient parking near Hollywood Walk of Fame in Los Angeles.",
        "location": {
            "address": "Hollywood Blvd",
            "city": "Los Angeles",
            "state": "USA",
            "latitude": 34.0928,
            "longitude": -118.3287
        },
        "timePrice": 7,
        "parkingSlots": [
            {
                "name": "Car55",
                "size": "Car"
            },
            {
                "name": "Truck21",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 28
            },
            {
                "name": "Interior Vacuuming",
                "price": 20
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Tokyo Shibuya Crossing Parking",
        "description": "Parking near the bustling Shibuya Crossing in Tokyo.",
        "location": {
            "address": "Shibuya",
            "city": "Tokyo",
            "state": "JPN",
            "latitude": 35.6595,
            "longitude": 139.7004
        },
        "timePrice": 500,
        "parkingSlots": [
            {
                "name": "Car56",
                "size": "Car"
            },
            {
                "name": "Moto34",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 3000
            },
            {
                "name": "Exterior Wax",
                "price": 3500
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Sydney Opera House Parking",
        "description": "Parking close to the iconic Sydney Opera House.",
        "location": {
            "address": "Bennelong Point",
            "city": "Sydney",
            "state": "AUS",
            "latitude": -33.8568,
            "longitude": 151.2153
        },
        "timePrice": 10,
        "parkingSlots": [
            {
                "name": "Car57",
                "size": "Car"
            },
            {
                "name": "Truck22",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 40
            },
            {
                "name": "Valet Parking",
                "price": 90
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.8
    },
    {
        "name": "Dubai Burj Khalifa Parking",
        "description": "Parking near the tallest building in the world, the Burj Khalifa.",
        "location": {
            "address": "1 Sheikh Mohammed bin Rashid Blvd",
            "city": "Dubai",
            "state": "ARE",
            "latitude": 25.1972,
            "longitude": 55.2744
        },
        "timePrice": 15,
        "parkingSlots": [
            {
                "name": "Car58",
                "size": "Car"
            },
            {
                "name": "Moto35",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 50
            },
            {
                "name": "Interior Vacuuming",
                "price": 25
            },
            {
                "name": "Electric Vehicle Charging",
                "price": 20
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.7
    },
    {
        "name": "Rio de Janeiro Copacabana Parking",
        "description": "Parking near the famous Copacabana Beach in Rio de Janeiro.",
        "location": {
            "address": "Av. Atlântica",
            "city": "Rio de Janeiro",
            "state": "BRA",
            "latitude": -22.9711,
            "longitude": -43.1822
        },
        "timePrice": 8,
        "parkingSlots": [
            {
                "name": "Car59",
                "size": "Car"
            },
            {
                "name": "Moto36",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 30
            },
            {
                "name": "Exterior Wax",
                "price": 25
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    },
    {
        "name": "Buenos Aires Plaza de Mayo Parking",
        "description": "Parking near the historic Plaza de Mayo in Buenos Aires.",
        "location": {
            "address": "Plaza de Mayo",
            "city": "Buenos Aires",
            "state": "ARG",
            "latitude": -34.6083,
            "longitude": -58.3712
        },
        "timePrice": 6,
        "parkingSlots": [
            {
                "name": "Car60",
                "size": "Car"
            },
            {
                "name": "Truck23",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Valet Parking",
                "price": 45
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Cape Town Table Mountain Parking",
        "description": "Parking close to Table Mountain in Cape Town.",
        "location": {
            "address": "Table Mountain",
            "city": "Cape Town",
            "state": "ZAF",
            "latitude": -33.9658,
            "longitude": 18.6372
        },
        "timePrice": 7,
        "parkingSlots": [
            {
                "name": "Car61",
                "size": "Car"
            },
            {
                "name": "Moto37",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 25
            },
            {
                "name": "Interior Vacuuming",
                "price": 18
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.6
    },
    {
        "name": "Istanbul Hagia Sophia Parking",
        "description": "Parking near the historic Hagia Sophia in Istanbul.",
        "location": {
            "address": "Ayasofya Meydanı",
            "city": "Istanbul",
            "state": "TUR",
            "latitude": 41.0082,
            "longitude": 28.9802
        },
        "timePrice": 4.5,
        "parkingSlots": [
            {
                "name": "Car62",
                "size": "Car"
            },
            {
                "name": "Truck24",
                "size": "Truck"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 20
            },
            {
                "name": "Exterior Wax",
                "price": 22
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.5
    },
    {
        "name": "Mumbai Gateway of India Parking",
        "description": "Parking near the historic Gateway of India in Mumbai.",
        "location": {
            "address": "Apollo Bunder",
            "city": "Mumbai",
            "state": "IND",
            "latitude": 18.922,
            "longitude": 72.8347
        },
        "timePrice": 300,
        "parkingSlots": [
            {
                "name": "Car63",
                "size": "Car"
            },
            {
                "name": "Moto38",
                "size": "Moto"
            }
        ],
        "services": [
            {
                "name": "Car Wash",
                "price": 2000
            },
            {
                "name": "Interior Vacuuming",
                "price": 1500
            }
        ],
        "photo_urls": [
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Fmarco.cattaneo%40gmail.com_ProPic?alt=media&token=05f2b507-56f0-4806-80b4-6065aae9d6e3",
            "https://firebasestorage.googleapis.com/v0/b/parking-11ff0.appspot.com/o/UserImages%2Ftest%40gmail.com_ProPic?alt=media&token=2ef2b796-bfe0-4ba7-953a-b897d6103e6d"
        ],
        "avg_rating": 4.4
    }
];*/


    const handleOldChange = (event) => setOldPassword(event.target.value);
    const handleNewChange = (event) => setNewPassword(event.target.value);
    const handleNewRepChange = (event) => setNewPasswordRep(event.target.value);

    const handleOpenPasswordChange = () => setOpenPassword(true);
    const handleOpenImgChange = () => setOpenImg(true);
    const handleClosePassword = () => setOpenPassword(false);
    const handleCloseImg = () => setOpenImg(false);
;


    const storeReservations = async () => {

       /* parks.forEach(element => {
            store_doc(element, "Parking");
        });*/

    }

    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const day = String(date.getDate()).padStart(2, '0');
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        
        return `${year}-${month}-${day} ${hours}:${minutes}`;
    };

    const retrieveComments = async (reservations) => {
        try {
            let updatedReservations = [];
            
            // Create an array of promises for parallel execution
            const promises = reservations.map(async (element) => {
                try {
                    const retrievedComment = await load_docs_by_attributes("Comment", {
                        uid: currentUser.uid,
                        parkingId: element.parkingId.trim(),
                        'parkingSpot.name': element.parkingSpot.name
                    });
                    
                    return { ...element, comment: retrievedComment };
                } catch (error) {
                    console.error("Failed to retrieve comment for element:", element.doc_id, error);
                    return { ...element, comment: [] };
                }
            });
    
            updatedReservations = await Promise.all(promises);
            
            return updatedReservations;
        } catch (error) {
            console.error("Failed to retrieve comments:", error);
        }
    };

    const retrieveReservations = async () => {
        try{
            let newReservations = await get_docs_by_attribute(currentUser.uid, "Reservations", "uid");
            newReservations = await retrieveComments(newReservations);
            await retrieveComments(newReservations);
            setReservations(newReservations);
        }catch (error) {
            console.error("Failed to retrieve reservations:", error);
        }
    
    };

    
    useEffect(() => {
        retrieveReservations();
    }, [currentUser]); 

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
        }
    }, [isAdmin, navigate]);

    const handleChangePassword = async () => {
        
        setOldPasswordError('');
        setPasswordError('');
        setSuccess('');
        setGoogleError('');

        if (currentUser.emailVerified) {
            setGoogleError('You cannot change the Google account credential here.');
            return;
        }

        if (newPassword !== newPasswordRep) {
            setPasswordError('New passwords do not match.');
            return;
        }
        if (newPassword.length < 6) {
            setPasswordError("Password should be at least 6 characters.");
            return;
        }

        try {
            const result = await doSignInWithEmailAndPassword(currentUser.email, oldPassword, null);
            if (!result) {
                setOldPasswordError('Wrong Old password');
                return;
            }
        } catch (error) {
            console.log(error);
        }

        try {
            const result = await doPasswordChange(newPassword);
            if (result) {
                setOldPassword('');
                setNewPassword('');
                setNewPasswordRep('');
                setSuccess('Password changed correctly!');
                setTimeout(() => setSuccess(''), 5000);
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleChangeImg = async () => {

        setSuccess('');
        setGoogleError('');

        if (currentUser.emailVerified) {
            setGoogleError('You cannot change the Google image here.');
            return;
        }

        try {
            // Upload the image and retrieve the URL once the upload is successful
            const snapshot = await push_img(`UserImages/${currentUser.email}_ProPic`, img, async (snapshot) => {
                const url = await pull_img_url(snapshot.ref.fullPath);
                
                // Set the photoURL of the current user with the retrieved URL
                await doUpdateProfile({ photoURL: url });

                let oldUserImage = await get_docs_by_attribute(currentUser.uid, "UserImage", "uid");
                if (oldUserImage.length === 0) {
                    let userImage = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        photoURL: url
                    };
                
                    await store_doc(userImage, "UserImage", () => console.log('done'), (error) => console.log('error'));
                } else {
                    let userImage = {
                        uid: currentUser.uid,
                        email: currentUser.email,
                        photoURL: url
                    };
                    await update_doc(userImage, "UserImage", oldUserImage[0].doc_id,
                        () => console.log('error'), 
                        () => console.log('done'), 
                        () => console.log('not exists'));
                }
                
            
                
                console.log("Profile updated successfully.");
                setSuccess('Image changed correctly!');
                setTimeout(() => {
                    setSuccess("");
                    handleCloseImg();
                }, 4000);

            });
    
        } catch (error) {
            console.error("An error occurred while uploading the image or updating the profile:", error);
        } 
    };

    const handleDeleteReservation = async (selectedReservation) => { 
        
        try{
            await delete_doc_by_attribute("Reservations", "code", selectedReservation.code);
           
            let newReservations = reservations.filter(item => item !== selectedReservation);
            setReservations(newReservations); 

        }catch (error) {
            console.error("Failed to delete reservation:", error);
        }
    }

    const handleDeleteComment = async (reservation) => {
        try {
            await delete_doc("Comment", reservation.comment[0].doc_id);
    
            const commentPark = await load_docs_by_attributes("Comment", { "parkingId": reservation.parkingId.trim() });
    
            let newAvgRating = 0;
            if (commentPark.length > 0) {
                const totalRating = commentPark.reduce((sum, comment) => sum + comment.rating, 0);
                newAvgRating = totalRating / (commentPark.length + 1);
            }
    
            await update_doc({ avg_rating: newAvgRating }, "Parking", reservation.parkingId.trim());
            retrieveReservations();
        } catch (error) {
            console.error("Failed to delete comment:", error);
        }
    };
    const handleAddComment = async (reservation, text, rating) => {
        let now = new Date();
        now = formatDate(now);

        let comment = {
            'uid': currentUser.uid,
            'text': text,
            'date': now,
            'rating': rating,
            'parkingId': reservation.parkingId.trim(),
            'parkingSpot': reservation.parkingSpot
        }

        try {
            await store_doc(comment, "Comment");
            const park = await load_docs("Parking", comment.parkingId.trim());
            const commentPark = await load_docs_by_attributes("Comment", { "parkingId" : comment.parkingId.trim()});
            
            if (commentPark.length > 0) {
                let updatedAvg = (park.avg_rating+comment.rating)/(commentPark.length + 1);
                await update_doc({ avg_rating: updatedAvg }, "Parking", comment.parkingId.trim());
            }else{
                await update_doc({ avg_rating: comment.rating }, "Parking", comment.parkingId.trim());
            }
            retrieveReservations();
        } catch (error) {
            console.error("Failed to push comment:", error);
        }
    };


    return (
        <>
            <Header page={"Profile"} />
            <CenterLogo />
            <PageContainer>
                <Grid container spacing={2} alignItems="flex-start" justifyContent="center" sx={{ marginTop: '20px' }}>
                    <Grid item xs={12} md={4}>
                        <CustomCard
                            horizontal={false}
                            maxWidth="300px"
                            contentWidth="100%"
                            img={currentUser?.photoURL || '/default-profile.png'}
                            children={
                                <>
                                    <ProfileAvatar displayName={currentUser?.displayName} photoURL={currentUser?.photoURL} email={currentUser?.email} />
                                    <ProfileActions onChangeImageClick={handleOpenImgChange} onChangePasswordClick={handleOpenPasswordChange} />
                                </>
                            }
                        />
                    </Grid>
                    <Grid item xs={12} md={8} sx={{ display: 'flex', justifyContent: 'center' }}>
                      <ReservationList reservations={reservations} deleteFunction={handleDeleteReservation} currentUser={currentUser} deleteCommentFunction={handleDeleteComment} addCommentFunction={handleAddComment} />
                    </Grid>
                </Grid>
            </PageContainer>
            <ChangePasswordDialog 
                open={openPassword} 
                onClose={handleClosePassword} 
                onChangePassword={handleChangePassword} 
                passwordData={{ oldPassword, newPassword, newPasswordRep, handleOldChange, handleNewChange, handleNewRepChange, oldPasswordError, passwordError, googleError, success }} 
            />
            <ChangeImageDialog 
                open={openImg} 
                onClose={handleCloseImg} 
                onChangeImg={handleChangeImg} 
                imageData={{ handleSetImage: setImg, googleError, success }} 
            />
            <Footer />
        </>
    );
}

export default Profile;