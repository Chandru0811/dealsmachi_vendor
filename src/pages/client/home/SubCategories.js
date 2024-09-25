import React from 'react';
import Fashion1 from '../../../assets/women.png';
import Fashion2 from '../../../assets/men.png';
import Fashion3 from '../../../assets/kid.png';
import Fashion4 from '../../../assets/winter.png';
import Furniture1 from '../../../assets/sofa.png';
import Furniture2 from '../../../assets/bed.png';
import Furniture3 from '../../../assets/chair.png';
import Furniture4 from '../../../assets/dressing_table.png';
import Appliance1 from '../../../assets/fridge.png';
import Appliance2 from '../../../assets/dishwasher.png';
import Appliance3 from '../../../assets/tv.png';
import Appliance4 from '../../../assets/washing_machine.png';
import Electronic1 from '../../../assets/category5.png';
import Electronic2 from '../../../assets/headphone.png';
import Electronic3 from '../../../assets/camera.png';
import Electronic4 from '../../../assets/printer.png';
import Wedding1 from '../../../assets/marriage_hall.png';
import Wedding2 from '../../../assets/wedding_suits.png';
import Wedding3 from '../../../assets/haldi.jpg';
import Wedding4 from '../../../assets/wedding_catering.png';
import Transport1 from '../../../assets/house_shifting.png';
import Transport2 from '../../../assets/medicine_delivery.png';
import Transport3 from '../../../assets/tickets_booking.png';
import Transport4 from '../../../assets/import_and_export.png';

const fashions = [
    {
        id: 1,
        img: Fashion1,
        title: "Women's Wear"
    },
    {
        id: 2,
        img: Fashion2,
        title: "Men's Wear"
    },
    {
        id: 3,
        img: Fashion3,
        title: "Kid's Wear"
    },
    {
        id: 4,
        img: Fashion4,
        title: "Winter's Wear"
    }
];

const furnitures = [
    {
        id: 1,
        img: Furniture1,
        title: "Cushion Sofa"
    },
    {
        id: 2,
        img: Furniture2,
        title: "Mattress Bed"
    },
    {
        id: 3,
        img: Furniture3,
        title: "Cecsa Chair"
    },
    {
        id: 4,
        img: Furniture4,
        title: "Dressing Table"
    }
];

const appliances = [
    {
        id: 1,
        img: Appliance1,
        title: "Double Door Fridge"
    },
    {
        id: 2,
        img: Appliance2,
        title: "Dish Washer"
    },
    {
        id: 3,
        img: Appliance3,
        title: "Smart Television"
    },
    {
        id: 4,
        img: Appliance4,
        title: "Washing Machine"
    }
];

const electronics = [
    {
        id: 1,
        img: Electronic1,
        title: "Laptop"
    },
    {
        id: 2,
        img: Electronic2,
        title: "Earphone"
    },
    {
        id: 3,
        img: Electronic3,
        title: "Camera"
    },
    {
        id: 4,
        img: Electronic4,
        title: "Printer"
    }
];

const weddings = [
    {
        id: 1,
        img: Wedding1,
        title: "Marriage Hall"
    },
    {
        id: 2,
        img: Wedding2,
        title: "Wedding Suits"
    },
    {
        id: 3,
        img: Wedding3,
        title: "Haldi Stage Decors"
    },
    {
        id: 4,
        img: Wedding4,
        title: "Wedding Catering"
    }
];

const transports = [
    {
        id: 1,
        img: Transport1,
        title: "House Shifting"
    },
    {
        id: 2,
        img: Transport2,
        title: "Medicine Delivery"
    },
    {
        id: 3,
        img: Transport3,
        title: "Ticket's Booking"
    },
    {
        id: 4,
        img: Transport4,
        title: "Import & Export"
    }
];

function SubCategories() {
    return (
        <section>
            <div className='container-fluid'>
                <div className='row'>
                    <div className='col-xl-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Fashion's</h4>
                            <div className='row'>
                                {fashions.map((fashion) => (
                                    <div className='col-lg-3 col-md-6 col-3 text-center' key={fashion.id}>
                                        <img
                                            src={fashion.img}
                                            alt={fashion.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3' style={{ fontSize: "13px" }}>{fashion.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Furniture's</h4>
                            <div className='row'>
                                {furnitures.map((furniture) => (
                                    <div className='col-lg-3 col-md-6 col-3 text-center' key={furniture.id}>
                                        <img
                                            src={furniture.img}
                                            alt={furniture.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3' style={{ fontSize: "13px" }}>{furniture.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Appliance's</h4>
                            <div className='row'>
                                {appliances.map((appliance) => (
                                    <div className='col-lg-3 col-md-6 col-3 text-center' key={appliance.id}>
                                        <img
                                            src={appliance.img}
                                            alt={appliance.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3' style={{ fontSize: "13px" }}>{appliance.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Electronic's</h4>
                            <div className='row'>
                                {electronics.map((electronic) => (
                                    <div className='col-lg-3 col-md-6 col-3 text-center' key={electronic.id}>
                                        <img
                                            src={electronic.img}
                                            alt={electronic.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3' style={{ fontSize: "13px" }}>{electronic.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Wedding's</h4>
                            <div className='row'>
                                {weddings.map((wedding) => (
                                    <div className='col-lg-3 col-md-6 col-3 text-center' key={wedding.id}>
                                        <img
                                            src={wedding.img}
                                            alt={wedding.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3' style={{ fontSize: "13px" }}>{wedding.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='col-xl-4 col-md-6 col-12 mb-4'>
                        <div className='card subCatCard p-3 h-100'>
                            <h4 className='fw-bold'>Transport's</h4>
                            <div className='row'>
                                {transports.map((transport) => (
                                    <div className='col-lg-3 col-md-6 col-3 text-center' key={transport.id}>
                                        <img
                                            src={transport.img}
                                            alt={transport.title}
                                            className='img-fluid'
                                        />
                                        <h6 className='mt-3' style={{ fontSize: "13px" }}>{transport.title}</h6>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubCategories;