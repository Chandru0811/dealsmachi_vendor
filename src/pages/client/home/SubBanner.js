import React from 'react';

function SubBanner() {
    return (
        <section>
            <div className='container-fluid mb-4'>
                <div className='row equal-height'>
                    <div className='col-md-6 col-12 mb-3'>
                        <div className='card subBannerCard' style={{ backgroundImage: `url(${require('../../../assets/subBanner1.png')})` }}>
                            <h3 className='fw-bold'>Promotion Ideas for a Logistics service business</h3>
                            <div>
                                <button className='btn seeDealsBtn'>See Deals</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-md-6 col-12 mb-3'>
                        <div className='card subBannerCard' style={{ backgroundImage: `url(${require('../../../assets/subBanner2.png')})` }}>
                            <h3 className='fw-bold'>Beauty & Spa promotion for service business</h3>
                            <div>
                                <button className='btn seeDealsBtn'>See Deals</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SubBanner;