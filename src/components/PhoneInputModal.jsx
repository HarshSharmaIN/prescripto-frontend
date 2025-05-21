import React, { useContext, useState } from 'react';
import OTPModal from './OTPModal';
import { assets } from '../assets/assets';
import { AppContext } from '../context/AppContext';
import { toast } from 'react-toastify';
import axios from 'axios';
import DetailsModal from './DetailsModal';

const PhoneInputModal = ({ onClose }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const {backendUrl, Loader} = useContext(AppContext)

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleGetOTPRequest = async () => {
    try {
      setLoading(true)

      if (phoneNumber.length < 10 || phoneNumber === '') {
        setError('Please enter correct phone number')
        return;
      }

      const {data} = await axios.post(backendUrl+'/api/user/generate-otp', {phone: phoneNumber})

      if (data.success) {
        toast.success(data.message)
        setIsOTPModalOpen(true)
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      console.log(error.message);
      toast.error(error.message)
    } finally {
      setLoading(false);
    }
  };

  const handleCloseOTPModal = () => {
    setIsOTPModalOpen(false);
    onClose();
  };

  const handleCloseDetailsModal = () => {
    setIsOTPModalOpen(false);
    setIsDetailsModalOpen(false);
    onClose();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto flex items-center justify-center" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="fixed inset-0 bg-transparent bg-opacity-30 backdrop-filter backdrop-blur-md transition-opacity" aria-hidden="true"></div>
      <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-md sm:w-full"> {/* Reverted max-w */}
        <div className="bg-white **px-6 pt-6 pb-5 sm:p-8 sm:pb-6**">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
              <h3 className="text-lg text-center my-5 leading-6 font-medium text-gray-900" id="modal-title">
                Enter Phone Number
              </h3>
              <div className="mt-2">
                <div className="relative rounded-md shadow-sm **mt-4**">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <img src={assets.flag} alt="Indian Flag" className="w-5 h-auto mr-2" />
                    <span className="text-gray-500">+91</span>
                  </div>
                  <input
                    type="tel"
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-[85vw] pl-16 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Enter your mobile number"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                </div>
                {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
                <div className="mt-6 flex justify-evenly space-x-4">
                  <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={handleGetOTPRequest}
                    disabled={phoneNumber.length !== 10 || loading}
                  >
                    {loading ? <Loader color="#fff" /> : 'Get OTP'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isOTPModalOpen && (
        <OTPModal phoneNumber={'+91' + phoneNumber} onClose={handleCloseOTPModal} setIsDetailsModalOpen={setIsDetailsModalOpen} />
      )}
      {isDetailsModalOpen && (
        <DetailsModal phoneNumber={'+91' + phoneNumber} onClose={handleCloseDetailsModal} />
      )}
    </div>
  );
};

export default PhoneInputModal;