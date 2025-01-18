import React from 'react';

const ContactUsButton = () => {
    const contactus = (id: string, label: string) => {
        console.log(`Triggered contact us with ID: ${id}, Label: ${label}`);
        // Add your contact logic here
    };

    return (
        <div className="fixed bottom-24 right-0 transform -rotate-90 z-50">
        <button
            type="button"
            className="bg-orange-500 text-white text-lg py-2 px-4 rounded-lg shadow-lg hover:bg-orange-600"
            onClick={() => contactus('right_sticky_contact_us', 'Contact Us')}
        >
            CONTACT US
        </button>
    </div>
    

    );
};

export default ContactUsButton;
