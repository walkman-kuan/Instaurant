/*
 * Define the Data Structure for the owner data stored in Firebase Realtime Database.
 * The data structure follows the ideas of avoid nesting data and flaten data structure, which is
 * presented at https://firebase.google.com/docs/database/web/structure-data#avoid_nesting_data
 *
 * The entities are owners, ownerProfiles, categories, dishes, and qrCodes.
 */

const ownerDataStructure = {
    'firebase-realtime-database': {
        // Owners contains only the unique ID of the owner stored
        // under the owner's unique ID
        owners: {
            owner1Id: {
                id: 'idOfOwner1',
            },
            owner2Id: {
                id: 'idOfOwner2',
            },
        },

        // Owner profiles is stored under the owner's unique ID
        ownerProfiles: {
            owner1Id: {
                firstName: 'firstNameOfOwner1',
                lastName: 'lastNameOfOwner1',
                businessName: 'businessNameOfOwner1',
                email: 'emailOfOnwer1',
                phone: 'phoneOfOwner1',
                // Each owner has a base URL, e.g., https://www.instaurant.com?ownerId=idOfOwner1
                baseUrl: 'baseUrlOfOwner1',
            },
            owner2Id: {
                firstName: 'firstNameOfOwner',
                lastName: 'lastNameOfOwner2',
                businessName: 'businessNameOfOwner2',
                email: 'emailOfOnwer2',
                phone: 'phoneOfOwner2',
                baseUrl: 'baseUrlOfOwner2',
            },
        },

        // Cagegories are organized by owner ID
        categories: {
            owner1Id: {
                category1Id: {
                    id: 'idOfCategory1',
                    name: 'nameOfCagegory1',
                    order: 1, // displaying order within this owner's all categories
                },
                category2Id: {
                    id: 'idOfCategory2',
                    name: 'nameOfCagegory2',
                    order: 2,
                },
            },
            owner2Id: {
                category3Id: {
                    id: 'idOfCategory3',
                    name: 'nameOfCagegory3',
                    order: 1,
                },
                category4Id: {
                    id: 'idOfCategory4',
                    name: 'nameOfCagegory4',
                    order: 2,
                },
            },
        },

        // Dishes are organized by category ID
        dishes: {
            category1Id: {
                dish1Id: {
                    id: 'idOfDish1',
                    name: 'nameOfDish1',
                    price: 'priceOfDish1',
                    description: 'descriptionOfDish1',
                    imageUrl: 'urlOfImageOfDish1',
                    order: 1, // displaying order within this category's all dishes
                },
                dish2Id: {
                    id: 'idOfDish2',
                    name: 'nameOfDish2',
                    price: 'priceOfDish2',
                    description: 'descriptionOfDish2',
                    imageUrl: 'urlOfImageOfDish2',
                    order: 2,
                },
            },
            category2Id: {
                dish3Id: {
                    id: 'idOfDish3',
                    name: 'nameOfDish3',
                    price: 'priceOfDish3',
                    description: 'descriptionOfDish3',
                    imageUrl: 'urlOfImageOfDish3',
                    order: 1,
                },
                dish4Id: {
                    id: 'idOfDish4',
                    name: 'nameOfDish4',
                    price: 'priceOfDish4',
                    description: 'descriptionOfDish4',
                    imageUrl: 'urlOfImageOfDish4',
                    order: 2,
                },
            },
        },

        // qrCodes are organized by owner ID
        qrCodes: {
            owner1Id: {
                qrCode1Id: {
                    id: 'idOfQrCode1',
                    // Each qrCode has an URL, e.g., https://www.instaurant.com?ownerId=idOfOwner1&tableNum=1
                    url: 'urlOfQrCode1',
                },
                qrCode2Id: {
                    id: 'idOfQrCode2',
                    url: 'urlOfQrCode2',
                },
            },
            owner2Id: {
                qrCode3Id: {
                    id: 'idOfQrCode3',
                    url: 'urlOfQrCode3',
                },
                qrCode4Id: {
                    id: 'idOfQrCode4',
                    url: 'urlOfQrCode4',
                },
            },
        },
    },
    // Better to group dish images under owner for batch processsing, e.g., delete all
    'firebase-storage': {
        dishes: {
            dishId1: 'dishImageData1',
            dishId2: 'dishImageData2',
            dishId3: 'dishImageData3',
        },
    },
};

export default ownerDataStructure;
