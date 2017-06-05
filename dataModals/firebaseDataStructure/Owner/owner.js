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
                    id: 'idOfCategory3',
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
                    dishName: 'nameOfDish1',
                    dishPrice: 'priceOfDish1',
                    dishDescription: 'descriptionOfDish1',
                    dishImageUrl: 'urlOfImageOfDish1',
                    order: 1, // displaying order within this category's all dishes
                },
                dish2Id: {
                    id: 'idOfDish2',
                    dishName: 'nameOfDish2',
                    dishPrice: 'priceOfDish2',
                    dishDescription: 'descriptionOfDish2',
                    dishImageUrl: 'urlOfImageOfDish2',
                    order: 2,
                },
            },
            category2Id: {
                dish3Id: {
                    id: 'idOfDish3',
                    dishName: 'nameOfDish3',
                    dishPrice: 'priceOfDish3',
                    dishDescription: 'descriptionOfDish3',
                    dishImageUrl: 'urlOfImageOfDish3',
                    order: 1,
                },
                dish4Id: {
                    id: 'idOfDish4',
                    dishName: 'nameOfDish4',
                    dishPrice: 'priceOfDish4',
                    dishDescription: 'descriptionOfDish4',
                    dishImageUrl: 'urlOfImageOfDish2',
                    order: 2,
                },
            },
        },

        // qrCodes are organized by owner ID
        qrCodes: {
            owner1Id: {
                qrCode1: {
                    id: 'idOfQrCode1',
                    // Each qrCode has an URL, e.g., https://www.instaurant.com?ownerId=idOfOwner1&tableNum=1
                    url: 'urlOfQrCode1',
                },
                qrCode2: {
                    id: 'idOfQrCode2',
                    url: 'urlOfQrCode2',
                },
            },
            owner2Id: {
                qrCode3: {
                    id: 'idOfQrCode3',
                    url: 'urlOfQrCode3',
                },
                qrCode4: {
                    id: 'idOfQrCode4',
                    url: 'urlOfQrCode4',
                },
            },
        },
    },
};

export default ownerDataStructure;
